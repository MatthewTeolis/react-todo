class Category < ApplicationRecord
  validates :name, presence: true, uniqueness: { scope: :user_id }
end
