Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  post '/authentication/register', to: 'authentication#register'
  post '/authentication/login', to: 'authentication#login'

  resources :categories, only: [:index, :show, :create, :update, :destroy]
end
