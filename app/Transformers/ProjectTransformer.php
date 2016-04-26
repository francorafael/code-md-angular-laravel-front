<?php

namespace CodeProject\Transformers;

use CodeProject\Entities\Project;
use CodeProject\Transformers\ProjectMemberTransformer;
use League\Fractal\TransformerAbstract;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;

class ProjectTransformer extends TransformerAbstract
{
    protected $defaultIncludes = ['members', 'notes', 'tasks', 'files', 'client'];


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
            'tasks_count' => $model->tasks->count(),
            'tasks_opened' => $this->countTasksOpened($model)
        ];
    }

    //this collection para serealizar
    //item - >somente um item

    public function includeMembers(Project $project)
    {
        return $this->collection($project->members, new MemberTransformer());
    }

    public function includeNotes(Project $project)
    {
        return $this->collection($project->notes, new ProjectNoteTransformer());
    }

    public function includeFiles(Project $project)
    {
        return $this->collection($project->files, new ProjectFileTransformer());
    }

    public function includeTasks(Project $project)
    {
        return $this->collection($project->tasks, new ProjectTaskTransformer());
    }

    public function includeClient(Project $model)
    {
        return $this->item($model->client, new ClientTransformer());
    }

    public function countTasksOpened(Project $project)
    {
        $count = 0;
        foreach($project->tasks as $o) {
            if($o->status == 1) {
                $count++;
            }
        }
        return $count;
    }
}