class Topic < ApplicationRecord
  belongs_to :subreddit, foreign_key: 'subreddit_id'
  belongs_to :time_period, foreign_key: 'time_period_id'
end
