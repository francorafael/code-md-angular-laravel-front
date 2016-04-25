<?php

namespace CodeProject\Transformers;

use League\Fractal\TransformerAbstract;
use CodeProject\Entities\Client;

/**
 * Class ClientTransformer
 * @package namespace CodeProject\Transformers;
 */
class ClientTransformer extends TransformerAbstract
{

    protected $defaultIncludes = ['projects'];

    /**
     * Transform the \Client entity
     * @param \Client $model
     *
     * @return array
     */
    public function transform(Client $model) {
        return [
            'id'          => $model->id,
            'name'        => $model->name,
            'responsible' => $model->responsible,
            'email'       => $model->email,
            'phone'       => $model->phone,
            'address'     => $model->address,
            'obs'         => $model->obs,
            'created_at'  => $model->created_at,
            'updated_at'  => $model->updated_at
        ];
    }

    public function includeProjects(Client $client)
    {
        $transformer = new ProjectTransformer();
        //meu default includes é vazio
        $transformer->setDefaultIncludes([]);

        return $this->collection($client->projects, $transformer);
    }
}