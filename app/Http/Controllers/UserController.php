<?php

namespace CodeProject\Http\Controllers;

use CodeProject\Repositories\UserRepository;


use CodeProject\Http\Requests;
use CodeProject\Services\UserService;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;

class UserController extends Controller
{

    private $repository;
    private $service;


    public function  __construct(UserRepository $repository, UserService $service)
    {
        $this->repository = $repository;
        $this->service = $service;
    }

    public function authenticated()
    {
        $userId = Authorizer::getResourceOwnerId();
        return $this->repository->find($userId);
    }



}
