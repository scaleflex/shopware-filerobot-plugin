<?php

namespace Scaleflex\Filerobot\Controller\Api;

use Shopware\Core\Framework\Routing\Annotation\RouteScope;
use Shopware\Core\Framework\Validation\DataBag\RequestDataBag;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @RouteScope(scopes={"api"})
 */
class ApiTestController extends AbstractController
{
    /**
     * @Route("/api/_action/filerobot-api-test/verify", name="api.action.scaleflex.filerobot.verify", methods={"POST"})
     */
    public function check(Request $request): JsonResponse
    {
        $frSEC = $request->get('ScaleflexFilerobot.config.frSEC');
        $frToken = $request->get('ScaleflexFilerobot.config.frToken');
//        $path = $dataBag->get('ScaleflexFilerobot.config.frUploadDirectory');

        $endPoint = 'https://api.filerobot.com/' . $frToken . '/key/' . $frSEC;
        $success = false;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,$endPoint);
        // Receive server response ...
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close ($ch);

        $result = json_decode($response, true);
        if (isset($result['status']) && $result['status'] != 'error') {
            $sass = $result['key'];
            if ($sass != '') {
                $success = true;
            }
        }

        return new JsonResponse(['success' => $success]);
    }
}
