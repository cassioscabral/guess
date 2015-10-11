if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.question.helpers({
    question1: function () {
        skipper = (Session.get('skipper') || 0 );
        Session.set('question1',Questions.findOne({},{skip: skipper}));
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
    'click #guess': function () {
        var guess = parseInt( $('#guessValue').val() );
        var id = $('#guessId').val();
        Meteor.call("addGuess",id,Meteor.userId(),guess);
        skipper = (Session.get('skipper') || 0 );
        Session.set('question1',Questions.findOne({},{skip: skipper}));
    },
    'click #next': function () {
        skipper = (Session.get('skipper') || 0 )+1;
        max = Questions.find().count() -1;
        if (skipper > max){
            skipper = max;
        }
        Session.set('question1',Questions.findOne({},{skip: skipper}));
        Session.set('skipper',skipper);
    },
    'click #previous': function () {
        skipper = (Session.get('skipper') || 0 )-1;
        if (skipper < 0){
            skipper = 0;
        }
        Session.set('question1',Questions.findOne({},{skip: skipper}));
        Session.set('skipper',skipper);
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

