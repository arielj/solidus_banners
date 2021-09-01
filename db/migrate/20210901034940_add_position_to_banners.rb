class AddPositionToBanners < ActiveRecord::Migration[5.1]
  def change
    add_column :spree_banners, :position, :integer
  end
end
