var setupApp = angular.module('setupApp', ['spotify', 'firebase']);

setupApp.controller('setupCtrl', function($scope, $http, $firebaseAuth, $firebaseObject, $firebaseArray,  Spotify) {
	//initialize firebase
	var ref = new Firebase("https://showfinder.firebaseio.com");
	var usersRef = ref.child('users');

	//make users firebaseObject and firebaseAuth available to scope
	$scope.users = $firebaseObject(usersRef);
	$scope.authObj = $firebaseAuth(ref);

	//initialize auth, fetch user
	var authData = $scope.authObj.$getAuth();
	if (authData) {
		var userRef = usersRef.child(authData.uid);
		$scope.user = $firebaseObject(userRef);
		var favedArtistsRef = userRef.child('favedArtists');
		$scope.userFavedArtists = $firebaseArray(favedArtistsRef);
	}

	$('.collapsible').collapsible({accordian: true});

	$scope.searchArtists = function() {
		Spotify.search($scope.artist, 'artist').then(function (data) {
			$scope.artists = data.artists.items;
		});
	};

	$scope.addArtist = function(artist) {
		$scope.userFavedArtists.$add(artist.id);
		$scope.userFavedArtists.$save();
	};

	$scope.faved = function(artist) {
		//console.log($scope.userFavedArtists.$indexFor(artist.id));
		return $scope.userFavedArtists.$indexFor(artist.id) != -1;
	};

	$scope.logOut = function() {
		window.location.replace("login.html")
	}
});
