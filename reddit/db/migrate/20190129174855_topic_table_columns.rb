class TopicTableColumns < ActiveRecord::Migration[5.2]
  def change
    add_column :topics, :post_id, :string
    add_column :topics, :comment_id, :string
    add_column :topics, :weight, :integer
  end
end
