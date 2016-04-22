<?php

namespace CodeProject\Http\Controllers;

use Illuminate\Http\Request;
use CodeProject\Http\Controllers\Controller;
use CodeProject\Repositories\ProjectMemberRepository;
use CodeProject\Services\ProjectMemberService;

class ProjectMemberController extends Controller
{

    private $repository;
    private $service;

    public function __construct(ProjectMemberRepository $repository, ProjectMemberService $service)
    {
        $this->repository = $repository;
        $this->service = $service;
        $this->middleware('check.project.owner', ['except' => ['index', 'show']]);
        $this->middleware('check.project.permission', ['except' => ['store', 'destroy']]);
    }

    public function index($id)
    {
        return $this->repository->findWhere(['project_id' => $id]);
    }

    public function store(Request $request, $id)
    {
        if($request->member_id):
            $member = $this->repository->skipPresenter()->findWhere(['member_id'=>$request->member_id, 'project_id'=>$id]);
            if(count($member) == 0):
                return $this->service->create(array_merge($request->all(), ['project_id' => $id]));
            endif;
        endif;
        return ['error'=>'O membro já pertence ao projeto!']   ;
    }

    public function show($id, $memberId)
    {
        return $this->repository->find($memberId);
    }

    public function destroy($id, $memberId)
    {
        return ['deleted'=>$this->service->delete($memberId)];
    }

}
