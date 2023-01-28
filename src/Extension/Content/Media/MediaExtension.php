<?php declare(strict_types=1);

namespace Scaleflex\Filerobot\Extension\Content\Media;

use Shopware\Core\Content\Media\MediaDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityExtension;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\ApiAware;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Runtime;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\WriteProtected;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IntField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;

class MediaExtension extends EntityExtension
{
    public function extendFields(FieldCollection $collection): void
    {
        $collection->add(
            (new IntField('is_filerobot', 'isFilerobot'))->addFlags(new Runtime(), new WriteProtected(), new ApiAware()),
            (new StringField('filerobot_url', 'filerobotUrl'))->addFlags(new Runtime(), new WriteProtected(), new ApiAware()),
            (new StringField('filerobot_uuid', 'filerobotUuid'))->addFlags(new Runtime(), new WriteProtected(), new ApiAware())
        );
    }

    public function getDefinitionClass(): string
    {
        return MediaDefinition::class;
    }
}