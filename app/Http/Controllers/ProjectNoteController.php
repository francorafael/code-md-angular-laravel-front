<?php

namespace CodeProject\Http\Controllers;

use Illuminate\Http\Request;
use CodeProject\Repositories\ProjectNoteRepository;
use CodeProject\Services\ProjectNoteService;

class ProjectNoteController extends Controller
{

    private $repository;
    private $service;

    public function __construct(ProjectNoteRepository $repository, ProjectNoteService $service)
    {
        $this->repository = $repository;
        $this->service = $service;

    }

    public function index($id)
    {
        return $this->repository->findWhere(['project_id' => $id]);
    }

    public function store($project_id, Request $request)
    {
        return $this->service->create(array_merge($request->all(), ['project_id' => $project_id]));
    }

    public function show($id, $noteId)
    {
        return $this->repository->find($noteId);
    }

    public function update($project_id, $idNote, Request $request)
    {
        return $this->service->update(array_merge($request->all(), ['project_id' => $project_id]), $idNote);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, $idNote)
    {
        return ['data'=>$this->repository->delete($idNote)];

    }

}
