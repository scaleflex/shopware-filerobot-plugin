<?php declare(strict_types=1);

namespace Scaleflex\Filerobot\Controller\Api;

use Shopware\Core\Content\Media\MediaEntity;
use Shopware\Core\Content\Media\Pathname\PathnameStrategy\FilenamePathnameStrategy;
use Scaleflex\Filerobot\Extension\Content\Media\Pathname\UrlGeneratorExtension;
use Shopware\Core\Framework\Context;
use Shopware\Core\Kernel;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Shopware\Core\Framework\Api\Controller\ApiController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Shopware\Core\Framework\Routing\Annotation\RouteScope;

/**
 * @RouteScope(scopes={"api"})
 */
class CleanUpMediaForFileRobotController extends AbstractController
{
    /*
     * Required parameters for this api to work
     * */
    private $requiredParameters = [
        'media_id',
        'filerobot_url',
        'filerobot_uuid',
        'media_path'
    ];

    private $processedMedia = [];

    /*
     * Media data which will be read/written over throughout the clean up steps
     * */
    private $mediaFileData;

    /*
     * Connection to db
     * */
    private $connection;

    /**
     * @Route("/api/scaleflex/filerobot/clean-up-media", name="api.action.scaleflex.filerobot.clean-up-media", methods={"POST"})
     */
    public function cleanUpMedia(Request $request, Context $context): JsonResponse
    {
        $this->getRequiredParameters($request);

        return $this->processCleanUpSteps();
    }


    /**
     * check required parameters. If they are all exists, set them to class variable
     * @param Request $request
     * @return void
     * @throws \Exception
     */
    private function getRequiredParameters(Request $request): void
    {
        foreach($this->requiredParameters as $requiredParameter) {
            $val = $request->get($requiredParameter);
            if (empty($val)) {
                throw new \Exception("$requiredParameter is required and must not be empty");
            }
            $this->processedMedia[$requiredParameter] = $val;
        }
    }

    private function processCleanUpSteps(): JsonResponse
    {
        $this->connection = \Shopware\Core\Kernel::getConnection();

        $this->getMediaFileDataFromDatabaseStep();
        $this->generateMediaFilePathStep();
        $this->removeMediaFileFromLocalStep();
        $this->updateProcessedMediaStep();

        return new JsonResponse(true);
    }

    /**
     * Get media filename from database
     * @return void
     * @throws \Exception
     */
    private function getMediaFileDataFromDatabaseStep(): void
    {
        try {
            $query = "SELECT HEX(id) as id, file_name as fileName, file_extension as fileExtension
                    FROM `media` WHERE id = UNHEX('".$this->processedMedia['media_id']."')";
            $result = $this->connection->executeQuery($query)->fetchAssociative();

            if (empty($result)) {
                throw new \Exception("Media id does not exist");
            }

            $this->mediaFileData = $result;
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage());
        }
    }

    /**
     * generate physical file path and store it in processedMedia
     * @return void
     * @throws \Exception
     */
    private function generateMediaFilePathStep(): void
    {
        $mediaPath = $this->processedMedia['media_path'];
        $mediaFileFromRequest = $this->getMediaFileFromRequest($mediaPath);
        $mediaFileFromDatabase = $this->mediaFileData['fileName'] . "." . $this->mediaFileData['fileExtension'];

        if ($mediaFileFromDatabase !== $mediaFileFromRequest) {
            throw new \Exception("Media file in media_path does not match with data stored");
        }

        $this->processedMedia['file_path'] = getcwd() . '/' . $mediaPath;
    }

    /**
     * Delete media file in local if it exists
     * @throws \Exception
     */
    private function removeMediaFileFromLocalStep(): void
    {
        try {
            if (file_exists($this->processedMedia['file_path'])) {
                unlink($this->processedMedia['file_path']);
            }
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage());
        }
    }

    /**
     * Update media table with additional data
     * @throws \Exception
     */
    private function updateProcessedMediaStep(): void
    {
        try {
            $query = "UPDATE media
                        SET 
                            filerobot_url = '" . $this->processedMedia['filerobot_url'] . "',
                            is_filerobot = 1,
                            filerobot_uuid = '" . $this->processedMedia['filerobot_uuid'] . "'
                        WHERE id = UNHEX('" . $this->processedMedia['media_id'] . "')";
            $this->connection->executeStatement($query);
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage());
        }
    }

    /**
     * Get media file name and its extension from media_path
     * @param string $mediaPath
     * @return string
     */
    private function getMediaFileFromRequest(string $mediaPath): string
    {
        $mediaPathArray = explode('/', $mediaPath);

        return end($mediaPathArray);
    }
}