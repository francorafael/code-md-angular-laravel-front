<?php

namespace CodeProject\Services;

use CodeProject\Repositories\ProjectTaskRepository;
use CodeProject\Repositories\ProjectRepository;
use CodeProject\Validators\ProjectTaskValidator;

class ProjectTaskService extends Service
{

    protected $repository;
    protected $projectRepository;
    protected $validator;

    public function __construct(ProjectTaskRepository $repository,ProjectRepository $projectRepository, ProjectTaskValidator $validator)
    {
        $this->repository = $repository;
        $this->validator = $validator;
        $this->projectRepository = $projectRepository;
    }


}
