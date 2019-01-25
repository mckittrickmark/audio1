class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.integer :number_comments
      t.integer :subreddit_id
      t.integer :time_period_id
      t.timestamps
    end

    add_foreign_key :comments, :time_periods, column: :time_period_id, primary_key: :id
    add_foreign_key :comments, :subreddits, column: :subreddit_id, primary_key: :id


  end
end
