angular.module('chatroom').controller('mainCtrl', function($scope, messageService){

  //The getMessages function will call the getMessages method on the messageService object.
  //You'll then save the result of that request to your controller's $scope as messages ($scope.messages)
  let messArc = [];

  $scope.getMessages1 = function () {
    messageService.getMessages().then(function (result) {
      $scope.messages = result.data
      messArc = result.data;
    })
  };
  
  $scope.getMessages = function () {
    messageService.getMessages().then(function (result) {
      for (var i = 0; i < result.data.length; i++) {
        var time = (result.data[i].createdAt.split('T').pop().split('.').shift().split(':'));
        time[0] -= 6;
        result.data[i].createdAt = time.join(':');
      }
      $scope.messages = result.data;
      console.log(result.data);
      messArc = messageService.saveMessages(messArc, result.data);
    })
  };



  //The postMessage function will take whatever the user typed in (hint: look at the html and see what ng-model correlates to on the input box),
  //pass that text to the postMessage method on the messageService object which will
  //then post it to the backend.
  $scope.postMessage = function () {
    messageService.postMessage($scope.message).then(function (result) {
    
    })
  }


  //uncomment this code when your getMessages function is finished
  //This goes and gets new data every second, which mimicking a chat room experience.
  $scope.getMessages1();

   setInterval(function(){
    $scope.getMessages();
    console.log(messArc);

  }, 1500)

})
