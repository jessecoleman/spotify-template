var myApp = angular.module('myApp', ['spotify', 'firebase']);

var myCtrl = myApp.controller('myCtrl', function($scope, $http, $firebaseAuth, $firebaseObject, $firebaseArray,  Spotify) {
    //initialize firebase
    var ref = new Firebase("https://showfinder.firebaseio.com");
    var usersRef = ref.child('users');

    $scope.users = $firebaseObject(usersRef);
    $scope.authObj = $firebaseAuth(ref);

    //initialize auth, get user
    var authData = $scope.authObj.$getAuth();
    if (authData) {
        $scope.userId = authData.uid;
    }

	Spotify.getAlbumTracks('6akEvsycLGftJxYudPjmqK').then(function (data) {
		$scope.tracks = data.items;
	});

});