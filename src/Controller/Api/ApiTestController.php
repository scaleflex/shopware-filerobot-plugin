<?php

namespace Scaleflex\Filerobot\Controller\Api;

use Shopware\Core\Framework\Routing\Annotation\RouteScope;
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
        /**
         * Verify Filerobot Token
         */
        $frSEC = $request->get('ScaleflexFilerobot.config.frSEC');
        $frToken = $request->get('ScaleflexFilerobot.config.frToken');

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
        $frAdminAccessKeyID = $request->get('ScaleflexFilerobot.config.frAdminAccessKeyID');
        $frAdminSecretAccessKey = $request->get('ScaleflexFilerobot.config.frAdminSecretAccessKey');

        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $domainName = $_SERVER['HTTP_HOST'];
        $url = $protocol . $domainName;

        $authUrl = $url . '/api/oauth/token';
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
                    'message' => 'failToVerifyAdminAuthToken'
                ]
            );
        }

        return new JsonResponse(['success' => true]);
    }
}
