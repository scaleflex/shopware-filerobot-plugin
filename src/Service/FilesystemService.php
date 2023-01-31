<?php declare(strict_types=1);

namespace Scaleflex\Filerobot\Service;

use League\Flysystem\FilesystemInterface;

class FilesystemService
{
    /**
     * @var FilesystemInterface
     */
    private FilesystemInterface $fileSystemPublic;

    /**
     * @var FilesystemInterface
     */
    private FilesystemInterface $fileSystemPrivate;

    /**
     * FilesystemService constructor.
     * @param FilesystemInterface $fileSystemPublic
     * @param FilesystemInterface $fileSystemPrivate
     */
    public function __construct(FilesystemInterface $fileSystemPublic, FilesystemInterface $fileSystemPrivate)
    {
        $this->fileSystemPublic = $fileSystemPublic;
        $this->fileSystemPrivate = $fileSystemPrivate;
    }

    public function hasPublicFile(string $filename): bool
    {
        return $this->fileSystemPublic->has($filename);
    }

    public function removePublicFile(string $filename): bool
    {
        return $this->fileSystemPublic->delete($filename);
    }
}