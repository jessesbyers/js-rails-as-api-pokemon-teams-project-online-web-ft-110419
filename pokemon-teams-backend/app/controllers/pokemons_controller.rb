class PokemonsController < ApplicationController

    def new
        pokemon = Pokemon.new
    end

    def create
        pokemon = Pokemon.new(pokemon_params)
        pokemon.nickname = Faker::Name.first_name
        pokemon.species = Faker::Games::Pokemon.name
        pokemon.save
    end

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

    def destroy
        pokemon.destroy 
    end

    private

    def pokemon_params 
        params.require(:pokemon).permit(:trainer_id)
    end
end
