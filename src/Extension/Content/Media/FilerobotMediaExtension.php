<?php declare(strict_types=1);

namespace Scaleflex\Filerobot\Extension\Content\Media;

use Shopware\Core\Content\Media\MediaDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityExtension;
use Shopware\Core\Framework\DataAbstractionLayer\Field\OneToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Scaleflex\Filerobot\Core\Content\FilerobotMedia\FilerobotMediaDefinition;

class FilerobotMediaExtension extends EntityExtension
{
    public function extendFields(FieldCollection $collection): void
    {
        $collection->add(
            new OneToOneAssociationField('filerobotExtension', 'id', 'media_id', FilerobotMediaDefinition::class, true)
        );
    }

    public function getDefinitionClass(): string
    {
        return MediaDefinition::class;
    }
}