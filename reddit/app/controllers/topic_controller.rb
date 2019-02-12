class TopicController < ApplicationController

  def create
    #subreddit = Subreddit.find_or_create_by(:)

  end

  def index


    topics_all = Topic.where(time_period_id: 1)


    respond_to do |format|
      format.json { render json: topics_all.to_json}
    end

  end

  def show
    #this has to be switched to searching by name you idiot
    topic_name =  params['name']


    topic_name.gsub! '_', ' '

    topic_info = Topic.where(name: topic_name).limit(1)

    puts params


    #this will have to be interative once there is more than one entry for each topic

    topic_sources = []

    begin

      topic_info.each do |value|

        topic_instance = Topic.find_by(id: value.topic_source)

        puts topic_instance.id
        puts "topic_instance.id =--------------------->"

        topic_weight_pair = {topic_pair_source: topic_instance.name, weight: value.weight, topic_id: topic_instance.id}

        topic_sources.push(topic_weight_pair)
      end

    rescue

      topic_sources = []

    end

    topic_sinks = Topic.where(topic_source: topic_info[0].id)

    nodes = []
    links = []

    nodes.push({"name": topic_info[0].name})

    topic_sources.each do |source|
      nodes.push({"name": source[:topic_pair_source]})
      links.push({"source": nodes.length - 1 , "target": 0, "value": source[:weight]})
    end

    topic_sinks.each do |sinks|
      nodes.push({name: sinks[:name]})
      links.push({"source": 0 , "target": nodes.length - 1, "value": sinks[:weight]})
    end


    topic_show_data = {
        topic_sources: topic_sources,
        topic_info: topic_info[0],
        topic_sinks: topic_sinks,
        nodes: nodes,
        links:links
    }


    respond_to do |format|
      format.json { render json: topic_show_data.to_json}
    end

  end

  def test
    data = {field1: "test1", field2: "test2"}

    respond_to do |format|
      format.json { render json: data.to_json}
    end

  end

end
