class Spree::Admin::BannersController < Spree::Admin::ResourceController
  def search_products
    products = Spree::Product.in_name_or_description(params[:q]).limit(8)
    json = products.map do |p|
      {
        slug: p.slug,
        name: p.name,
        image_url: p.display_image.attachment.url,
        id: p.id
      }
    end.to_json

    render json: json
  end
end
