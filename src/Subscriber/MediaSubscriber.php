<?php declare(strict_types=1);

namespace Scaleflex\Filerobot\Subscriber;

use Shopware\Core\Content\Media\MediaEntity;
use Shopware\Core\Framework\DataAbstractionLayer\Event\EntityLoadedEvent;
use Shopware\Core\Framework\Uuid\Uuid;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Shopware\Core\Content\Media\MediaEvents;
use Shopware\Core\Kernel;

class MediaSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            MediaEvents::MEDIA_LOADED_EVENT => 'onMediasLoaded'
        ];
    }

    public function onMediasLoaded(EntityLoadedEvent $event): void
    {
        /** @var MediaEntity $mediaEntity */
        foreach ($event->getEntities() as $mediaEntity) {
            $id = $mediaEntity->getId();
            $connection = Kernel::getConnection();
            $media = $connection->fetchAssociative(
                'SELECT is_filerobot, filerobot_url, filerobot_uuid FROM media WHERE id = :id',
                ['id' => Uuid::fromHexToBytes($id)]
            );
            if ($media['is_filerobot']) {
                $mediaEntity->setUrl($media['filerobot_url']);
            }
        }
    }
}