class SubredditController < ApplicationController

  def index

    data = Subreddit.all()

    respond_to do |format|
      format.json { render json: data.to_json}
    end

  end

end
