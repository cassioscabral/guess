if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault('counter', 0);

    Template.hello.helpers({
        counter: function () {
            return Session.get('counter');
        }

    });

    Template.main.helpers({
        data: function () {
            return {
                image_url: "http://www.charolaisbanner.com/trin/2013/TRI-N%20cattlemans%20classic/nmf%20148z.jpg",
                right_answer: "1290",
                answer_unit: "lbs",
                max: "2000",
                min: "100"
            };
        }

    });

    Template.main.events({
        'submit .new-guess': function (event) {
            event.preventDefault();

          // Get value from form element
            var text = event.target.guess.value;
            alert(text);
        //   // Insert a task into the collection
        //   Tasks.insert({
        //     text: text,
        //     createdAt: new Date() // current time
        //   });
          //
        //   // Clear form
        //   event.target.text.value = "";
        }
    });


    Template.hello.events({
        'click button': function () {
            // increment the counter when button is clicked
            Session.set('counter', Session.get('counter') + 1);
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
