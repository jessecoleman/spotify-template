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

	// add artist to favorited artists
	$scope.addArtist = function(artist) {
		console.log($scope.userFavedArtists);
		//if($scope.userFavedArtists.$indexFor(artist) != -1) {
			$scope.userFavedArtists.$add(artist);
		/*
		} else {
			$scope.userFavedArtists.$remove(artist.id);
		}
		$scope.userFavedArtists.$save();
		*/
	};

	// get parameter from url to use for artist
	$scope.findArtists = function(artist) {
		window.location.replace('index.html?artist=' + artist.id);
	};

	// check if artist is faved (not working)
	$scope.faved = function(artist) {
		//console.log($scope.userFavedArtists.$indexFor(artist.id));
		return $scope.userFavedArtists.$indexFor(artist.id) != -1;
	};

	// logout
	$scope.logOut = function() {
		window.location.replace("login.html")
	}
});
