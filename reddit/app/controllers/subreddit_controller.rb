class SubredditController < ApplicationController

  def index

    subreddits_all = Subreddit.joins('JOIN topics ON subreddits.id = topics.subreddit_id')
      .select('subreddits.name, subreddits.id, SUM(topics.weight) as weight')
      .group('subreddits.name, subreddits.id')
      .order('weight DESC')
      .limit(5)

    subreddit_objects = []

    subreddits_all.each do |sub|
      sub_topics = find_topics(sub)

      topics_plotted = topics_to_xy_plot(sub_topics)

      subreddit_obj = {subreddit: sub,
                      topics_plotted: topics_plotted
      }

      subreddit_objects.push(subreddit_obj)

    end

    subreddit_for_json = {subreddit_objects: subreddit_objects}

    respond_to do |format|
      format.json { render json: subreddit_for_json.to_json}
    end

  end

  def show

    subreddit_name =  params['name']


    subreddit = Subreddit.find_by(name: subreddit_name)



    sub_topics = find_topics(subreddit)

    topics_plotted = topics_to_xy_plot(sub_topics)

    subreddit_obj = {subreddit: subreddit,
                     topics_plotted: topics_plotted
    }

    respond_to do |format|
      format.json { render json: subreddit_obj.to_json}
    end

  end

  def find_topics(subreddit_object)

    sub_topics = Subreddit.joins('JOIN topics ON subreddits.id = topics.subreddit_id')
      .select('topics.name as topic_name, SUM(topics.weight) as weight, topics.topic_master_id as topic_id')
      .where("topics.subreddit_id = #{subreddit_object.id}")
      .group('topic_name, topic_id')
      .order('weight DESC')

    return sub_topics
  end

  def topics_to_xy_plot(topic_array)

    topics_plotted = []

    topic_array.each do |topic|

      topic_instance = {
        x: topic.topic_name,
        y: topic.weight
      }
      topics_plotted.push(topic_instance)

    end

    return topics_plotted

  end

end
