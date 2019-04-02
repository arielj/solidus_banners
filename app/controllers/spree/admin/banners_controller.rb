class Spree::Admin::BannersController < Spree::Admin::ResourceController
  def search_products
    products = Spree::Product.in_name_or_description(params[:q]).limit(8)
    render json: products.map{|p| {slug: p.slug, name: p.name, image_url: p.display_image.attachment.url, id: p.id}}.to_json
  end
end
