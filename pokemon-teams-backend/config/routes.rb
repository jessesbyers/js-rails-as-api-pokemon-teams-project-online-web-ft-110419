Rails.application.routes.draw do
  resources :pokemons, only: [:new, :create, :index, :show, :destroy]
  resources :trainers, only: [:index, :show]
end
