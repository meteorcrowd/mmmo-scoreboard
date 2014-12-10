if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault("counter", 0);

    Meteor.loginVisitor();
    console.log(Meteor.userId());

    Template.hello.helpers({
        counter: function () {
            return Session.get("counter");
        }
    });

    Template.hello.events({
        'click button': function () {
            // increment the counter when button is clicked
            Session.set("counter", Session.get("counter") + 1);
            var score = Session.get("counter");
            Meteor.call('incrementScore', score);
        }
    });

    Template.allUsers.helpers({
        users: function () {
            return Meteor.users.find().fetch();
        }
    });
}

if (Meteor.isServer) {
    //Meteor.loginVisitor();
    //console.log(Meteor.userId());
    Meteor.startup(function () {
        // code to run on server at startup
    });

    // add method to set user name
    //Meteor.

    // method to set user score in db
    Meteor.methods({
        incrementScore: function (score) {
            console.log('Increment score: ' + Meteor.userId());
                  Meteor.users.update(
                      { _id: Meteor.userId() },
                      { $inc: { 'profile.score': 1 } }
                  );
//            Meteor.users.update(
//                { _id: Meteor.userId() },
//                { $set: { 'profile.score': score } }
//            );
        }
    });
}
