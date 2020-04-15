class AddMobileImageToBanners < ActiveRecord::Migration[5.1]
  def change
    add_attachment :spree_banners, :mobile_image
  end
end
