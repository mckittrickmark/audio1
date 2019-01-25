class ForeignKeys < ActiveRecord::Migration[5.2]
  def change
    add_foreign_key :topics, :subreddits, column: :subreddit_id, primary_key: :id
    add_foreign_key :topics, :time_periods, column: :time_period_id, primary_key: :id

  end
end
