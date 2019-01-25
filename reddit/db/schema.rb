# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_01_25_200439) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.integer "number_comments"
    t.integer "subreddit_id"
    t.integer "time_period_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "subreddits", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "time_periods", force: :cascade do |t|
    t.datetime "period_start"
    t.datetime "period_end"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "topics", force: :cascade do |t|
    t.integer "subreddit_id"
    t.integer "time_period_id"
    t.integer "sentiment"
    t.string "name"
    t.integer "frequency"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "comments", "subreddits"
  add_foreign_key "comments", "time_periods"
  add_foreign_key "topics", "subreddits"
  add_foreign_key "topics", "time_periods"
end
