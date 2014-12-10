if (Meteor.isClient) {
    // Create an anonymous user
    Meteor.loginVisitor();
    Meteor.subscribe('allUsers');

    Template.scoreButton.events({
        'click button': function () {
            'use strict';
            // Increment player score
            Meteor.call('incrementScore');
        }
    });

    Template.allUsers.helpers({
        users: function () {
            'use strict';
            // Get a list of all users, sorted in reverse-order by score
            return Meteor.users.find(
                {},
                { sort: { 'profile.score': -1 } }
            ).fetch();
        }
    });
    Template.userName.events({
        'keyup #name': function (event) {
            'use strict';
            // Set the current username in the database
            var username = event.target.value;
            Meteor.call('changeUserName', username);
        }
    });
    Template.userName.helpers({
        username: function () {
            'use strict';
            // Return the current username into the template
            return Meteor.users.find(Meteor.userId()).fetch()[0].username;
        }
    });
}

if (Meteor.isServer) {
    //Meteor.loginVisitor(); // If enabled, will periodically clear user database
    Meteor.publish('allUsers', function () {
        'use strict';
        // publish a list of all users
        return Meteor.users.find();
    });

//    Meteor.startup(function () {
//        // code to run on server at startup
//    });

    Meteor.methods({
        // Increment the score by one
        incrementScore: function () {
            'use strict';
            Meteor.users.update(
                { _id: Meteor.userId() },
                { $inc: { 'profile.score': 1 } }
            );
        },
        changeUserName: function (username) {
            'use strict';
            // Change the username of the current user
            Meteor.users.update(
                { _id: Meteor.userId() },
                { $set: { 'username': username } }
            );
        }
    });
}
