<?php declare(strict_types=1);

namespace Scaleflex\Filerobot;

use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
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
        $context = Context::createDefaultContext();

        /**
         * Create media folder "Filerobot DAM"
         */
        $mediaFolderRepository = $this->container->get('media_folder.repository');
        $criteriaFR = new Criteria();
        $criteriaFR->addFilter(new EqualsFilter('name', 'Filerobot DAM'));
        $mediaFolder = $mediaFolderRepository->search($criteriaFR, $context)->first();
        if ($mediaFolder) {
            $folderId = $mediaFolder->id;
        } else {
            $folderId = $this->createMediaFolderWithConfiguration($context);
        }

        //set the specified values as defaults
        $config->set('ScaleflexFilerobot.config.frFolderId', $folderId);
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
        $this->dropFilerobotData();
    }

    public function activate(ActivateContext $activateContext): void
    {
        parent::activate($activateContext);
    }

    /**
     * Remove Filerobot related columns in media table
     * @return void
     */
    private function dropFilerobotData(): void
    {
        $context = Context::createDefaultContext();

        /**
         * Delete medias
         */
        $query = $this->container
            ->get('Doctrine\DBAL\Connection')
            ->executeQuery("SELECT HEX(id) as id, HEX(media_id) as media_id FROM filerobot_media");
        $filerobotMedias = $query->fetchAllAssociative();
        if ($filerobotMedias) {
            $mediaRepository = $this->container->get('media.repository');
            foreach ($filerobotMedias as $item) {
                $media_id = strtolower($item['media_id']);
                $mediaRepository->delete([['id' => $media_id]], $context);
            }
        }

        /**
         * Delete media folder
         */
        $mediaFolderIds = [];
        $mediaFolderRepository = $this->container->get('media_folder.repository');
        $criteriaFR = new Criteria();
        $criteriaFR->addFilter(new EqualsFilter('name', 'Filerobot DAM'));
        $mediaFolder = $mediaFolderRepository->search($criteriaFR, $context)->first();
        if ($mediaFolder) {
            $mediaFolderIds[] = ['id' => $mediaFolder->id];
        }
        $mediaFolderRepository->delete($mediaFolderIds, $context);

        /**
         * Drop table `filerobot_media`
         */
        $this->container
            ->get('Doctrine\DBAL\Connection')
            ->executeStatement("DROP TABLE IF EXISTS `filerobot_media`");
    }

    /**
     * Create new folder "Filerobot DAM"
     * @param Context $context
     * @return string
     */
    private function createMediaFolderWithConfiguration(Context $context): string
    {
        $mediaFolderRepository = $this->container->get('media_folder.repository');
        $folderId = Uuid::randomHex();
        $mediaFolderRepository->upsert([
            [
                'id' => $folderId,
                'name' => 'Filerobot DAM',
                'useParentConfiguration' => false,
                'configuration' => []
            ],
        ], $context);

        return $folderId;
    }
}