<?php
/**
 * Created by PhpStorm.
 * User: rafael.franco
 * Date: 29/03/2016
 * Time: 09:43
 */

namespace CodeProject\OAuth;

use Illuminate\Support\Facades\Auth;

class PasswordGrantVerifier
{
    public function verify($username, $password)
    {
        $credentials = [
            'email'    => $username,
            'password' => $password,
        ];

        if (Auth::once($credentials)) {
            return Auth::user()->id;
        }

        return false;
    }
}