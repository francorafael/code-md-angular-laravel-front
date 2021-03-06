<?php
/**
 * Created by PhpStorm.
 * User: rafael.franco
 * Date: 21/03/2016
 * Time: 09:39
 */

namespace CodeProject\Validators;

//extender do laravel validator
use Prettus\Validator\LaravelValidator;

class UserValidator extends LaravelValidator
{
    protected $rules = [
        'name' => 'required|max:255',
        'email' => 'required|email',
    ];
}