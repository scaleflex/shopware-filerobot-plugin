<?php declare(strict_types=1);

namespace Filerobot;

use Shopware\Core\Framework\Plugin;
use Shopware\Core\Framework\Plugin\Context\InstallContext;
use Shopware\Core\Framework\Plugin\Context\ActivateContext;
use Shopware\Core\Framework\Plugin\Context\UninstallContext;
use Shopware\Core\System\SystemConfig\SystemConfigService;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use CloudImage\Component\DependencyInjection\CustomProfilerExtensions;

class Filerobot extends Plugin
{
    public function build(ContainerBuilder $container): void
    {
        $container->addCompilerPass(new CustomProfilerExtensions());
        parent::build($container);
    }

    public function install(InstallContext $installContext): void
    {
        parent::install($installContext);

        $config = $this->container->get('Shopware\Core\System\SystemConfig\SystemConfigService');

        //set the specified values as defaults
        $config->set('Filerobot.config.frActivation', true);
        $config->set('Filerobot.config.frUploadDirectory', "/wp_assets");
    }

    public function uninstall(UninstallContext $uninstallContext): void
    {
        if ($uninstallContext->keepUserData()) {
            return;
        }

        $connection = \Shopware\Core\Kernel::getConnection();
        $query = $connection->executeStatement("SELECT *
                    FROM media 
                    WHERE is_filerobot = 1");
        $media = $query->fetchAllAssociative();
        foreach ($media as $item) {
            $media_id = $item['id'];
            $connection->executeStatement('DELETE FROM `media_tag` where media_id = "' . $media_id . '"');
            $connection->executeStatement('DELETE FROM `media_thumbnail` where media_id = "' . $media_id . '"');
            $connection->executeStatement('DELETE FROM `media_translation` where media_id = "' . $media_id . '"');
        }
        $connection->executeStatement('DELETE FROM `media` where is_filerobot = 1');
        $connection->executeStatement("ALTER TABLE `shopware`.`media` 
        DROP COLUMN `is_filerobot`,
        DROP COLUMN `url`;");
    }

    public function activate(ActivateContext $activateContext): void
    {
        parent::activate($activateContext);

        $config = $this->container->get('Shopware\Core\System\SystemConfig\SystemConfigService');

        //set the specified values as defaults
        $config->set('Filerobot.config.frActivation', true);
        $config->set('Filerobot.config.frUploadDirectory', "/wp_assets");

        $connection = \Shopware\Core\Kernel::getConnection();
        $connection->executeStatement("ALTER TABLE `media` 
        ADD COLUMN `url` VARCHAR(255) NULL AFTER `updated_at`,
        ADD COLUMN `is_filerobot` TINYINT(1) NULL AFTER `url`;");
    }
}