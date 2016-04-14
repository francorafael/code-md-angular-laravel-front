<?php
/**
 * Created by PhpStorm.
 * User: rafael.franco
 * Date: 22/03/2016
 * Time: 10:39
 */

namespace CodeProject\Services;


use CodeProject\Repositories\ProjectRepository;
use CodeProject\Validators\ProjectValidator;
use Prettus\Validator\Exceptions\ValidatorException;


class ProjectService
{

    /**
     * @var ProjectRepository
     */
    private $repository;

    /**
     * @var ProjectValidator
     */
    private $validator;

    /**
     * @param ProjectRepository $repository
     * @param ProjectValidator $validator
     */


    public function __construct(ProjectRepository $repository, ProjectValidator $validator)
    {
        $this->repository = $repository;
        $this->validator = $validator;
    }

    public function create(array $data)
    {
        try {
            $this->validator->with($data)->passesOrFail();
            return $this->repository->create($data);
        } catch (ValidatorException $e) {
            return [
                'error'     => true,
                'message'   => $e->getMessageBag()
            ];
        }
    }

    public function update(array $data, $id)
    {
        try {
            $this->validator->with($data)->passesOrFail();
            return $this->repository->update($data, $id);
        } catch (ValidatorException $e) {
            return [
                'error'     => true,
                'message'   => $e->getMessageBag()
            ];
        }
    }

    public function all($limit = null)
    {
        try {
            return $this->repository->with(['owner', 'client', 'members'])->paginate($limit);
        } catch (\Exception $e) {
            return [
                "error" => true,
                "message" => $e->getMessage()
            ];
        }
    }

    public function find($id)
    {
        try {
            return $this->repository->with(['owner', 'client', 'members'])->find($id);
        } catch (\Exception $e) {
            return [
                "error" => true,
                "message" => $e->getMessage()
            ];
        }
    }

    public function delete($id)
    {
        try {
            $this->repository->delete($id);

            return ['success' => true];

        } catch (\Exception $e) {
            return [
                "error" => true,
                "message" => $e->getMessage()
            ];
        }
    }

    private function checkProjectOwner($projectId)
    {
        $userId = Authorizer::getResourceOwnerId();
        return $this->repository->isOwner($projectId, $userId);
    }

    private function checkProjectMember($projectId)
    {
        $userId = Authorizer::getResourceOwnerId();
        return $this->repository->hasMember($projectId, $userId);
    }

    private function checkProjectPermissions($projectId)
    {
        if( $this->checkProjectOwner($projectId) or $this->checkProjectMember($projectId)){
            return true;
        }
        return false;
    }


}