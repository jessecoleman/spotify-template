var setupApp = angular.module('setupApp', ['spotify', 'firebase']);

var setupCtrl = setupApp.controller('setupCtrl', function($scope, $http, $firebaseAuth, $firebaseObject, $firebaseArray,  Spotify) {
	//initialize firebase
	var ref = new Firebase("https://showfinder.firebaseio.com");
	var usersRef = ref.child('users');

	$scope.users = $firebaseObject(usersRef);
	$scope.authObj = $firebaseAuth(ref);

	//initialize auth, get user
	var authData = $scope.authObj.$getAuth();
	if (authData) {
		$scope.user = {
			'id': authData.uid,
			'favedArtists': []
		};
		console.log($scope.users['9ed80f37-c1c6-4330-9a8f-cd6308dc26b9']);
	}

	$('.collapsible').collapsible();

	$scope.searchArtists = function() {
		Spotify.search($scope.artist, 'artist').then(function (data) {
			$scope.artists = data.artists.items;
		});
	};

	$scope.addArtist = function(artist) {
		// add artist id to user's faved artist list
		if($scope.user.favedArtists.indexOf(artist.id) != -1) {
			$scope.user.favedArtists.push(artist.id);
		} else {
			//remove artist from user's faved artists
			$scope.user.favedArtists.splice($scope.user.favedArtists.indexOf(artist.id), 1);
		}
		$scope.users[authData.uid].favedArtists = $scope.user.favedArtists;
		$scope.users.$save();
	};

	$scope.faved = function(artist) {
		console.log($scope.users);
		return $scope.users[$scope.user.id].favedArtists.includes(artist.id);
	}
});
