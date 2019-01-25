Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post 'topics' => 'topic#create'


  get 'subreddits' => 'subreddit#index'

  post 'comments/bulk' => 'comments#upload'

  get '/' => 'topic#test'



end
