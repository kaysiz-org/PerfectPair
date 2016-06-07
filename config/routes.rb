Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    # resource :user, only: [:create, :destroy, :update] do
    #   get :about
    # end
    # resources :users, only: [:index]


    resources :users, only: [:create, :destroy, :index, :update]
    resources :users, only: :show, param: :username

    resource :session, only: [:create, :show, :destroy]

    resources :likes, only: [:create]
    resources :likes, only: [:destroy], param: :likee_id 

    resources :user_photos, only: [:create, :index, :destroy]
    resources :user_photos, only: :show, param: :user_id
    resources :messages, only: [:create, :chat_history]

    resources :user_abouts, only: [:show, :update], param: :user_id
  end
end
