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

    /**
     * Transform the \ProjectNote entity
     * @param \ProjectNote $model
     *
     * @return array
     */
    public function transform(ProjectNote $model) {
        return [
            'project_id' => $model->project_id,
            'id'         => $model->id,
            'title'      => $model->title,
            'note'       => $model->note,
            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }
}