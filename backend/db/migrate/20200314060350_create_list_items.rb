class CreateListItems < ActiveRecord::Migration[5.1]
  def change
    create_table :list_items do |t|
      t.bigint :list_id
      t.string :text

      t.timestamps
    end

    add_foreign_key :list_items, :lists
  end
end
