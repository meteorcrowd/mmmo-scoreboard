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

  // add template method to set user name 
  //Meteor.
}
