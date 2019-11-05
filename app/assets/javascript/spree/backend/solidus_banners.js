$(document).on('ready', function(){
  if ($('#link_type').length) {
    $('#link_type').on('change',function(e){
      $('#banner_link_field, #banner_product_id_field').hide();
      $('#banner_'+this.value+'_field').show();
    }).trigger('change')

    var ajx = false
    var token = $('input[name=authenticity_token]').val();
    $('#product_ac').on('keyup', function (e) {
      $('#banner_product_id').val('');
      $('#banner_link').val('');

      q = this.value;
      action = this.form.action;
      if (ajx) {
        ajx.abort()
        ajx = false
      }
      if (q.length > 2) {
        ajx = $.getJSON("/admin/banners/search_products?q="+q, '', function (products) {
          ajx = false

          $res = $('.products_autocomplete_results');
          if (products.length) {
            $res.html('');
            for (idx in products) {
              product = products[idx];
              $product = $('<div />').addClass('product col-3');
              $p_title = $('<h3 />').text(product.name);
              $p_image = $('<img />').attr('src', product.image_url);
              $p_add = $('<a>').text('Seleccionar').addClass('button')
              $p_add.attr('data-id', product.id).attr('data-name', product.name);
              $p_add.on('click', function(e){
                e.preventDefault();
                $('#banner_product_id').val(this.dataset.id);
                $('#product_ac').val(this.dataset.name);
                $res.html('');
              });
              $product.append($p_title);
              $product.append($p_image);
              $product.append($p_add);
              $res.append($product);
            }
          } else {
            $res.html('<h2>No se encontraron productos</h2>');
          }
        })
      }
    })
    $('#banner_link').on('keyup',function(e){
      $('#banner_product_id').val('');
      $('#product_ac').val('');
    })
  }

  if ($('#crop_image').length) {
    bannerImageAspectRatio = document.getElementById('crop_image').dataset.aspectRatio;
    cropBannerModal = document.getElementById('crop_banner_modal');
    $('#crop_image').on('click', function(e){
      e.preventDefault();
      cropper = document.getElementById('cropper');

      input = document.getElementById('banner_image');
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
          cropper.src = e.target.result;
          initCrop();
        }
        reader.readAsDataURL(input.files[0]);
      } else if (cropper.src != '') {
        cropper.setAttribute('src', cropper.src);
        initCrop();
      }
      cropBannerModal.classList.add('shown');
    })

    cropBannerModal.querySelector('.accept.button').addEventListener('click', function(e) {
      e.preventDefault();
      closeCropModal();
    })

    cropBannerModal.querySelector('.cancel.button').addEventListener('click', function(e) {
      e.preventDefault();
      clearCrop();
      closeCropModal();
    })

    document.getElementById('banner_image').addEventListener('change', function(e) {
      clearCrop();
    })
  }
})


function setCropprValues(value) {
  document.getElementById('banner_image_crop_x').value = value.x;
  document.getElementById('banner_image_crop_y').value = value.y;
  document.getElementById('banner_image_crop_w').value = value.width;
  document.getElementById('banner_image_crop_h').value = value.height;
}

function clearCrop() {
  setCropprValues({x: '', y: '', width: '', height: ''});
}

function closeCropModal() {
  cropBannerModal.querySelector('.croppr-container').remove();
  img = document.createElement('IMG');
  img.id = 'cropper';
  img.title = 'image to crop';
  if (aux = document.getElementById('current_image_url')) {
    img.src = aux.value;
  }
  cropBannerModal.querySelector('.content').insertBefore(img, cropBannerModal.querySelector('.buttons'));
  cropBannerModal.classList.remove('shown');
}

function initCrop() {
  aspect = bannerImageAspectRatio == '' ? 5/16 : parseFloat(bannerImageAspectRatio);
  var cropperObject = new Croppr('#cropper', {
    onCropEnd: setCropprValues,
    startSize: [100,100,'%'],
    aspectRatio: aspect
  });
}
