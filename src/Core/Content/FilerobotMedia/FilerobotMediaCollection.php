<?php declare(strict_types=1);

namespace Scaleflex\Filerobot\Core\Content\FilerobotMedia;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

/**
 * @method void               add(FilerobotMediaCollection $entity)
 * @method void               set(string $key, FilerobotMediaCollection $entity)
 * @method FilerobotMediaCollection[]    getIterator()
 * @method FilerobotMediaCollection[]    getElements()
 * @method FilerobotMediaCollection|null get(string $key)
 * @method FilerobotMediaCollection|null first()
 * @method FilerobotMediaCollection|null last()
 */

class FilerobotMediaCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return FilerobotMediaEntity::class;
    }
}