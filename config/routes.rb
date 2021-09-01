Spree::Core::Engine.routes.draw do
  namespace :admin do
    resources :banners do
      collection do
        get :search_products
        post :update_positions
      end
    end
  end
end
