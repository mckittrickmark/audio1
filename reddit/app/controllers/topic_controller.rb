class TopicController < ApplicationController

  def create
    #subreddit = Subreddit.find_or_create_by(:)

  end

  def index

    topics_all = TopicMaster.joins('JOIN topics ON topics.topic_master_id = topic_masters.id')
      .select('topic_masters.name, topic_masters.id, SUM(topics.weight) as weight')
      .where('topics.time_period_id = 1')
      .group('topics.topic_master_id, topic_masters.id')
      .order('weight DESC')
      .limit(5)

    sankey_objects = []

    topics_all.each do |topic|

      sankey_instance = topic_sankey_create(topic)

      sankey_objects.push(sankey_instance)

    end

    sankey_list = {sankey_objects: sankey_objects}

    respond_to do |format|
      format.json { render json: sankey_list.to_json}
    end

  end

  def show

    topic_name =  params['name']
    topic_name.gsub! '_', ' '
    topic_master_show = TopicMaster.find_by name: topic_name

    topic_show_data = topic_sankey_create(topic_master_show)


    respond_to do |format|
      format.json { render json: topic_show_data.to_json}
    end

  end


  def find_sources(topic_object)

    topic_sources = TopicMaster.joins('INNER JOIN topics ON topics.topic_master_id = topic_masters.id')
    .joins('INNER JOIN topics as source_duplicate ON topics.topic_source = source_duplicate.id')
    .select('source_duplicate.name as topic_pair_source, SUM(topics.weight) as weight, source_duplicate.topic_master_id as topic_id')
      .where("topics.topic_master_id = #{topic_object.id}")
      .group('topic_id, topic_pair_source')
      .order('weight DESC')

    return topic_sources

  end

  def find_sinks(topic_object)

    topic_sinks = TopicMaster.joins('INNER JOIN topics ON topics.topic_master_id = topic_masters.id')
    .joins('INNER JOIN topics as sink_duplicate ON topics.id = sink_duplicate.topic_source')
    .joins('INNER JOIN topic_masters as master_duplicate ON sink_duplicate.topic_master_id = master_duplicate.id')
    .select('sink_duplicate.name as topic_pair_sink, SUM(sink_duplicate.weight) as weight, sink_duplicate.topic_master_id as topic_id')
      .where("topics.topic_master_id = #{topic_object.id}")
      .group('topic_id, topic_pair_sink')
      .order('weight DESC')


      return topic_sinks

  end

  def find_occurences(topic_object)

    topic_occurences = Topic.where(topic_master_id: topic_object.id)

  end

  def topic_sankey_create(topic_object)

    topic_info = Topic.where(topic_master_id: topic_object.id).select('name, sum(weight) as weight').group('name')

    topic_occurences = find_occurences(topic_object)

    topic_sources = find_sources(topic_object)

    topic_sinks = find_sinks(topic_object)


    nodes = []
    links = []

    nodes.push({"name": topic_object.name})

    topic_sources.each do |source|
      nodes.push({"name": source[:topic_pair_source]})
      links.push({"source": nodes.length - 1 , "target": 0, "value": source[:weight]})
    end

    topic_sinks.each do |sink|
      nodes.push({name: sink[:topic_pair_sink]})
      links.push({"source": 0 , "target": nodes.length - 1, "value": sink[:weight]})
    end

    topic_sankey_data = {
        topic_sources: topic_sources,
        topic_occurences: topic_occurences,
        topic_info: topic_info,
        topic_sinks: topic_sinks,
        nodes: nodes,
        links:links
    }

    return topic_sankey_data

  end



  def test
    data = {field1: "test1", field2: "test2"}

    respond_to do |format|
      format.json { render json: data.to_json}
    end

  end

end
