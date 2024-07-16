<?php declare(strict_types=1);

namespace Scaleflex\Filerobot\Controller\Api;

use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\Uuid\Uuid;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

#[Route(defaults: ['_routeScope' => ['api']])]
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
     * Media data which will be read/written over throughout the clean-up steps
     * */
    private $mediaFileData;

    public function __construct()
    {
    }

    #[Route(path: '/api/scaleflex/filerobot/clean-up-media', name: 'api.action.scaleflex.filerobot.clean-up-media', methods: ['POST'])]
    public function cleanUpMedia(Request $request, Context $context): JsonResponse
    {
        $this->getRequiredParameters($request);

        return $this->processCleanUpSteps($context);
    }


    /**
     * check required parameters. If they are all exists, set them to class variable
     * @param Request $request
     * @return void
     * @throws \Exception
     */
    private function getRequiredParameters(Request $request): void
    {
        $requestContent = json_decode($request->getContent(), true);
        foreach($this->requiredParameters as $requiredParameter) {
            $val = $requestContent[$requiredParameter];
            if (empty($val)) {
                throw new \Exception("$requiredParameter is required and must not be empty");
            }
            $this->processedMedia[$requiredParameter] = $val;
        }
    }

    private function processCleanUpSteps(Context $context): JsonResponse
    {
        $this->getMediaFileDataFromDatabaseStep($context);
        $this->generateMediaFilePathStep();
        $this->removeMediaFileFromLocalStep();
        $this->updateProcessedMediaStep($context);

        return new JsonResponse(true);
    }

    /**
     * Get media filename from database
     * @return void
     * @throws \Exception
     */
    private function getMediaFileDataFromDatabaseStep(Context $context): void
    {
        try {
            $criteria = new Criteria();
            $mediaRepository = $this->container->get('media.repository');
            $criteria->setIncludes(['id','file_name', 'file_extension']);
            $criteria->addFilter(new EqualsFilter('id', $this->processedMedia['media_id']));
            $mediaInfo = $mediaRepository->search($criteria, $context)->first();

            if (empty($mediaInfo)) {
                throw new \Exception("Media id does not exist");
            }

            $this->mediaFileData = $mediaInfo;
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
        $mediaFileFromDatabase = $this->mediaFileData->fileName . "." . $this->mediaFileData->fileExtension;

        if ($mediaFileFromDatabase !== $mediaFileFromRequest) {
            throw new \Exception("Media file in media_path does not match with data stored");
        }

        $this->processedMedia['file_path'] = $mediaPath;
    }

    /**
     * Delete media file in local if it exists
     * @throws \Exception
     */
    private function removeMediaFileFromLocalStep(): void
    {
        try {
            $filesystem = $this->container->get('shopware.filesystem.public');
            if ($filesystem->has($this->processedMedia['file_path'])) {
                $filesystem->delete($this->processedMedia['file_path']);
            }
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage());
        }
    }

    /**
     * Update media table with additional data
     * @throws \Exception
     */
    private function updateProcessedMediaStep(Context $context): void
    {
        try {
            $filerobotMediaRepository = $this->container->get('filerobot_media.repository');
            $filerobotMediaRepository->create([
                [
                    'id' => Uuid::randomHex(),
                    'mediaId' => $this->processedMedia['media_id'],
                    'url' => $this->processedMedia['filerobot_url'],
                    'uuid' => $this->processedMedia['filerobot_uuid']
                ]
            ], $context);
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
        $removeParam = explode('?', $mediaPath);
        $mediaPath = $removeParam[0];
        $mediaPathArray = explode('/', $mediaPath);
        return end($mediaPathArray);
    }
}