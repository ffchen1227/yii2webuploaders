<?php

namespace common\widgets\file\assets;

use Yii;
use yii\web\AssetBundle;


class FileUploadAsset extends AssetBundle
{

    public $css = [
        'css/webuploader.css',
        'css/magnific-popup.min.css',
        
    ];
    
    public $js = [
        'js/magnific-popup.min.js',
        'js/webuploader.min.js',
        //'js/uploader.js',
        'js/Sortable.min.js',
        'js/uploader.js',
    ];
    
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapAsset',
    ];
    
    /**
     * 初始化：sourcePath赋值
     * @see \yii\web\AssetBundle::init()
     */
    public function init()
    {
        $this->sourcePath = dirname(dirname(__FILE__)).DIRECTORY_SEPARATOR . 'statics';
    }
}