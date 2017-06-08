<?php
namespace ffchen\webuploader;

 
use Yii;
use yii\base\Action;
use yii\helpers\ArrayHelper;
use ffchen\webuploader\Uploader;

class UploadAction extends Action
{
    /**
     * 配置文件
     * @var array
     */
    public $config = [];
    
    public function init()
    {
        //close csrf
        Yii::$app->request->enableCsrfValidation = false;
        //默认设置
        $_config = require(__DIR__ . '/config.php');
        //load config file
        $this->config = ArrayHelper::merge($_config, $this->config);
        parent::init();
    }
    
    public function run()
    {
        $action = Yii::$app->request->get('action');
        switch ($action) {
                /* 上传图片 */
            case 'uploadimage':
                /* 上传文件 */
            case 'uploadfile':
                $result = $this->ActUpload();
                break;
            default:
                $result = json_encode(array(
                    'state' => '请求地址出错'
                ));
                break;
        }
        echo $result;
    }
    
    /**
     * 上传
     * @return string
     */
    protected function ActUpload()
    {
        $base64 = "upload";
        switch (htmlspecialchars($_GET['action'])) {
            
            case 'uploadimage':
                $config = array(
                "pathFormat" => $this->config['imagePathFormat'],
                "maxSize" => $this->config['imageMaxSize'],
                "allowFiles" => $this->config['imageAllowFiles'],
                );
                $fieldName = $this->config['imageFieldName'];
                break;
                
            case 'uploadfile':
            default:
                $config = array(
                "pathFormat" => $this->config['filePathFormat'],
                "maxSize" => $this->config['fileMaxSize'],
                "allowFiles" => $this->config['fileAllowFiles']
                );
                $fieldName = $this->config['fileFieldName'];
                break;
        }
        $config['uploadFilePath'] = isset($this->config['uploadFilePath'])?$this->config['uploadFilePath']:'';
        /* 生成上传实例对象并完成上传 */
        $up = new Uploader($fieldName, $config, $base64);
        /* 返回数据 */
        return json_encode($up->getFileInfo());

    }
}