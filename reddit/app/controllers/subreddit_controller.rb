class SubredditController < ApplicationController

  def index

    #time_period_id = TimePeriod.find_by(period_start: "2019-01-25 00:00:00 0500")


    comments = Comment.where(time_period_id: 2)

    data = []

    puts comments

    comments.each do |value|

      number_comments = value['number_comments']

      subreddit_id = value['subreddit_id']

      subreddit = Subreddit.find_by(id: subreddit_id)

      sub_name = subreddit['name']

      commentObj = {name: sub_name,
                    number_comments: number_comments}

      data.push(commentObj)

    end

    puts data


    respond_to do |format|
      format.json { render json: data.to_json}
    end

  end

end
