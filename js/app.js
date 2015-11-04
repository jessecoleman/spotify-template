var data;
var myApp = angular.module('myApp', ['spotify']);

var myCtrl = myApp.controller('myCtrl', function($scope, $http, Spotify) {
    //initialize parse
    Parse.initialize('K92M0Xnysfub72aYyHT8bsiFaYBYDtfna97NrMkW', '1G3zUReCcA8NoPsp4WIMRFxxOEUgOiJDOuWtune6');

	Spotify.getAlbumTracks('6akEvsycLGftJxYudPjmqK').then(function (data) {
		$scope.tracks = data.items;
		console.log(data);
	});

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
