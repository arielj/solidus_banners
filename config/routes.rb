Spree::Core::Engine.routes.draw do
  namespace :admin do
    resources :banners do
      collection do
        get :search_products
      end
    end
  end
end
