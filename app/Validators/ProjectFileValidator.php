<?php

namespace CodeProject\Validators;

use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\LaravelValidator;

class ProjectFileValidator extends LaravelValidator
{
    protected $rules = [
        ValidatorInterface::RULE_CREATE => [
            'file' => 'required|mimes:jpg,jpeg,bmp,png',
            'name' => 'required|max:255',
            'description' => 'required',
            'project_id' => 'required|integer|exists:projects,id'
        ],
        ValidatorInterface::RULE_UPDATE => [
            'name' => 'required|max:255',
            'description' => 'required',
            'project_id' => 'required|integer|exists:projects,id'
        ]
    ];
}