<?php

namespace CodeProject\Transformers;

use League\Fractal\TransformerAbstract;
use CodeProject\Entities\ProjectNote;

/**
 * Class ProjectNoteTransformer
 * @package namespace CodeProject\Transformers;
 */
class ProjectNoteTransformer extends TransformerAbstract
{

    public function transform(ProjectNote $model)
    {
        return [
            'id' => $model->id,
            'project_id' => $model->project_id,
            'title' => $model->title,
            'note' => $model->note,
            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at,
        ];
    }
}