class AuthenticationController < ApplicationController

  def register
    unless validate_register_model
      render json: { error: "invalid params" }, status: :bad_request
      return
    end

    @user = User.new(register_params)

    if @user.save
      render json: { status: 201, message: "successfully created user", token: JwtHelper.encode(user_id: @user.id) }, status: :created
    else
      render json: { error: "failed to create user." }, status: :internal_server_error
    end
  end

  def login
    unless validate_login_model
      render json: { error: "invalid params" }, status: :bad_request
      return
    end

    @user = User.find_by_email(login_params[:email])

    if @user&.authenticate(login_params[:password])
      token = JwtHelper.encode(user_id: @user.id)
      render json: { status: 200, message: nil, token: token }, status: :ok
    else
      render json: { status: 401, message: "unauthorized", token: nil }, status: :unauthorized
    end
  end

  private

  def validate_register_model
    !(params[:email].blank? or params[:firstName].blank? or params[:lastName].blank? or params[:password].blank?)
  end

  def register_params
    params.permit(:email, :firstName, :lastName, :password)
  end

  def validate_login_model
    !(params[:email].blank? or params[:password].blank?)
  end

  def login_params
    params.permit(:email, :password)
  end
end
