<?php

namespace Scaleflex\Filerobot\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route(defaults: ['_routeScope' => ['api']])]
class ApiTestController extends AbstractController
{
    #[Route(path: '/api/_action/filerobot-api-test/verify', name: 'api.action.scaleflex.filerobot.verify', methods: ['POST'])]
    public function check(Request $request): JsonResponse
    {
        /**
         * Verify Filerobot Token
         */
        $requestContent = json_decode($request->getContent(), true);
        $frSEC = $requestContent['ScaleflexFilerobot.config.frSEC'];
        $frToken = $requestContent['ScaleflexFilerobot.config.frToken'];

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

        if (!$success) {
            return new JsonResponse(
                [
                    'success' => false,
                    'message' => 'failToVerifyFilerobotToken'
                ]
            );
        }

        /**
         * Verify Admin Auth Token
         */
        $frAdminAccessKeyID = $requestContent['ScaleflexFilerobot.config.frAdminAccessKeyID'];
        $frAdminSecretAccessKey = $requestContent['ScaleflexFilerobot.config.frAdminSecretAccessKey'];

        $urlExplode = $request->getUri();
        $url = explode('api', $urlExplode)[0];
        $authUrl = $url . 'api/oauth/token';
        $postData = [
            'client_id' => $frAdminAccessKeyID,
            'client_secret' => $frAdminSecretAccessKey,
            'grant_type'   => "client_credentials"
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $authUrl);
        curl_setopt($ch, CURLOPT_POST, 1);
        // Receive server response ...
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
        $response = curl_exec($ch);
        curl_close ($ch);
        $result = json_decode($response, true);

        if (isset($result['access_token']) && $result['access_token'] != '') {
            $success = true;
        } else {
            $success = false;
        }

        if (!$success) {
            return new JsonResponse(
                [
                    'success' => false,
                    'message' => 'failToVerifyAdminAuthToken',
                    'url' => $authUrl
                ]
            );
        }

        return new JsonResponse(['success' => true]);
    }
}
