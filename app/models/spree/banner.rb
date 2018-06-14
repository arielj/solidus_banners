class Spree::Banner < ActiveRecord::Base
  validates :title, :link, :summary, presence: true

  has_attached_file :image, styles: { resized: "900x320", thumb: '421x100' }
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/
end
