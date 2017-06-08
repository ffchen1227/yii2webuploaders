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
不足之处见谅
