angular.module('chat',[]);

angular.module('chat').controller('homecontroller',function($scope){
    $scope.username = '';

    $scope.login = function(){
        var socket = io.connect('https://blooming-reaches-41821.herokuapp.com/');
        socket.emit("adduser", $scope.username, function(available){                    
            $scope.available = available;
            $scope.$apply();
        });
    };
});