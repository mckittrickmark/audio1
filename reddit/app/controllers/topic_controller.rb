class TopicController < ApplicationController

  def create
    #subreddit = Subreddit.find_or_create_by(:)

  end




  def test
    data = {field1: "test1", field2: "test2"}

    respond_to do |format|
      format.json { render json: data.to_json}
    end

  end

end
