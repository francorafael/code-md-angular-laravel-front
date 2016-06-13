<?php

namespace CodeProject\Events;

use CodeProject\Entities\ProjectTask;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;


class TaskWasIncluded extends Event implements ShouldBroadcast
{
    //serializar os models - em json
    use SerializesModels;
    public $task;

    public function  __construct(ProjectTask $task)
    {
        $this->task = $task;
    }

    public function broadcastOn()
    {
        //canal que nos criamos com o nosso servico de real time
        return['user.'.\Authorizer::getResourceOwnerId()];
    }
}
