class PostUrlName < ActiveRecord::Migration[5.2]
  def change
    add_column :topics, :post_url , :string
  end
end
