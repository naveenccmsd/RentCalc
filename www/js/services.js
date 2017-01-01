angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})


.factory('localStorage', function ($q) {
    'use strict';

    var STORAGE_ID = 'todos-angularjs';

    var store = {
      todos: [],

      _getFromLocalStorage: function () {
        return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
      },

      _saveToLocalStorage: function (todos) {
        localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
      },

      clearCompleted: function () {
        var deferred = $q.defer();

        var incompleteTodos = store.todos.filter(function (todo) {
          return !todo.completed;
        });

        angular.copy(incompleteTodos, store.todos);

        store._saveToLocalStorage(store.todos);
        deferred.resolve(store.todos);

        return deferred.promise;
      },

      delete: function (todo) {
        var deferred = $q.defer();

        store.todos.splice(store.todos.indexOf(todo), 1);

        store._saveToLocalStorage(store.todos);
        deferred.resolve(store.todos);

        return deferred.promise;
      },

      get: function () {
        var deferred = $q.defer();

        angular.copy(store._getFromLocalStorage(), store.todos);
        deferred.resolve(store.todos);

        return deferred.promise;
      },

      insert: function (todo) {
        var deferred = $q.defer();

        store.todos.push(todo);

        store._saveToLocalStorage(store.todos);
        deferred.resolve(store.todos);

        return deferred.promise;
      },

      put: function (todo, index) {
        var deferred = $q.defer();

        store.todos[index] = todo;

        store._saveToLocalStorage(store.todos);
        deferred.resolve(store.todos);

        return deferred.promise;
      }
    };

    return store;
  });
