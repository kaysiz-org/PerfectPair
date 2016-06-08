# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  email           :string           not null
#  birth_date      :date             not null
#  country         :string           not null
#  zip_code        :integer          not null
#  password_digest :string           not null
#  session_token   :string           not null
#  location        :string           not null
#  gender          :string           not null
#  orientation     :string           not null
#

class User < ActiveRecord::Base
  attr_reader :password

  validates :username, :email, :birth_date,
            :country, :zip_code, :password_digest,
            :session_token, :location, :gender,
            :orientation,
            presence: true

  validates :username, :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token

  has_many(
    :people_this_user_liked,
    class_name: "Like",
    foreign_key: :liker_id,
    primary_key: :id
  )

  has_many(
    :people_who_liked_this_user,
    class_name: "Like",
    foreign_key: :likee_id,
    primary_key: :id
  )

  has_many(
    :likees,
    through: :people_this_user_liked,
    source: :likee
  )

  has_many(
    :likers,
    through: :people_who_liked_this_user,
    source: :liker
  )

  has_many(
    :photos,
    class_name: "UserPhoto",
    foreign_key: :user_id,
    primary_key: :id,
    dependent: :destroy
  )

  has_one(
    :about,
    class_name: "UserAbout",
    foreign_key: :user_id,
    primary_key: :id,
    dependent: :destroy
  )


  has_many(
    :answers,
    class_name: 'Answer',
    foreign_key: :user_id,
    primary_key: :id
  )

  def to_param
    username
  end

  def mutual_likes
    likers = self.likers
    likees = self.likees

    result = []

    likers.each do |liker|
      likees.each do |likee|
        if liker == likee
          result.push(liker)
        end
      end
    end

    result
  end

  # photo relevant methods

  def undefault_other_photos(photo_id)
    self.photos.each do |photo|
      unless photo.id == photo_id
        photo.set_is_default_to_false
      end
    end
  end

  def default_photo_url
    def_photo_url = ''

    if self.photos.length > 0
      self.photos.each do |photo|
        if photo.is_default
          def_photo_url = photo.photo_url
        end
      end
    end

    def_photo_url
  end



  # session relevant methods

  def self.find_by_credentials(name_field, password, type)
    if type == 'username'
      user = User.find_by(username: name_field)
    elsif type == 'email'
      user = User.find_by(email: name_field)
    end

    return nil if user.nil?

    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
  end
end
