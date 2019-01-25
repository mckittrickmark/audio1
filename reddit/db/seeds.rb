# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#def open_asset(file_name)
#  File.open(Rails.root.join('db', 'seed_assets', file_name))
#end
#
#
#unless Rails.env.development?
#  puts "Development seeds only (for now)!"
#  exit 0
#end

subreddit1 = Subreddit.create!({name: "askreddit",
})

subreddit2 = Subreddit.create!({
  name: "asoiaf"
})

timeperiod1 = TimePeriod.create!({
  period_start: "2019-01-01 00:00:00 +0500",
  period_end: "2019-01-01 23:59:00 +0500"
})

subreddit1.topics.create!({
  time_period_id: 1,
  sentiment: 100,
  frequency: 12,
  name: "spaghetti",
})