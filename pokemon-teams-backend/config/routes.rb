Rails.application.routes.draw do
  resources :pokemons, only: [:new, :create, :index, :show]
  resources :trainers, only: [:index, :show]
end
