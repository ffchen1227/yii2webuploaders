<?php

use yii\helpers\Html;
use yii\helpers\Url;

?>
<div class="js-upload-image" >
    <div id="file_list_<?=$attribute?>" class="uploader-list">
        <?php if(!empty($inputValue)): ?>
            <div class="file-item thumbnail">
                <a class="img-link" href="<?php echo $inputValue?>">
                    <img src="<?php echo $inputValue?>" width="100">
                </a>
                <i class="remove-picture glyphicon glyphicon-remove"></i>

            </div>
        <?php endif; ?>
    </div>
    <div class="clearfix"></div>
    <input type="hidden" name="<?=$inputName?>" data-multiple="false" data-size="0" data-ext="" id="<?=$attribute?>"   value="<?php echo empty($inputValue) ? '' : $inputValue;?>">
    <div id="picker_<?=$attribute?>">上传单张图片</div>

    <div class="help-block"></div>

</div>
<script>
    var image_upload_url= '<?=$config['serverUrl']?>';
</script



