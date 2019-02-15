class CreateTopicMasters < ActiveRecord::Migration[5.2]
  def change
    create_table :topic_masters do |t|
        t.string :name
        t.timestamps
    end
    add_column :topics, :topic_master_id, :integer
    add_foreign_key :topics, :topic_masters, column: :topic_master_id, primary_key: :id
  end
end

