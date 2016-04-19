<?php

namespace CodeProject\Services;

use Prettus\Validator\Exceptions\ValidatorException;
use CodeProject\Repositories\ProjectFileRepository;
use CodeProject\Validators\ProjectFileValidator;
use Illuminate\Contracts\FileSystem\Factory as Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Filesystem\Filesystem;
use Prettus\Validator\Contracts\ValidatorInterface;

class ProjectFileService
{
    private $fileSystem;
    private $storage;
    protected $repository;
    protected $validator;

    public function __construct(
        ProjectFileRepository $repository, ProjectFileValidator $validator, Filesystem $fileSystem, Storage $storage)
    {
        $this->fileSystem = $fileSystem;
        $this->storage = $storage;
        $this->repository = $repository;
        $this->validator = $validator;
    }

    public function create(array $data)
    {
        try {
            $this->validator->with($data)->passesOrFail(ValidatorInterface::RULE_CREATE);

            $file = $data['file'];
            $extension = $file->getClientOriginalExtension();
            $data['file'] = $file;
            $data['extension'] = $extension;
            $data['lable'] = isset($data['lable']) ? $data['lable'] : null;
            $data['description'] = $data['description'] ? $data['description'] : null;
            $pf = $this->repository->skipPresenter()->create($data);
            if (isset($pf->id)) {
                if ($this->storage->put($pf->getFileName(), File::get($data['file']))) {
                    return true;
                }
            }
        } catch (ValidatorException $ex) {
            return [
                'error' => TRUE,
                'message' => $ex->getMessageBag()
            ];
        }
    }

    public function update(array $data, $id)
    {
        try {
            $this->validator->with($data)->passesOrFail(ValidatorInterface::RULE_UPDATE);
            return $this->repository->update($data, $id);
        } catch (ValidatorException $ex) {
            return [
                'error' => TRUE,
                'message' => $ex->getMessageBag()
            ];
        }
    }

    public function deleteFile($id)
    {
        $pf = $this->repository->skipPresenter()->find($id);
        $filename = $pf->getFileName();
        if ($this->storage->exists($filename)) {
            $this->storage->delete($filename);
        }
        if (!$this->storage->exists($filename)) {
            return $pf->delete();
        }
        return false;
    }

    public function getFilePath($id)
    {

        $pf = $this->repository->skipPresenter()->find($id);

        return $this->getBaseUrl($pf);
    }

    private function getBaseUrl($pf)
    {
        switch ($this->storage->getDefaultDriver()) {
            case 'local':
                return $this->storage->getDriver()->getAdapter()->getPathPrefix()
                . '/' . $pf->getFileName();
        }
    }

    public function getFileName($id)
    {
        $pf = $this->repository->skipPresenter()->find($id);
        return $pf->getFileName();
    }

}