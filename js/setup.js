var setupApp = angular.module('setupApp', ['spotify', 'firebase']);

var setupCtrl = setupApp.controller('setupCtrl', function($scope, $http, $firebaseAuth, $firebaseObject, $firebaseArray,  Spotify) {
	//initialize firebase
	var ref = new Firebase("https://showfinder.firebaseio.com");
	var users = ref.child('Users');

	$scope.users = $firebaseObject(users);
	$scope.authObj = $firebaseAuth(ref);

	//initialize auth, get user
	var authData = $scope.authObj.$getAuth();
	if (authData) {
		$scope.userId = authData.uid;
	}

	$('.collapsible').collapsible();

	$scope.searchArtists = function() {
		Spotify.search($scope.artist, 'artist').then(function (data) {
			$scope.artists = data.artists.items;
		});
	};

	$scope.addArtist = function(artist) {
		console.log(artist);
		// add artist id to user's faved artist list
		$scope.users[authData.uid].favedArtists.add(artist.id);
	};

	/*
	 $scope.audioObject = {};
	 $scope.getSongs = function() {
	 $http.get(baseUrl + $scope.track).success(function(response){
	 data = $scope.tracks = response.tracks.items

	 });
	 };
	 $scope.play = function(song) {
	 if($scope.currentSong == song) {
	 $scope.audioObject.pause();
	 $scope.currentSong = false;
	 return;
	 }
	 else {
	 if($scope.audioObject.pause != undefined) $scope.audioObject.pause();
	 $scope.audioObject = new Audio(song);
	 $scope.audioObject.play();
	 $scope.currentSong = song;
	 }
	 }*/
});

// Add tool tips to anything with a title property
$('body').tooltip({
	selector: '[title]'
});
