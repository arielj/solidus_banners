class Spree::Banner < ActiveRecord::Base
  belongs_to :product, optional: true

  validates :title, :summary, presence: true

  validate :has_linked_content

  has_attached_file :image, styles: (BANNER_IMAGE_STYLES[:image] rescue {})
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/
  crop_attached_file :image

  has_attached_file :mobile_image, styles: (BANNER_IMAGE_STYLES[:mobile_image] rescue {})
  validates_attachment_content_type :mobile_image, content_type: /\Aimage\/.*\z/
  crop_attached_file :mobile_image

  def link=(value)
    if value.present? and self[:link] != value
      self[:link] = value
      self[:product_id] = nil
    end
  end

  def product_id=(value)
    if value.present? and self[:product_id] != value
      self[:product_id] = value
      self[:link] = ''
    end
  end

  def content_link
    product ? "products/#{product.slug}" : link
  end

private
  def has_linked_content
    if product.nil? and link.blank?
      errors.add(:link, 'Se debe ingresar un link o un producto')
      errors.add(:product_id, 'Se debe ingresar un producto o un link')
    end
  end
end
