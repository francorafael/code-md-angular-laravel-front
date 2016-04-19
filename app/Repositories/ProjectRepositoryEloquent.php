<?php
/**
 * Created by PhpStorm.
 * User: rafael.franco
 * Date: 22/03/2016
 * Time: 10:26
 */

namespace CodeProject\Repositories;


use CodeProject\Entities\Project;
use Prettus\Repository\Eloquent\BaseRepository;
use CodeProject\Presenters\ProjectPresenter;


class ProjectRepositoryEloquent extends BaseRepository implements ProjectRepository
{
    public function model()
    {
        return Project::class;
    }

    public function isOwner($projectID, $userId)
    {
        if(count($this->skipPresenter()->findWhere(['id'=>$projectID, 'owner_id'=>$userId])))
        {
            return true;
        }
        return false;
    }

    // METHODS TO RELATIONS WITH USERS
    public function findWithOwnerAndMember($userId)
    {
        return $this->scopeQuery(function($queryBuilder) use($userId) {
            return $queryBuilder->select('projects.*')
                ->leftJoin('project_members', 'project_members.project_id', '=', 'projects.id')
                ->where('project_members.member_id', '=', $userId)
                ->union($this->model->query()->getQuery()->where('owner_id', '=', $userId));
        })->all();
    }


    public function hasMember($projectId, $memberId)
    {
        $project = $this->skipPresenter()->find($projectId);

        foreach($project->members as $member) {
            if($member->id == $memberId) {
                return true;
            }
        }

        return false;
    }

    public function presenter()
    {
        return ProjectPresenter::class;
    }
}