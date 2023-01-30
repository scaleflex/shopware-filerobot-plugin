<?php declare(strict_types=1);

namespace Scaleflex\Filerobot\Core\Content\FilerobotMedia;

use Shopware\Core\Content\Media\MediaDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\DateTimeField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\OneToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;

class FilerobotMediaDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'filerobot_media';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getEntityClass(): string
    {
        return FilerobotMediaEntity::class;
    }

    public function getCollectionClass(): string
    {
        return FilerobotMediaCollection::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new Required(), new PrimaryKey()),
            new FkField('media_id', 'mediaId', MediaDefinition::class),
            (new StringField('uuid', 'uuid')),
            (new StringField('url', 'url')),

            new OneToOneAssociationField('media', 'media_id', 'id', MediaDefinition::class, false)
        ]);
    }
}