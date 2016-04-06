<?php
/**
 * Created by PhpStorm.
 * User: rafael.franco
 * Date: 22/03/2016
 * Time: 10:40
 */

namespace CodeProject\Validators;

use Prettus\Validator\LaravelValidator;

class ProjectTaskValidator extends LaravelValidator
{
    protected $rules = [
        'name'           =>  'required',
        'project_id'      =>  'required|integer',
        'start_date'      =>  'required',
        'due_date'      =>  'required',
        'status'        =>  'required'
    ];
}