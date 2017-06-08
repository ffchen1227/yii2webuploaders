yii2webuploaders
==========
yii2 webuploader 上传widget  可拖动图片排序

安装
------------
```
$ php composer.phar require ffchen/webuploader "*"

```

使用

------------
控制器

------------
```php
public function actions()

   {
        return [
          'uploads'=>[
                'class' => 'ffchen\webuploader\UploadAction',
                'config' => [
                    'imagePathFormat' => Yii::getAlias('@web')."/image/{yyyy}{mm}{dd}/{time}{rand:6}",
                ]
            ]
        ];
    }

```

```
<?php $form = ActiveForm::begin(); ?>
        
   <?= $form->field($model, 'label_img')->widget('ffchen\webuploader\FileInput',[
         'type' => 'images'//多图上传 不写或者写image 为单图
         'config'=>[
            //图片上传的一些配置，不写调用默认配置
            'domain_url' => 'http://www.github.com.com',
        ]
    ]) ?>
    
    
<?php ActiveForm::end(); ?>
```
------------
如果是多图情况在保存入库下把字段序列化后保存例如

```
            //Create
            $imaes = explode(',',Yii::$app->request->post()['Imag']['srcs']);
            for($index=0;$index<count($imaes);$index++)
            {
                $imaes[$index];
            }
            $model->srcs = serialize($imaes);
            
            
            //Update
            $imaes = explode(',',Yii::$app->request->post()['Imag']['srcs']);
            for($index=0;$index<count($imaes);$index++)
            {
                $imaes[$index];
            }
            $model->srcs = serialize($imaes);
```
------------
一张效果图

 ![image](https://github.com/ffchen1227/yii2webuploader/20170608110057.jpg)

------------
不足之处请见谅
