<?php declare(strict_types=1);

namespace Scaleflex\Filerobot\Subscriber;

use Shopware\Core\Content\Media\Aggregate\MediaThumbnail\MediaThumbnailCollection;
use Shopware\Core\Content\Media\Aggregate\MediaThumbnail\MediaThumbnailEntity;
use Shopware\Core\Content\Media\MediaEntity;
use Shopware\Core\Framework\DataAbstractionLayer\Event\EntityDeletedEvent;
use Shopware\Core\Framework\DataAbstractionLayer\Event\EntityLoadedEvent;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\Uuid\Uuid;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Shopware\Core\Content\Media\MediaEvents;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;

class MediaSubscriber implements EventSubscriberInterface
{
    private EntityRepositoryInterface $filerobotMediaRepository;
    private EntityRepositoryInterface $mediaThumbnailSizeRepository;


    public function __construct(
        EntityRepositoryInterface $filerobotMediaRepository,
        EntityRepositoryInterface $mediaThumbnailSizeRepository
    )
    {
        $this->filerobotMediaRepository = $filerobotMediaRepository;
        $this->mediaThumbnailSizeRepository = $mediaThumbnailSizeRepository;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            MediaEvents::MEDIA_LOADED_EVENT => 'onMediaLoaded',
            MediaEvents::MEDIA_DELETED_EVENT => 'onMediaDeleted'
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
            $criteriaFR = new Criteria();
            $criteriaFR->addFilter(new EqualsFilter('mediaId', $id));
            $filerobotMedia = $this->filerobotMediaRepository->search($criteriaFR, $event->getContext())->first();
            if ($filerobotMedia) {
                $mediaEntity->setUrl($filerobotMedia->url);

                if (!$isAdmin) {
                    $criteriaMediaThumbnailSize = new Criteria();
                    $mediaThumbnailSizes = $this->mediaThumbnailSizeRepository->search($criteriaMediaThumbnailSize, $event->getContext());
                    if (count($mediaThumbnailSizes)) {
                        $mediaThumbnailCollectionArray = [];
                        foreach ($mediaThumbnailSizes as $mediaThumbnailSize) {
                            $thumbnailEntity = new MediaThumbnailEntity();
                            $thumbnailEntity->setId(Uuid::randomHex());
                            $thumbnailEntity->setHeight((int)$mediaThumbnailSize->height);
                            $thumbnailEntity->setWidth((int)$mediaThumbnailSize->width);
                            $thumbnailEntity->setUrl($filerobotMedia->url . '?w=' . $mediaThumbnailSize->width);
                            $mediaThumbnailCollectionArray[] = $thumbnailEntity;
                        }
                        $mediaThumbnailCollection = new MediaThumbnailCollection($mediaThumbnailCollectionArray);
                        $mediaEntity->setThumbnails($mediaThumbnailCollection);
                    }
                }
            }
        }
    }

    /**
     * Delete media on table "filerobot_media"
     */
    public function onMediaDeleted(EntityDeletedEvent $event): void
    {
        $ids = [];
        foreach ($event->getIds() as $mediaId) {
            $criteriaFR = new Criteria();
            $criteriaFR->addFilter(new EqualsFilter('mediaId', $mediaId));
            $filerobotMedia = $this->filerobotMediaRepository->search($criteriaFR, $event->getContext())->first();
            if ($filerobotMedia) {
                $ids[] = ['id' => $filerobotMedia->id];
            }
        }
        $this->filerobotMediaRepository->delete($ids, $event->getContext());
    }
}