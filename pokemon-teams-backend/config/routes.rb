Rails.application.routes.draw do
  resources :pokemons, only: [:index, :show]
  resources :trainers, only: [:index, :show]
end
