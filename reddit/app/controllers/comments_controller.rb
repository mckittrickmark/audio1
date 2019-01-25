class CommentsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def upload

    puts params

    params.each do |key, value|
      if key != "controller" || key != "action"
        subreddit = Subreddit.find_or_create_by!(name: key)

        date = TimePeriod.find_or_create_by!(period_start: "2019-01-25 00:00:00 -0500", period_end: "2019-01-25 23:59:00 -0500")

        comment_entry = Comment.create!(subreddit_id: subreddit['id'], time_period_id: date['id'], number_comments: value)

      end
    end

    data = "Hello WORLD!!!"

    respond_to do |format|
      format.json { render json: data.to_json}
    end

  end


end
