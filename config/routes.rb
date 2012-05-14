Tasskr5::Application.routes.draw do
  root :to => "folders#index"
  get "folders/chartCompleted" => "folders#chartCompleted"
  get "logout" => "sessions#destroy", :as => "logout"
  get "signin" => "sessions#new", :as => "signin"
  get "signup" => "users#new", :as => "signup"
  get "settings" => "users#edit", :as => "settings"
  resources :users
  resources :sessions
  resources :password_resets

  resources :folders
  resources :tasks

  get "admin" => "admin#index", :as => "admin"
end
