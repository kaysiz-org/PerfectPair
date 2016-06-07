var SessionApiUtil = require('../util/sessionApiUtil');
var UserAuthApiUtil = require('../util/userAuthApiUtil');
var UsersApiUtil = require('../util/usersApiUtil');
var PhotosApiUtil = require('../util/photosApiUtil');
var MessageApiUtil = require('../util/messageApiUtil');

var ClientActions = {
  loginWithUsername: function (user, callback) {
    SessionApiUtil.loginWithUsername(user, callback);
  },

  loginWithEmail: function (user, callback) {
    SessionApiUtil.loginWithEmail(user, callback);
  },

  logout: function (callback) {
    SessionApiUtil.logout(callback);
  },

  lookUpZipCode: function (zipCode) {
    UserAuthApiUtil.getLocationByZip(zipCode);
  },

  incrementAuthState: function () {
    UserAuthApiUtil.incrementAuthState();
  },

  signup: function (user, callback) {
    UsersApiUtil.signup(user, callback);
  },

  fetchAllPossibleMatches: function () {
    UsersApiUtil.fetchAllPossibleMatches();
  },

  uploadImage: function (photo) {
    PhotosApiUtil.uploadImage(photo);
  },

  getCurrentUserPhotos: function () {
    PhotosApiUtil.getCurrentUserPhotos();
  },

  sendMessage: function () {
    MessageApiUtil.sendMessage();
  },

  fetchSingleUser: function (username) {
    UsersApiUtil.fetchSingleUser(username);
  },

  getOtherUserPics: function (userId) {
    PhotosApiUtil.getOtherUserPics(userId);
  },

  updateUser: function (user) {
    UsersApiUtil.updateUser(user);
  },

  getCurrentUserAbout: function (currentUser) {
    UsersApiUtil.getCurrentUserAbout(currentUser);
  },

  updateCurrentUserAbout: function (currentUser, aboutData) {
    UsersApiUtil.updateCurrentUserAbout(currentUser, aboutData);
  },

  likeUser: function (otherUser, callback) {
    UsersApiUtil.likeUser(otherUser, callback);
  },

  unlikeUser: function (otherUser, callback) {
    UsersApiUtil.unlikeUser(otherUser, callback);
  }
};

module.exports = ClientActions;
