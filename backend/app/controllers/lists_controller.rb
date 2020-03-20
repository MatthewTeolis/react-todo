class ListsController < ApplicationController
  before_action :authorize_request
  before_action :set_list, only: [:show, :update, :destroy]

  # GET /lists
  def index
    @lists = List.all

    render json: @lists
  end

  # GET /lists/1
  def show
    render json: @list
  end

  # POST /lists
  def create
    @list = List.new(list_params)

    if @list.save
      render json: @list, status: :created, location: @list
    else
      render json: @list.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /lists/1
  def update
    if @list.update(list_params)
      render json: @list
    else
      render json: @list.errors, status: :unprocessable_entity
    end
  end

  # DELETE /lists/1
  def destroy
    @list.destroy
  end

  private

    def set_list
      @list = List.find(params[:id])
    end

    def list_params
      params.fetch(:list, {}).permit(:category_id, :title, :data)
    end
end
