if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault("counter", 0);

    // Create an anonymous user
    Meteor.loginVisitor();

    Template.hello.helpers({
        counter: function () {
            return Session.get("counter");
        }
    });

    Template.hello.events({
        'click button': function () {
            // increment the counter when button is clicked
            //Session.set("counter", Session.get("counter") + 1);
            //var score = Session.get("counter");
            Meteor.call('incrementScore');
        }
    });

    Template.allUsers.helpers({
        users: function () {
            return Meteor.users.find(
                {},
                {sort: {'profile.score': -1 }}
            ).fetch();
        }
    });
    Template.userName.events({
        'keyup #name': function (event) {
            var username = event.target.value;
            Meteor.call('changeUserName', username);
        }
    });
    Template.userName.helpers({
        username: function () {
            var username = Meteor.call('getUserName');
            console.log('username is: ' + username);
        }
    });
}

if (Meteor.isServer) {
    //Meteor.loginVisitor();
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
            Meteor.users.update(
                { _id: Meteor.userId() },
                { $set: { 'username': username } }
            );
        },
        // retrieve the username
        getUserName: function () {
            var userId = Meteor.userId();
            console.log('user ID: ' + userId);
            var user = Meteor.users.find(userId).fetch();
            console.log('user: ' + user);
            var username = user[0].username;
            console.log("username: " + username);
            return username;
        }
    });
}
