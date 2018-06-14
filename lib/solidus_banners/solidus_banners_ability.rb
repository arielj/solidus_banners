class SolidusBannersAbility
  include CanCan::Ability

  def initialize(user)
    can :read, Spree::Banner
    can :index, Spree::Banner
  end
end
