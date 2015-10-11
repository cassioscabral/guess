if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
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


Meteor.methods({
  addGuess(questionId,userId,guess){
    question = Questions.findOne(questionId);
    var setModifier = {};
    guessValue = guesses;
    if (question.guesses[userId]){
        guessValue = guessValue - question.guesses[userId];
    }else{
        setModifier['$inc'] = setModifier['$inc']|| {};
        setModifier['$inc']['userLength'] = 1;
    }
    setModifier['$set'] = setModifier['$set'] || {};
    setModifier['$set']['guesses.'+userId] = guess;
    setModifier['$inc'] = setModifier['$inc'] || {};
    setModifier['$inc']['sum'] = guessValue;
    Questions.update(questionId, setModifier);
  }
});
