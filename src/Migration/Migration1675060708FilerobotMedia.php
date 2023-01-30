<?php declare(strict_types=1);

namespace Scaleflex\Filerobot\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1675060708FilerobotMedia extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1675060708;
    }

    public function update(Connection $connection): void
    {
        // implement update
        $sql = <<<SQL
        CREATE TABLE IF NOT EXISTS `filerobot_media` (
            `id` BINARY(16) NOT NULL,
            `media_id` BINARY(16) NOT NULL,
            `uuid` VARCHAR(255) NULL,
            `url` VARCHAR(255) NULL,
            `created_at` DATETIME(3) NOT NULL,
            `updated_at` DATETIME(3) NULL,
            PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        SQL;
        $connection->executeStatement($sql);
    }

    public function updateDestructive(Connection $connection): void
    {
        // implement update destructive
    }
}
