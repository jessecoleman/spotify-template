var setup = angular.module('setup', ['spotify']);

var setupCtrl = setup.controller('setupCtrl', function($scope, $http, Spotify) {
	//initialize parse
	Parse.initialize('K92M0Xnysfub72aYyHT8bsiFaYBYDtfna97NrMkW', '1G3zUReCcA8NoPsp4WIMRFxxOEUgOiJDOuWtune6');

	$scope.searchArtists = function() {
		Spotify.search($scope.artist, 'artist').then(function (data) {
			$scope.artists = data.artists.items;
			console.log($scope.artists);
		});
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
