<?php

namespace CodeProject\Http\Controllers;

use Illuminate\Http\Request;
use CodeProject\Repositories\ProjectTaskRepository;
use CodeProject\Services\ProjectTaskService;

class ProjectTaskController extends Controller
{

    private $repository;
    private $service;

    public function __construct(ProjectTaskRepository $repository, ProjectTaskService $sevice)
    {
        $this->repository = $repository;
        $this->service = $sevice;
    }

    public function index($id)
    {
        return $this->repository->findWhere(['project_id' => $id]);
    }

    public function store($id, Request $request)
    {
        return $this->service->create(array_merge($request->all(), ['project_id'=>$id]));
    }

    public function show($id, $task)
    {
        return $this->repository->find($task);
    }

    public function update($id, $task, Request $request)
    {
        return $this->service->update(array_merge($request->all(), ['project_id' => $id]), $task);
    }

    public function destroy($id, $task)
    {
        $this->repository->delete($task);
    }

}
