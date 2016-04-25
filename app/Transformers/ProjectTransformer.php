<?php
/**
 * Created by PhpStorm.
 * User: rafael.franco
 * Date: 04/04/2016
 * Time: 10:26
 */

namespace CodeProject\Transformers;

use CodeProject\Entities\Project;
use CodeProject\Transformers\ProjectMemberTransformer;
use League\Fractal\TransformerAbstract;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;

class ProjectTransformer extends TransformerAbstract
{
    protected $defaultIncludes = ['members', 'client'];

    public function transform(Project $model)
    {
        return [
            'id' => $model->id,
            'client_id' => $model->client_id,
            'name' => $model->name,
            'description' => $model->description,
            'progress' => (int) $model->progress,
            'status' => $model->status,
            'due_date' => $model->due_date,
            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at,
            'is_member' => $model->owner_id != \Authorizer::getResourceOwnerId(),
        ];
    }

    public function includeMembers(Project $project)
    {
        return $this->collection($project->members, new MemberTransformer());
    }


    public function includeClient(Project $model)
    {
        return $this->item($model->client, new ClientTransformer());
    }
}