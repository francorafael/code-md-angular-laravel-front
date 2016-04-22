<?php


namespace CodeProject\Services;


use CodeProject\Repositories\ProjectMemberRepository;
use CodeProject\Validators\ProjectMemberValidator;


class ProjectMemberService extends Service
{

    protected $repository;
    protected $validator;

    public function __construct(ProjectMemberRepository $repository, ProjectMemberValidator $validator)
    {
        $this->repository = $repository;
        $this->validator = $validator;
    }


}