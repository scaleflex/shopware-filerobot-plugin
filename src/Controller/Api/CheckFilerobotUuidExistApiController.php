<?php declare(strict_types=1);

namespace Scaleflex\Filerobot\Controller\Api;

use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Shopware\Core\Framework\Routing\Annotation\RouteScope;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @RouteScope(scopes={"api"})
 */
class CheckFilerobotUuidExistApiController extends AbstractController
{
    /**
     * @Route("/api/scaleflex/filerobot/check-filerobot-uuid-exist", name="api.action.scaleflex.filerobot.check-filerobot-uuid-exist", methods={"POST"})
     */
    public function checkFilerobotUuidExist(Request $request, Context $context): JsonResponse
    {
        $filerobotUuid = $this->getFilerobotUuidFromRequest($request);

        return $this->checkResult($filerobotUuid, $context);
    }

    /**
     * Get filerobot_uuid from request and throw error if the parameter is empty or does not exist
     * @param $request
     * @return mixed
     * @throws \Exception
     */
    private function getFilerobotUuidFromRequest($request): string
    {
        $filerobotUuid = $request->get('filerobot_uuid');
        if (empty($filerobotUuid)) {
            throw new \Exception('filerobot_uuid is required and must not be empty');
        }

        return $filerobotUuid;
    }

    /**
     * Check and return result whether the provided filerobot_uuid exist in media table
     * @param $filerobotUuid
     * @return JsonResponse
     * @throws \Doctrine\DBAL\Driver\Exception
     * @throws \Doctrine\DBAL\Exception
     */
    private function checkResult($filerobotUuid, $context): JsonResponse
    {
        $filerobotMediaRepository = $this->container->get('filerobot_media.repository');
        $criteriaFR = new Criteria();
        $criteriaFR->addFilter(new EqualsFilter('uuid', $filerobotUuid));
        $filerobotMediaInfo = $filerobotMediaRepository->search($criteriaFR, $context)->first();

        if ($filerobotMediaInfo) {
            $mediaRepository = $this->container->get('media.repository');
            $criteria = new Criteria();
            $criteria->addFilter(new EqualsFilter('id', $filerobotMediaInfo->mediaId));

            $mediaInfo = $mediaRepository->search($criteria, $context)->first();
            $response = ($mediaInfo) ? [
                $mediaInfo
            ] : false;

            return new JsonResponse($response);
        } else {
            return new JsonResponse(false);
        }
    }
}