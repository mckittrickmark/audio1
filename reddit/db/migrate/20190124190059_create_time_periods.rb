class CreateTimePeriods < ActiveRecord::Migration[5.2]
  def change
    create_table :time_periods do |t|
        t.datetime :period_start
        t.datetime :period_end
      t.timestamps
    end
  end
end
