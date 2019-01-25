class CreateTopics < ActiveRecord::Migration[5.2]
  def change
    create_table :topics do |t|
        t.integer :subreddit_id
        t.integer :time_period_id
        t.integer :sentiment
        t.string :name
        t.integer :frequency
      t.timestamps
    end
  end
end
