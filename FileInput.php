<?php

namespace ffchen\webuploader;

use Yii;
use yii\widgets\InputWidget;
use yii\helpers\Html;
use yii\web\View;
use ffchen\webuploader\assets\FileUploadAsset;
use yii\helpers\ArrayHelper;
use yii\helpers\Url;

class FileInput extends InputWidget
{
    public $type = 'image';//单图

    public $config = [];

    public $value = '';

    public function init()
    {
        $_config = [
            'serverUrl' => Url::to(['upload','action'=>'uploadimage']),  //上传服务器地址
            'fileName' => 'file',                                      //提交的图片表单名称
            'domain_url' => '',                                          //图片域名 不填为当前域名
        ];
        $this->config = ArrayHelper::merge($_config, $this->config);
        parent::init();
    }

    public function run()
    {
        $this->registerClientScript();
        //模型是继承自model and 这个atribue不为空
        if ($this->hasModel()) {
            $inputName = Html::getInputName($this->model, $this->attribute);
            $inputValue = Html::getAttributeValue($this->model, $this->attribute);
            return $this->render($this->type,[
                'model'=>$this->model,
                'config'=>$this->config,
                'inputName' => $inputName,
                'inputValue' => $inputValue,
                'attribute' => $this->attribute,
            ]);
        }
    }

    public function registerClientScript()
    {
        FileUploadAsset::register($this->view);
    }
}