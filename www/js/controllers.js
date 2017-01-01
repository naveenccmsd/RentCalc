angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$rootScope) {


    $scope.members=[];
    $scope.HistoryList=[];
    $scope.checkedIds=[];
    $scope.apps = {};
    $scope.HistId=1;
   // localStorage.setItem('HistoryList', JSON.stringify($scope.HistoryList));
   // localStorage.setItem('members', JSON.stringify($scope.members));
   // console.log(localStorage.getItem('HistoryList'));
   // console.log(localStorage.getItem('members'));
    if(localStorage.getItem('HistoryList')!=null)
    {
      $scope.HistoryList = JSON.parse(localStorage.getItem('HistoryList'));
    }
    // $scope.currentMember=null;
 if(localStorage.getItem('members')==null)
    {
    $scope.members.push({
      id : 1,
      name : "Naveen",
      amount :0,
      isSelected : 0,
      face : "https://lh3.googleusercontent.com/-iIkn0iFDHVM/AAAAAAAAAAI/AAAAAAAAAAA/AKTaeK8jG5OfKDRmJbSAJoSANBV0hzC9bQ/s96-c-mo/photo.jpg"
    });
    $scope.members.push({
      id : 2,
      name : "Dinesh",
      amount :0,
      isSelected : 0,
      face : "https://lh3.googleusercontent.com/-2C7VOC6NTuA/AAAAAAAAAAI/AAAAAAAAHsc/GrMBXhw96OU/s180-c-k-no/photo.jpg"
    });
    $scope.members.push({
      id :3,
      name : "Praveen",
      amount : 0 ,
      isSelected :0,
      face : "https://lh3.googleusercontent.com/-xyfKX4mgwlE/AAAAAAAAAAI/AAAAAAAAAAA/kwUs7v8YsKg/s180-c-k-no/photo.jpg"
    });
    localStorage.setItem('members', JSON.stringify($scope.members));
    // localStorage.setItem('fist',"done");
  }
    console.log(localStorage.getItem('members'));
    $scope.members = JSON.parse(localStorage.getItem('members'));
    $rootScope.members=$scope.members;
    $scope.addAmount=function()
    {
      console.log("Add Amount called" + $scope.apps.newAmount);
      console.log("Amount spend " + $scope.apps.currentMember);
      var temp="";var sourceName="";
      var count=0;
      angular.forEach($scope.members, function(member) {  
        if($scope.apps.currentMember==member.id)
        {
          sourceName=member.name;
        }
        if(member.isSelected==1)
        { 
          count++;
         temp+=member.name+",";
        }
      });

      var splitAmout=$scope.apps.newAmount/count;
      angular.forEach($scope.members, function(member) {  
        if($scope.apps.currentMember==member.id)
        {
          member.amount=(member.amount+$scope.apps.newAmount);
        }
        if(member.isSelected==1)
        {
          member.amount=member.amount-splitAmout;
        }
      });
      if(temp=="")
      {
        console.log(temp);
        temp="None";
      }
      var keys = Object.keys($scope.HistoryList);
      var len = keys.length;
      $scope.HistoryList.push({
      HistId : len++,
      sourceName : sourceName,
      amount : $scope.apps.newAmount,
      members : temp,
      isSelected : 0
    });
      
      localStorage.setItem('HistoryList', JSON.stringify($scope.HistoryList));
      localStorage.setItem('members', JSON.stringify($scope.members));
      console.log(localStorage.getItem('members'));
      $scope.apps.newAmount='';
      document.getElementById("focus").focus();
    }
    $scope.stateChanged = function (qId) {
        console.log(qId);
        angular.forEach($scope.members, function(member) {
        if(member.id==qId)
        {
          if($scope.checkedIds[qId]){ //If it is checked
               member.isSelected=1;
           }
           else
           {
              member.isSelected = 0;
           }
        }
      });
    }
})

.controller('ChatsCtrl', function($scope,$rootScope,Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.members=$rootScope.members;

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {

  $scope.toggleChange = function() {
  localStorage.removeItem("members");
  localStorage.removeItem("HistoryList");
  console.log("cleared");
  }
  
  $scope.settings = {
    enableFriends: true
  };
});
