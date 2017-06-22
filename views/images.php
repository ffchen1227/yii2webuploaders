<?php

use yii\helpers\Html;

$inputValue = unserialize($inputValue);
$imageValue = '';
if(!empty($inputValue) && is_array($inputValue)){
    foreach ($inputValue as $images){
        $imageValue.= $images.',';
    }
}
$imageValue = rtrim($imageValue, ',');
?>

    <div class="js-upload-images" >
        <div id="file_list_<?=$attribute;?>" class="uploader-list">
            <?php if(!empty($inputValue) && is_array($inputValue)):?>
                <?php foreach ($inputValue as $image): ?>
                    <div class="file-item thumbnail">
                        <a class="img-link" href="<?php echo $image?>">
                            <img src="<?php echo $image?>" width="100">
                        </a>
                        <i class="remove-picture glyphicon glyphicon-remove" data-id="<?=$image;?>"></i>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
        <div class="clearfix"></div>
        <input type="hidden" name="<?=$inputName?>" data-multiple="true"   data-size="" data-ext="" id="<?=$attribute?>" value="<?php echo $imageValue?>">
        <div id="picker_<?=$attribute?>">上传多张图片</div>

        <div class="help-block"></div>
    </div>

<script>
    var image_upload_url= '<?=$config['serverUrl']?>';
</script>