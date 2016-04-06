<?php
/**
 * Created by PhpStorm.
 * User: rafael.franco
 * Date: 04/04/2016
 * Time: 10:26
 */

namespace CodeProject\Transformers;

use CodeProject\Entities\User;
use League\Fractal\TransformerAbstract;

class ProjectMemberTransformer extends TransformerAbstract
{
    public function transform(User $member)
    {
        return [
            'member_id' => $member->id,
            'name' => $member->name,
        ];
    }
}