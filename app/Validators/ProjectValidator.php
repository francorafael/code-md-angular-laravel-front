<?php
/**
 * Created by PhpStorm.
 * User: rafael.franco
 * Date: 22/03/2016
 * Time: 10:40
 */

namespace CodeProject\Validators;

use Prettus\Validator\LaravelValidator;

class ProjectValidator extends LaravelValidator
{
    protected $rules = [
        'owner_id'      =>  'required',
        'client_id'     =>  'required',
        'name'          =>  'required|max:255',
        'description'   =>  'required',
        'progress'      =>  'required',
        'status'        =>  'required',
        'due_date'      =>  'required'
    ];
}