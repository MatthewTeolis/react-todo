class CategoriesController < ApplicationController
  before_action :authorize_request
  before_action :set_category, only: [:show, :update, :destroy]

  # GET /categories
  def index
    @categories = Category.includes(:lists).where(user_id: @current_user&.id)
    render json: @categories, :include => :lists
  end

  # GET /categories/:id
  def show
    if @category.nil?
      render json: {status: 404, message: "not found"}, status: :not_found
    else
      render json: @category, status: :ok
    end
  end

  # POST /categories
  def create
    @category = Category.new(user_id: @current_user&.id, name: category_params[:name])

    if @category.save
      render json: @category, status: :created, location: @category
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /categories/:id
  def update
    if @category.nil?
      render json: {status: 404, message: "not found"}, status: :not_found
      return
    end

    if @category.update(category_params)
      render json: @category, status: :ok
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  # DELETE /categories/:id
  def destroy
    if @category.nil?
      render json: {status: 404, message: "not found"}, status: :not_found
    else
      @category.destroy
      render json: @category, status: :ok
    end
  end

  private

    def set_category
      @category = Category.find_by user_id: @current_user&.id, id: params[:id]
    end

    def category_params
      params.fetch(:category, {}).permit(:name)
    end
end
