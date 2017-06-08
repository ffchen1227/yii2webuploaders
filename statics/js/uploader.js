/**
 * Created by Administrator on 2017-06-04.
 */

 // 图片上传
    $('.js-upload-image,.js-upload-images').each(function () {
        var $input_file       = $(this).find('input');
        var $input_file_name  = $input_file.attr('id');
        // 是否多图片上传
        var $multiple         = $input_file.data('multiple');
        // 允许上传的后缀
        var $ext              = $input_file.data('ext');
        // 图片限制大小
        var $size             = $input_file.data('size');
        // 图片列表
        var $file_list        = $('#file_list_' + $input_file_name);
		
		var file_lists		  =	"file_list_"+$input_file_name+" i";
		
		var input_file_names  =	$input_file_name;
        // 优化retina, 在retina下这个值是2
        var ratio             = window.devicePixelRatio || 1;
        // 缩略图大小
        var thumbnailWidth    = 100 * ratio;
        var thumbnailHeight   = 100 * ratio;
        // 实例化上传
        var uploader = WebUploader.create({
            // 选完图片后，是否自动上传。
            auto: true,
            // 去重
            duplicate: true,
            // 不压缩图片
            resize: false,
            compress: false,
            // swf图片路径
			 // swf文件路径
            swf: '${ctxStatic }/webupload/Uploader.swf',

                // 文件接收服务端。
            server: image_upload_url,
            //swf: dolphin.WebUploader_swf,
            // 图片接收服务端。
            //server: dolphin.image_upload_url,
            // 选择图片的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: {
                id: '#picker_' + $input_file_name,
                multiple: $multiple,
            },
            // 图片限制大小
            fileSingleSizeLimit: $size,
            // 只允许选择图片文件。
            accept: {
                title: 'Images',
                extensions: $ext,
                mimeTypes: 'image/jpg,image/jpeg,image/bmp,image/png,image/gif'
            }
        });

        // 当有文件添加进来的时候
        uploader.on( 'fileQueued', function( file ) {
            var $li = $(
                    '<div id="' + file.id + '" class="file-item js-gallery thumbnail">' +
                    '<a class="img-link" href="">'+
                    '<img>' +
                    '</a>'+
                    '<div class="info">' + file.name + '</div>' +
                    '<i class="remove-picture glyphicon glyphicon-remove" ></i>' +
                    '</div>'
                ),
                $img = $li.find('img');
			
			//$file_list.append( $li );			
            if ($multiple) {
                $file_list.append( $li );
            } else {
                $file_list.html( $li );
                $input_file.val('');
            }			
            // 创建缩略图
            // 如果为非图片文件，可以不用调用此方法。
            // thumbnailWidth x thumbnailHeight 为 100 x 100
            uploader.makeThumb( file, function( error, src ) {
                if ( error ) {
                    $img.replaceWith('<span>不能预览</span>');
                    return;
                }
                $img.attr( 'src', src );
            }, thumbnailWidth, thumbnailHeight );

            // 创建进度条
            $('<div class="progress progress-mini remove-margin active"><div class="progress-bar progress-bar-primary progress-bar-striped" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div></div>')
                .appendTo( $li );
        });

        // 文件上传过程中创建进度条实时显示。
        uploader.on( 'uploadProgress', function( file, percentage ) {
            var $percent = $( '#'+file.id ).find('.progress-bar');
            $percent.css( 'width', percentage * 100 + '%' );
        });

        // 文件上传成功
        uploader.on( 'uploadSuccess', function( file, response ) {
            var $li = $( '#'+file.id );

            if (response.status == 1) {
                if ($multiple) {
                    if ($input_file.val()) {
                        $input_file.val($input_file.val() + ',' + response.id);
                    } else {
                        $input_file.val(response.id);
                    }
                    $li.find('.remove-picture').attr('data-id', response.id);
                } else {
                    $input_file.val(response.id);
                }
            }

            $('<div class="'+response.class+'"></div>').text(response.info).appendTo( $li );
            $li.find('a.img-link').attr('href', response.path);
        });

        // 文件上传失败，显示上传出错。
        uploader.on( 'uploadError', function( file ) {
            var $li = $( '#'+file.id );
            $('<div class="text-danger">上传失败</div>').appendTo( $li );
        });

        // 文件验证不通过
        uploader.on('error', function (type) {
            switch (type) {
                case 'Q_TYPE_DENIED':
                    Dolphin.notify('图片类型不正确，只允许上传后缀名为：'+$ext+'，请重新上传！', 'danger');
                    break;
                case 'F_EXCEED_SIZE':
                    Dolphin.notify('图片不得超过'+ ($size/1024) +'kb，请重新上传！', 'danger');
                    break;
            }
        });

        // 完成上传完了，成功或者失败，先删除进度条。
        uploader.on( 'uploadComplete', function( file ) {
            setTimeout(function(){
                $( '#'+file.id ).find('.progress').remove();
            }, 500);
        });

        // 删除图片
        $file_list.delegate('.remove-picture', 'click', function(){
            if ($multiple) {
                var id = $(this).data('id'),
                    ids = $input_file.val().split(',');

                if (id) {
                    for (var i = 0; i < ids.length; i++) {
                        if (ids[i] == id) {
                            ids.splice(i, 1);
                            break;
                        }
                    }
                    $input_file.val(ids.join(','));
                }
            } else {
                $input_file.val('');
            }

            $(this).closest('.file-item').remove();
        });

        // 查看大图
		
        $(this).magnificPopup({
            delegate: 'a.img-link',
            type: 'image',
            gallery: {
                enabled: true
            }
        });
		
        //排序
		/*
        var el = document.getElementById('file_list_' + $input_file_name);
        new Sortable(el);
        //常用
        new Sortable(el, {
            handle: ".my-handle", // 拖拽区域，默认为 items 的 子元素

            onStart: function (evt) { // 拖拽开始
                var itemEl = evt.item;// 当前拖拽的html元素
            },

            onEnd: function (evt) { // 拖拽结束
                var itemEl = evt.item;
				
            }
        });
		*/
		Sortable.create(document.getElementById('file_list_' + $input_file_name), {             
            animation : 350, //动画参数            
            onEnd : function(evt) {//拖拽完毕之后发生该事件                    									
				var b = $('#'+file_lists).map(function() {
					return $(this).data('id');
				}).get().join(',');			
				$("#"+input_file_names).val(b);									
                }
            });
		
        // 将上传实例存起来
        //webuploader.push(uploader);
    });