angular.module('chat',[]);

angular.module('chat').controller('homecontroller',function($scope){
    $scope.username = '';

    $scope.login = function(){
        var socket = io.connect('http://localhost:8080');
        socket.emit("adduser", $scope.username, function(available){                    
            $scope.available = available;
            $scope.$apply();
        });
    };
});