class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
        render json: TrainerSerializer.new(trainers)
      end

    def show
        trainer = Trainer.find(params[:id])
        options = {
            include: [:pokemons]
          }
          if trainer
            render json: TrainerSerializer.new(trainer, options)
          else
            render json: { message: 'Trainer not found' }
          end
    end


end
