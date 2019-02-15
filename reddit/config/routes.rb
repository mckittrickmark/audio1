Rails.application.routes.draw do
  # For details on the DSL available within thi =>s file, see http://guides.rubyonrails.org/routing.html
  post 'topics' => 'topic#create'


  get 'subreddits' => 'subreddit#index'

  get 'subreddits/:name' => 'subreddit#show'

  post 'comments/bulk' => 'comments#upload'

  get 'topics' => 'topic#index'

  get 'topics/:name' => 'topic#show'


  get '/' => 'topic#test'



end
