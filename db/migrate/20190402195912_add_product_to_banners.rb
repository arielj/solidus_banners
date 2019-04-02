class AddProductToBanners < ActiveRecord::Migration[5.1]
  def change
    add_reference :spree_banners, :product
  end
end
