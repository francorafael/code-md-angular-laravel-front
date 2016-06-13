<?php

namespace CodeProject\Http\Controllers;

use CodeProject\Repositories\ProjectFileRepository;

use CodeProject\Services\ProjectFileService;
use Illuminate\Contracts\Filesystem\Factory;
use Illuminate\Http\Request;

use CodeProject\Http\Requests;



class ProjectFileController extends Controller
{

    private $repository;
    private $service;
    private $storage;

    public function __construct(ProjectFileRepository $repository, ProjectFileService $sevice, Factory $storage)
    {
        $this->repository = $repository;
        $this->service = $sevice;
        $this->storage = $storage;
    }

    public function index($id)
    {
        return $this->repository->skipPresenter()->findWhere(['project_id' => $id]);
    }

    public function store($id, Request $request)
    {
        return [$this->service->create(array_merge($request->all(), ['project_id' => $id]))];
    }

    public function update($id, $projectFileId, Request $request)
    {
        return $this->service->update($request->all(), $projectFileId);
    }

    public function destroy($id, $file)
    {
        $this->service->deleteFile($file);
    }

    public function show($id, $idFile)
    {
        return $this->repository->find($idFile);
    }

//    public function showFile($id, $idFile)
//    {
//        //   dd($id);
//        $filePath = $this->service->getFilePath($idFile);
//        $fileContents = file_get_contents($filePath);
//        $file64 = base64_encode($fileContents);
//        $name = $this->service->getFileName($idFile);
//        return [
//            'file' => $file64,
//            'size' => filesize($filePath),
//            'name' => $name
//        ];
//    }

    public function showFile($id, $idFile)
    {
        $model = $this->repository->skipPresenter()->find($idFile);
        $filePath = $this->service->getFilePath($idFile);
        $fileContents = file_get_contents($filePath);
        $file64 = base64_encode($fileContents);
        $name = $this->service->getFileName($idFile);
        return [
            'file' => $file64,
            'size' => filesize($filePath),
            'name' => $name,
            'mime_type' => $this->storage->mimeType($name)
        ];
    }
}
