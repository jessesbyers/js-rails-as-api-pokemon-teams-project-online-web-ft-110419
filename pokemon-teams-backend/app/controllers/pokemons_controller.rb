class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
      end

    def show
        pokemon = Pokemon.find(params[:id])
        if pokemon
            render json: PokemonSerializer.new(pokemon)
        else
            render json: { message: 'Pokemon not found' }
        end
    end
end
