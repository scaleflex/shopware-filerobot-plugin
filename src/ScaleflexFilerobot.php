<?php declare(strict_types=1);

namespace Scaleflex\Filerobot;

use Shopware\Core\Defaults;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\Doctrine\MultiInsertQueryQueue;
use Shopware\Core\Framework\Plugin;
use Shopware\Core\Framework\Plugin\Context\InstallContext;
use Shopware\Core\Framework\Plugin\Context\ActivateContext;
use Shopware\Core\Framework\Plugin\Context\UninstallContext;
use Shopware\Core\Framework\Uuid\Uuid;

class ScaleflexFilerobot extends Plugin
{
    public function install(InstallContext $installContext): void
    {
        parent::install($installContext);

        $config = $this->container->get('Shopware\Core\System\SystemConfig\SystemConfigService');

        //set the specified values as defaults
        $config->set('ScaleflexFilerobot.config.frActivation', true);
        $config->set('ScaleflexFilerobot.config.frUploadDirectory', "/wp_assets");
    }

    public function uninstall(UninstallContext $uninstallContext): void
    {
        if ($uninstallContext->keepUserData()) {
            return;
        }

        /**
         * Delete all related data
         */
        $connection = \Shopware\Core\Kernel::getConnection();
        $query = $connection->executeQuery("SHOW COLUMNS FROM `media` LIKE 'filerobot_url'");
        $result = $query->fetchAllAssociative();
        if (count($result) !== 0) {
            $this->dropFilerobotColumns($connection);
        }
    }

    public function activate(ActivateContext $activateContext): void
    {
        parent::activate($activateContext);

        /**
         * Add more field url, is_filerobot
         */
        $connection = \Shopware\Core\Kernel::getConnection();
        $query = $connection->executeQuery("SHOW COLUMNS FROM `media` LIKE 'filerobot_url'");
        $result = $query->fetchAllAssociative();
        if (count($result) == 0) {
            $connection->executeStatement("ALTER TABLE `media` 
            ADD COLUMN `filerobot_url` VARCHAR(255) NULL AFTER `updated_at`;");
        }

        $query = $connection->executeQuery("SHOW COLUMNS FROM `media` LIKE 'is_filerobot'");
        $result = $query->fetchAllAssociative();
        if (count($result) == 0) {
            $connection->executeStatement("ALTER TABLE `media` 
            ADD COLUMN `is_filerobot` TINYINT(1) NULL AFTER `filerobot_url`;");
        }

        $query = $connection->executeQuery("SHOW COLUMNS FROM `media` LIKE 'filerobot_uuid'");
        $result = $query->fetchAllAssociative();
        if (count($result) == 0) {
            $connection->executeStatement("ALTER TABLE `media` 
            ADD COLUMN `filerobot_uuid` VARCHAR(255) NULL AFTER `is_filerobot`;");
        }

        $query = $connection->executeQuery("SELECT HEX(id) FROM `media_folder` WHERE `name` = 'Filerobot DAM'");
        $result = $query->fetchOne();
        if ($result) {
            $folderId = $result;
        } else {
            $folderId = $this->createMediaFolderWithConfiguration();
        }
        $config = $this->container->get('Shopware\Core\System\SystemConfig\SystemConfigService');
        $config->set('ScaleflexFilerobot.config.frFolderId', $folderId);
    }

    /**
     * Remove Filerobot related columns in media table
     * @param $connection
     * @return void
     */
    private function dropFilerobotColumns($connection): void
    {
        $query = $connection->executeQuery("SELECT HEX(id) as id
                    FROM media 
                    WHERE is_filerobot = 1");
        $media = $query->fetchAllAssociative();
        foreach ($media as $item) {
            $media_id = strtolower($item['id']);
            $connection->executeStatement('DELETE FROM `media_tag` where media_id = "' . $media_id . '"');
            $connection->executeStatement('DELETE FROM `media_thumbnail` where media_id = "' . $media_id . '"');
            $connection->executeStatement('DELETE FROM `media_translation` where media_id = "' . $media_id . '"');
        }
        $connection->executeStatement('DELETE FROM `media` where `is_filerobot` = 1');
        $connection->executeStatement("ALTER TABLE `media` DROP COLUMN `is_filerobot`,
        DROP COLUMN `filerobot_url`,
        DROP COLUMN `filerobot_uuid`;");

        //remove folder "Filerobot"
        $connection->executeStatement("DELETE FROM `media_default_folder` where `association_fields` = '[\"filerobotMedia\"]'");
        $connection->executeStatement("DELETE FROM `media_folder` where `name` = 'Filerobot DAM'");
    }

    /**
     * Create new folder "Filerobot DAM"
     * @return string
     */
    private function createMediaFolderWithConfiguration(): string
    {
        $context = Context::createDefaultContext();
        $connection = \Shopware\Core\Kernel::getConnection();
        $query = $connection->executeQuery("SELECT HEX(id) FROM `media_default_folder` WHERE `association_fields` LIKE '%filerobotMedia%'");
        $result = $query->fetchOne();
        if ($result) {
            $defaultFolderId = strtolower($result);
        } else {
            $defaultFolderId = Uuid::randomBytes();
            $queue = new MultiInsertQueryQueue($connection);
            $queue->addInsert(
                'media_default_folder',
                [
                    'id' => $defaultFolderId,
                    'association_fields' => '["filerobotMedia"]',
                    'entity' => 'filerobot',
                    'created_at' => (new \DateTime())->format(Defaults::STORAGE_DATE_TIME_FORMAT)]
            );
            $queue->execute();

            $defaultFolderId = strtolower(Uuid::fromBytesToHex($defaultFolderId));
        }

        $mediaFolderRepository = $this->container->get('media_folder.repository');
        $folderId = Uuid::randomHex();
        $mediaFolderRepository->upsert([
            [
                'id' => $folderId,
                'name' => 'Filerobot DAM',
                'useParentConfiguration' => false,
                'configuration' => [],
                'defaultFolderId' => $defaultFolderId
            ],
        ], $context);

        return $folderId;
    }
}