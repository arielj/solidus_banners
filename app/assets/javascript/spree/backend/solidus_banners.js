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
        ajx = $.getJSON(action+"/search_products?q="+q, '', function (products) {
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
})
