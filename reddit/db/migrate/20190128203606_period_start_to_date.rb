class PeriodStartToDate < ActiveRecord::Migration[5.2]
  def change
    remove_column :time_periods, :period_start
    remove_column :time_periods, :period_start
    add_column :time_periods, :date, :date

  end
end
