var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _current_user = {};
var _currentUserHasBeenFetched = false;
var SessionStore = new Store(AppDispatcher);
var SessionConstants = require('../constants/sessionConstants');

SessionStore.currentUserHasBeenFetched = function () {
  return _currentUserHasBeenFetched;
};

SessionStore.isUserLoggedIn = function () {
  return !!_current_user.username;
};

SessionStore.currentUser = function () {
  return _current_user;
};

SessionStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SessionConstants.LOG_OUT:
      _currentUserHasBeenFetched = false;
      _current_user = {};
      this.__emitChange();
      break;
    case SessionConstants.LOG_IN:
      _currentUserHasBeenFetched = true;
      _current_user = payload.currentUser;
      this.__emitChange();
      break;
    case SessionConstants.ADD_USER_TO_LIKES:
      _current_user.likees.push(payload.otherUser);
      _current_user.mutualLikes.push(payload.otherUser);
      this.__emitChange();
      break;
    case SessionConstants.REMOVE_USER_FROM_LIKES:
      var removalIndex = _current_user.likees.indexOf(payload.otherUser);
      var mutualRemovalIndex = _current_user.mutualLikes.indexOf(payload.otherUser);
      _current_user.likees.splice(removalIndex, 1);
      _current_user.mutualLikes.splice(mutualRemovalIndex, 1);
      this.__emitChange();
      break;
    case SessionConstants.ADD_NEW_ANSWER_TO_USER:
      debugger;
      _current_user.answers.push(payload.answer);
      this.__emitChange();
      break;
    case SessionConstants.ALL_ANSWERS:
      _current_user.answers = payload.answers;
      this.__emitChange();
      break;
  }
};

module.exports = SessionStore;
