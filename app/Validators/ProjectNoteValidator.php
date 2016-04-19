<?php
/**
 * Created by PhpStorm.
 * User: rafael.franco
 * Date: 22/03/2016
 * Time: 10:40
 */

namespace CodeProject\Validators;

use Prettus\Validator\LaravelValidator;

class ProjectNoteValidator extends LaravelValidator
{
    protected $rules = [
    'title' => 'required:max:255',
    'note' => 'required',
    ];
}