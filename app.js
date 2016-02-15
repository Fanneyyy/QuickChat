// var host = location.origin.replace(/^http/, 'ws')
// var ws = new WebSocket(host);
// ws.onmessage = function (event) {
//     var li = document.createElement('li');
//     //li.innerHTML = JSON.parse(event.data);
//     li.innerHTML = "Hi Svavar :*"
//     document.querySelector('#pings').appendChild(li);
// };

angular.module('quickchat',[]);

angular.module('quickchat').controller('homecontroller',function($scope){
    $scope.username = '';

    $scope.login = function(){
        var socket = io.connect('//fanneyyy-quickchat.herokuapp.com');
        socket.emit("adduser", $scope.username, function(available){                    
            $scope.available = available;
            $scope.$apply();
        });
    };
});