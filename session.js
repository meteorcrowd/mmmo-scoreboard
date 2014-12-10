if (Meteor.isClient) {
    // Create an anonymous user
    Meteor.loginVisitor();
    Meteor.subscribe('allUsers');

    Template.scoreButton.events({
        'click button': function () {
            Meteor.call('incrementScore');
        }
    });

    Template.allUsers.helpers({
        users: function () {
            // Get a list of all users
            return Meteor.users.find(
                {},
                { sort: { 'profile.score': -1 } }
            ).fetch();
        }
    });
    Template.userName.events({
        'keyup #name': function (event) {
            // Set the current username in the database
            var username = event.target.value;
            Meteor.call('changeUserName', username);
        }
    });
    Template.userName.helpers({
        username: function () {
            // Return the current username into the template
            return Meteor.users.find(Meteor.userId()).fetch()[0].username;
        }
    });
}

if (Meteor.isServer) {
    //Meteor.loginVisitor();
    Meteor.publish('allUsers', function() {
        // publish a list of all users reverse-sorted by score
        return Meteor.users.find();
    });

    Meteor.startup(function () {
        // code to run on server at startup
    });

    Meteor.methods({
        // Increment the score by one
        incrementScore: function () {
            Meteor.users.update(
                { _id: Meteor.userId() },
                { $inc: { 'profile.score': 1 } }
            );
        },
        // Change username to a given value
        changeUserName: function (username) {
            // Change the username of the current user
            Meteor.users.update(
                { _id: Meteor.userId() },
                { $set: { 'username': username } }
            );
        },
        getUserName: function () {
            // Get the username of the current user
            var userId = Meteor.userId();
            var user = Meteor.users.find(userId).fetch();
            var username = user[0].username;
            return username;
        }
    });
}
