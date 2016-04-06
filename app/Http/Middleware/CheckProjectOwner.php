<?php

namespace CodeProject\Http\Middleware;

use Closure;
use CodeProject\Repositories\ProjectRepository;
use LucaDegasperi\OAuth2Server\Authorizer;

class CheckProjectOwner
{


    private $repository;
    public function  __construct(ProjectRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $userId = \LucaDegasperi\OAuth2Server\Facades\Authorizer::getResourceOwnerId();
        $projectId = $request->project;


        if($this->repository->isOwner($projectId, $userId) == false) {
            return ['error'=>'Access forbidden'];
        }

        return $next($request);
    }
}
