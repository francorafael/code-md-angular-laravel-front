<?php
/**
 * Created by PhpStorm.
 * User: rafael.franco
 * Date: 21/03/2016
 * Time: 08:56
 */

namespace CodeProject\Services;



use CodeProject\Repositories\UserRepository;
use CodeProject\Validators\UserValidator;

class UserService
{
    /**
     * @var UserRepository
     */
    private $repository;
    /**
     * @var UserValidator
     */
    private $validator;

    /**
     * @param UserRepository $repository
     * @param UserValidator $validator
     */
    public function __construct(UserRepository $repository, UserValidator $validator)
    {
        $this->repository = $repository;
        $this->validator = $validator;
    }



}