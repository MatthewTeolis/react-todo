class CreateLists < ActiveRecord::Migration[5.1]
  def change
    create_table :lists do |t|
      t.bigint :category_id, null: false
      t.string :title, null: false

      t.timestamps
    end

    add_foreign_key :lists, :categories
  end
end
