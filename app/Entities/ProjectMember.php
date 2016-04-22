<?php

namespace CodeProject\Entities;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class ProjectMember extends Model implements Transformable
{
    use TransformableTrait;

    protected $table = 'project_members';
    protected $fillable = ['member_id', 'project_id'];

    public function projects()
    {
        return $this->belongsToMany(Project::class);
    }

    public function member()
    {
        return $this->belongsToMany(User::class, 'project_members', 'id','member_id');
    }

}
