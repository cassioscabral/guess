if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.question.helpers({
    question1: function () {
        Session.set('question1',Questions.findOne());
        return Session.get('question1');
    },
    average: function(){
        question1 = Session.get('question1');
        return (question1.sum / question1.userLength) || 0;
    },
    voted: function(){
        question1 = Session.get('question1');
        return question1.guesses[Meteor.userId()];
    },
    weight: function(){
        question1 = Session.get('question1');
        return question1.answer;
    },
    type: function(){
        question1 = Session.get('question1');
        return question1.type;
    }
  });
  Template.question.events({
    'click button': function () {
        var guess = parseInt( $('#guessValue').val() );
        var id = $('#guessId').val();
        Meteor.call("addGuess",id,Meteor.userId(),guess);
        Session.set('question1',Questions.findOne());
    }
  });
}


Meteor.methods({
  addGuess(questionId,userId,guess){
    if (! userId) {
        throw new Meteor.Error("not-authorized");
    }
    question = Questions.findOne(questionId);
    if (! question) {
        throw new Meteor.Error("wrong id or not-authorized");
    }
    var setModifier = {};
    guessValue = guess;
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
