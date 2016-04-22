<?php

namespace CodeProject\Transformers;

use League\Fractal\TransformerAbstract;
use CodeProject\Entities\User;
use CodeProject\Entities\ProjectMember;

/**
 * Class ProjectMemberTransformer
 * @package namespace larang\Transformers;
 */
class ProjectMemberTransformer extends TransformerAbstract
{

    protected $defaultIncludes = ['user'];

    public function transform(ProjectMember $model)
    {

        return [
            'id' => $model->id,
            'project_id' => $model->project_id,
        ];
    }

    public function includeUser(ProjectMember $model)
    {
        return $this->collection($model->member, new MemberTransformer());
    }

}
