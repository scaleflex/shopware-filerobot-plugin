<?php declare(strict_types=1);

namespace Scaleflex\Filerobot\Controller\Api;

use PHPUnit\Util\Json;
use Shopware\Core\Framework\Context;
use Shopware\Core\Kernel;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Shopware\Core\Framework\Api\Controller\ApiController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Shopware\Core\Framework\Routing\Annotation\RouteScope;

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

        return $this->checkResult($filerobotUuid);
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
            throw new \Exception('filerobot_uuid must not be empty');
        }

        return $filerobotUuid;
    }

    /**
     * Check and return result whether or not the provided filerobot_uuid exist in media table
     * @param $filerobotUuid
     * @return JsonResponse
     * @throws \Doctrine\DBAL\Driver\Exception
     * @throws \Doctrine\DBAL\Exception
     */
    private function checkResult($filerobotUuid): JsonResponse
    {
        $connection = \Shopware\Core\Kernel::getConnection();
        $query = "SELECT HEX(id) as id FROM `media` WHERE filerobot_uuid = '".$filerobotUuid."'";
        $result = $connection->executeQuery($query)->fetchOne();
        $response = ($result) ? [
            $result
        ] : false;

        return new JsonResponse($response);
    }
}