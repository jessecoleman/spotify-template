var myApp = angular.module('myApp', ['spotify', 'firebase']);

var myCtrl = myApp.controller('myCtrl', function($scope, $http, $firebaseAuth, $firebaseObject, $firebaseArray,  Spotify) {
    //initialize firebase
    var ref = new Firebase("https://showfinder.firebaseio.com");
    var usersRef = ref.child('users');

    //make users firebaseObject and firebaseAuth available to scope
    $scope.users = $firebaseObject(usersRef);
    $scope.authObj = $firebaseAuth(ref);

    //initialize auth, fetch user
    var authData = $scope.authObj.$getAuth();
    if (authData) {
        var user = usersRef.child(authData.uid);
        $scope.user = $firebaseObject(user);
    }

	$http({
        method: 'GET',
        url: 'http://api.bandsintown.com/artists/Skrillex/events.json?app_id=SHOW_FINDER_APP'
    }).then(function successCallBack(response) {
        console.log(response);
    }, function errorCallback(response) {

    });

    Spotify.getAlbumTracks('6akEvsycLGftJxYudPjmqK').then(function (data) {
		$scope.tracks = data.items;
	});

    $scope.logOut = function() {
        window.location.replace("login.html")
    }

});