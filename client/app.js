angular.module('quickchat',[]);

angular.module('quickchat').controller('homecontroller',function($scope){
    $scope.username = '';

    $scope.login = function(){
        var socket = io.connect();
        socket.emit("adduser", $scope.username, function(available){                    
            $scope.available = available;
            $scope.$apply();
        });
    };
});