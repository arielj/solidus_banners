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

  document.querySelectorAll('#crop_image, #crop_mobile_image').forEach( crp => {
    let parent = crp.parentElement
    let cropBannerModal = parent.querySelector('.crop_banner_modal');
    let input = parent.querySelector('input[type=file]');

    crp.addEventListener('click', function(e){
      e.preventDefault();
      let cropper = cropBannerModal.querySelector('img');

      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function(e) {
          cropper.src = e.target.result;
          initCrop(parent);
        }
        reader.readAsDataURL(input.files[0]);
      } else if (cropper.src != '') {
        cropper.setAttribute('src', cropper.src);
        initCrop(parent);
      }
      cropBannerModal.classList.add('shown');
    })

    cropBannerModal.querySelector('.accept.button').addEventListener('click', function(e) {
      e.preventDefault();
      closeCropModal(parent);
    })

    cropBannerModal.querySelector('.cancel.button').addEventListener('click', function(e) {
      e.preventDefault();
      clearCrop(parent);
      closeCropModal(parent);
    })

    input.addEventListener('change', function(e) {
      clearCrop(parent);
    })
  })
})


function setCropprValues(value, parent) {
  parent.querySelector('.crop_x').value = value.x;
  parent.querySelector('.crop_y').value = value.y;
  parent.querySelector('.crop_w').value = value.width;
  parent.querySelector('.crop_h').value = value.height;
}

function clearCrop(parent) {
  setCropprValues({x: '', y: '', width: '', height: ''}, parent);
}

function closeCropModal(parent) {
  let cropBannerModal = parent.querySelector('.crop_banner_modal')
  cropBannerModal.querySelector('.croppr-container').remove();
  img = document.createElement('IMG');
  img.id = 'cropper';
  img.title = 'image to crop';
  if (aux = parent.querySelector('.image_preview input[type=hidden]')) {
    img.src = aux.value;
  }
  cropBannerModal.querySelector('.content').insertBefore(img, cropBannerModal.querySelector('.buttons'));
  cropBannerModal.classList.remove('shown');
}

function initCrop(parent, ) {
  let onCropEnd = function(values) {
    setCropprValues(values, parent)
  }

  let bannerImageAspectRatio = parent.querySelector('input[type=file]').dataset.aspectRatio;
  let aspect = bannerImageAspectRatio == '' ? 5/16 : parseFloat(bannerImageAspectRatio);
  new Croppr(parent.querySelector('.crop_banner_modal img'), {
    onCropEnd: onCropEnd,
    startSize: [100,100,'%'],
    aspectRatio: aspect
  });
}
