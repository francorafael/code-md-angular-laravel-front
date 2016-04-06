<?php
/**
 * Created by PhpStorm.
 * User: rafael.franco
 * Date: 22/03/2016
 * Time: 10:39
 */

namespace CodeProject\Services;


use CodeProject\Repositories\ProjectMemberRepository;
use CodeProject\Repositories\ProjectRepository;
use CodeProject\Repositories\ProjectTaskRepository;
use CodeProject\Validators\ProjectMemberValidator;
use CodeProject\Validators\ProjectTaskValidator;
use Illuminate\Routing\Matching\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;

class ProjectMemberService
{


    /**
     * @var ProjectRepository
     */
    private $projectRepository;
    /**
     * @var ProjectMemberRepository
     */
    private $memberRepository;
    /**
     * @var ProjectMemberValidator
     */
    private $validator;


    /**
     * @param ProjectMemberRepository $memberRepository
     * @param ProjectMemberValidator $validator
     * @param ProjectRepository $projectRepository
     */
    public function __construct(ProjectMemberRepository $memberRepository, ProjectMemberValidator $validator, ProjectRepository $projectRepository)
    {
        $this->projectRepository = $projectRepository;
        $this->memberRepository = $memberRepository;
        $this->validator = $validator;
    }

    public function getMembers($projectId)
    {
        try {
            return $this->memberRepository->getMembers($projectId);
        } catch (\Exception $e) {
            return [
                "error" => true,
                "message" => $e->getMessage()
            ];
        }
    }

    public function getMember($projectId, $id)
    {
        try {
            $data = $this->memberRepository->findWhere(['project_id' => $projectId, 'member_id' => $id]);

            if (isset($data['data']) && count($data['data'])) {
                return [
                    'data' => current($data['data'])
                ];
            }

            return $data;
        } catch (\Exception $e) {
            return [
                "error" => true,
                "message" => $e->getMessage()
            ];
        }
    }

    public function addMember($data)
    {
        try {

            $this->validator->with($data)->passesOrFail();

            return [
                'success' => $this->projectRepository->addMember($data['project_id'], $data['user_id'])
            ];

        } catch (ValidatorException $e) {
            return [
                'error' => true,
                'message' => $e->getMessageBag()
            ];
        } catch (\Exception $e) {
            return [
                "error" => true,
                "message" => $e->getMessage()
            ];
        }
    }

    public function removeMember($projectId, $memberId)
    {
        try {

            return [
                'success' => $this->projectRepository->removeMember($projectId, $memberId)
            ];

        } catch (\Exception $e) {
            return [
                "error" => true,
                "message" => $e->getMessage()
            ];
        }
    }
}