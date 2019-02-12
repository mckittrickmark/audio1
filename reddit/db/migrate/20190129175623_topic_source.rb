class TopicSource < ActiveRecord::Migration[5.2]
  def change
    add_column :topics, :topic_source, :string
  end
end
