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

    public function all($limit = null)
    {
        try {
            return $this->repository->paginate($limit);
        } catch (\Exception $e) {
            return [
                "error" => true,
                "message" => $e->getMessage()
            ];
        }
    }

    public function allUsers()
    {
        try {
            return $this->repository->all();
        } catch (\Exception $e) {
            return [
                "error" => true,
                "message" => $e->getMessage()
            ];
        }
    }



}