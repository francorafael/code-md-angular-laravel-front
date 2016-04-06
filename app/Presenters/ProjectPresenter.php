<?php
/**
 * Created by PhpStorm.
 * User: rafael.franco
 * Date: 04/04/2016
 * Time: 10:36
 */

namespace CodeProject\Presenters;

use CodeProject\Transformers\ProjectTransformer;
use Prettus\Repository\Presenter\FractalPresenter;


class ProjectPresenter extends FractalPresenter
{
    public function getTransformer()
    {
        return new ProjectTransformer();
    }
}