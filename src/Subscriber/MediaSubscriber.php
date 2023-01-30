<?php declare(strict_types=1);

namespace Scaleflex\Filerobot\Subscriber;

use Shopware\Core\Content\Media\Aggregate\MediaThumbnail\MediaThumbnailCollection;
use Shopware\Core\Content\Media\Aggregate\MediaThumbnail\MediaThumbnailEntity;
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
            MediaEvents::MEDIA_LOADED_EVENT => 'onMediaLoaded'
        ];
    }

    public function onMediaLoaded(EntityLoadedEvent $event): void
    {
        $context = (array)$event->getContext()->getSource();
        $isAdmin = false;
        foreach ($context as $key => $value) {
            if (strpos($key,'isAdmin')) {
                $isAdmin = true;
            }
        }
        /** @var MediaEntity $mediaEntity */
        foreach ($event->getEntities() as $mediaEntity) {
            $id = $mediaEntity->getId();
            $connection = Kernel::getConnection();
            $media = $connection->fetchAssociative(
                'SELECT url, uuid FROM filerobot_media WHERE media_id = :id',
                ['id' => Uuid::fromHexToBytes($id)]
            );
            if ($media) {
                $mediaEntity->setUrl($media['url']);

                if (!$isAdmin) {
                    $mediaThumbnailSizes = $connection->fetchAllAssociative(
                        'SELECT width, height FROM media_thumbnail_size'
                    );
                    if (count($mediaThumbnailSizes)) {
                        $mediaThumbnailCollectionArray = [];
                        foreach ($mediaThumbnailSizes as $mediaThumbnailSize) {
                            $thumbnailEntity = new MediaThumbnailEntity();
                            $thumbnailEntity->setId(Uuid::randomHex());
                            $thumbnailEntity->setHeight((int)$mediaThumbnailSize['height']);
                            $thumbnailEntity->setWidth((int)$mediaThumbnailSize['width']);
                            $thumbnailEntity->setUrl($media['url'] . '?w=' . $mediaThumbnailSize['width']);
                            $mediaThumbnailCollectionArray[] = $thumbnailEntity;
                        }
                        $mediaThumbnailCollection = new MediaThumbnailCollection($mediaThumbnailCollectionArray);
                        $mediaEntity->setThumbnails($mediaThumbnailCollection);
                    }
                }
            }
        }
    }
}