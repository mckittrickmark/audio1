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

subreddit1 = Subreddit.create!({name: "gifs",
})

subreddit2 = Subreddit.create!({
  name: "asoiaf"
})

timeperiod1 = TimePeriod.create!({
  date: "2019-01-01",

})

comment1 = Comment.create!({
  subreddit_id: 1,
  time_period_id: 1,
  number_comments: 1

})

comment2 = Comment.create!({
  subreddit_id: 2,
  time_period_id: 1,
  number_comments: 1

})

subreddit1.topics.create!({
  time_period_id: 1,
  sentiment: 75,
  frequency: 10,
  name: "football",
  weight: 500,
  topic_source: nil,
  post_id: "59txr0",
  post_url: "how_to_make_your_dogs_day",
  comment_id: "d9bd4h1"
})

subreddit1.topics.create!({
  time_period_id: 1,
  sentiment: 15,
  frequency: 10,
  name: "tom brady",
  weight: 1000,
  topic_source: 1,
  post_id: "59txr0",
  post_url: "how_to_make_your_dogs_day",
  comment_id: "d9bd4h1"
})

subreddit1.topics.create!({
  time_period_id: 1,
  sentiment: 25,
  frequency: 12,
  name: "patriots",
  weight: 100,
  topic_source: 2,
  post_id: "59txr0",
  post_url: "how_to_make_your_dogs_day",
  comment_id: "d9bd4h1"
})

subreddit1.topics.create!({
  time_period_id: 1,
  sentiment: 15,
  frequency: 12,
  name: "cheat",
  weight: 100,
  topic_source: 2,
  post_id: "59txr0",
  post_url: "how_to_make_your_dogs_day",
  comment_id: "d9bd4h1"
})

subreddit1.topics.create!({
  time_period_id: 1,
  sentiment: 80,
  frequency: 12,
  name: "Gisele",
  weight: 100,
  topic_source: 2,
  post_id: "59txr0",
  post_url: "how_to_make_your_dogs_day",
  comment_id: "d9bd4h1"
})

subreddit1.topics.create!({
  time_period_id: 1,
  sentiment: 80,
  frequency: 12,
  name: "Gisele",
  weight: 50,
  topic_source: 2,
  post_id: "59txr0",
  post_url: "how_to_make_your_dogs_day",
  comment_id: "d9bd4h1"
})


