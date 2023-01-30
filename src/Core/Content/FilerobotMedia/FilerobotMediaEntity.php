<?php declare(strict_types=1);

namespace Scaleflex\Filerobot\Core\Content\FilerobotMedia;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;

class FilerobotMediaEntity extends Entity
{
    use EntityIdTrait;

    /**
     * @var string
     */
    protected $id;

    /**
     * @var string
     */
    protected $mediaId;

    /**
     * @var string|null
     */
    protected $url;

    /**
     * @var string|null
     */
    protected $uuid;

    /**
     * @var \DateTimeInterface|null
     */
    protected $uploadedAt;

    public function getId(): string
    {
        return $this->id;
    }

    public function setId(string $id): void
    {
        $this->id = $id;
    }

    public function getMediaId(): string
    {
        return $this->mediaId;
    }

    public function setMediaId($mediaId): void
    {
        $this->mediaId = $mediaId;
    }

    public function getUrl(): string
    {
        return $this->url;
    }

    public function setUrl(string $url): void
    {
        $this->url = $url;
    }

    public function getUuid(): string
    {
        return $this->uuid;
    }

    public function setUuid(string $uuid): void
    {
        $this->uuid = $uuid;
    }

    public function getUploadedAt(): ?\DateTimeInterface
    {
        return $this->uploadedAt;
    }

    public function setUploadedAt(\DateTimeInterface $uploadedAt): void
    {
        $this->uploadedAt = $uploadedAt;
    }
}