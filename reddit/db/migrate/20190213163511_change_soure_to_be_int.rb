class ChangeSoureToBeInt < ActiveRecord::Migration[5.2]
  def change
    change_column :topics, :topic_source, 'integer USING CAST(topic_source AS integer)'
  end
end
