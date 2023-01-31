<?php declare(strict_types=1);

namespace Scaleflex\Filerobot\Service;

use League\Flysystem\FilesystemInterface;

class FilesystemService
{
    private $fileSystemPublic;

    /**
     * FilesystemService constructor.
     * @param FilesystemInterface $fileSystemPublic
     */
    public function __construct(FilesystemInterface $fileSystemPublic)
    {
        $this->fileSystemPublic = $fileSystemPublic;
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