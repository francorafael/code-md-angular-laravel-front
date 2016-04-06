<?php

namespace CodeProject\Transformers;

use CodeProject\Entities\ProjectMember;
use League\Fractal\TransformerAbstract;


class MemberTransformer extends TransformerAbstract
{
    public function transform(ProjectMember $member)
    {
        return [
            'project_id' => $member->project->id,
            'user_id'    => $member->member->id,
            'name'       => $member->member->name
        ];
    }
}