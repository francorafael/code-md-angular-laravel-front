<?php

namespace CodeProject\Entities;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    //falar quais campos que podem passar num processo de create com array
    protected $fillable = [
        'owner_id',
        'client_id',
        'name',
        'description',
        'progress',
        'status',
        'due_date'
    ];

    public function owner()
    {
        $u = $this->belongsTo(User::class, 'owner_id', 'id');
        return $u;
    }
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function notes()
    {
        return $this->hasMany(ProjectNote::class);
    }

    public function tasks()
    {
        return $this->hasMany(ProjectTask::class);
    }

       public function members()
    {
        return $this->belongsToMany(User::class, 'project_members', 'project_id', 'member_id');
    }

    public function files()
    {
        return $this->hasMany(ProjectFile::class);
    }

}
