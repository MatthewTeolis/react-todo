class CreateCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :categories do |t|
      t.bigint :user_id, null: false
      t.string :name, null: false

      t.timestamps
    end

    add_foreign_key :categories, :users
    add_index :categories, [:user_id, :name], unique: true
  end
end
