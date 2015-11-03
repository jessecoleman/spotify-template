/*
	Cole Chamberlin
    11/2/15
    INFO 343
    Spotify Challenge

    This file contains all the logic for login.html
 */
(function() {
    $(document).ready(function() {
        $('#signup').hide();
        //initialize parse
        Parse.initialize('K92M0Xnysfub72aYyHT8bsiFaYBYDtfna97NrMkW', '1G3zUReCcA8NoPsp4WIMRFxxOEUgOiJDOuWtune6');

        var logout = window.location.search.substring(1);
        if(logout) {
            Parse.User.logOut();
        }

        $('#sign-up').click(function() {
            $('#signup').show();
            $('#login').hide();
            $('#signup-text').hide();
        });

        $('#login-button').click(function() {
            var username = $('#username').val();
            var password = $('#password').val();

            Parse.User.logIn(username, password, {
                success: function() {
                    window.location.replace('index.html');
                },
                error: function() {
                    alert(error.code + ' ' + error.message);
                }
            })
        });

        $('#signup-button').click(function() {
            var username = $('#new-username').val();
            var password = $('#new-password').val();
            var passwordConfirm = $('#new-password-confirm').val();

            if(password === passwordConfirm) {
                var user = new Parse.User();
                user.set('username', username);
                user.set('password', password);

                user.signUp(null, {
                    success: function() {
                        window.location.replace('index.html');
                    },
                    error: function(user, error) {
                        alert(error.code + ' ' + error.message);
                    }
                });
            } else {
                alert('Passwords don\'t match');
            }
        });
    });
})();