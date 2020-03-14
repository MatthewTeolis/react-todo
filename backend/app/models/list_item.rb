class ListItem < ApplicationRecord
  validates :text, presence: true
end
