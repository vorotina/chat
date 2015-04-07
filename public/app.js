(function(angular) {
    'use strict';
    angular.module('ChatApp', [])
        .service('MessageStorage', [function() {
            var messages = [];
            return {
                messages: messages,
                send: function(nickname, message) {
                    messages.push({
                        nickname: nickname,
                        message: message
                    })
                }
            };
        }])
        .directive('myChatUser', [ 'MessageStorage',
            function(MessageStorage) {
                return {
                    scope: {
                        nickname: '@'
                    },
                    template: [
                        '<div class="bs-component"><div class="jumbotron"><div class="navbar-form navbar-middle">',
                        '<h1 ng-bind="nickname"></h1>',
                        '<textarea ng-model="message" class="form-control" placeholder="Write a message"></textarea>',
                        '<input type="button" value="Send" ng-click="send()" class="btn btn-default"/>',
                        '</div></div></div>'
                    ].join(''),
                    controller: function ($scope) {
                        $scope.message = '';
                        $scope.send = function(){
                            MessageStorage.send($scope.nickname, $scope.message);
                        };
                    }
                };
            }])
        .directive('myChatMessages', [ 'MessageStorage',
            function(MessageStorage) {
                return {
                    template: '<ul><li ng-repeat="m in messages">{{m.nickname}}: {{m.message}}</li></ul>',
                    controller: function ($scope) {
                        $scope.messages = MessageStorage.messages;
                    }
                };
            }]);


})(window.angular);