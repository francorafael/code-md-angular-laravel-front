<?php

namespace CodeProject\Validators;

use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\LaravelValidator;

class ProjectFileValidator extends LaravelValidator
{
    protected $rules = [
        ValidatorInterface::RULE_CREATE => [
            'project_id'  => 'required|integer',
            'file'        => 'required|mimes:jpeg,jpg,png,gif,pdf,zip',
            'name'        => 'required',
            'description' => 'required'
        ],
        ValidatorInterface::RULE_UPDATE => [
            'name'        => 'required',
            'description' => 'required'
        ]
    ];
}