class CreateBanners < ActiveRecord::Migration[5.1]
  def change
    create_table :spree_banners do |t|
      t.string :title
      t.string :link
      t.text :summary
      t.attachment :image

      t.timestamps
    end
  end
end
