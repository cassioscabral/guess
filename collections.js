Questions = new Meteor.Collection('questions');
if(Meteor.isServer) {
    Questions.remove({});
    Questions.insert({
        _id:'one',
        title: 'Quess the weight of this animal',
        imageUrl: 'http://www.charolaisbanner.com/trin/2013/TRI-N%20cattlemans%20classic/nmf%20148z.jpg',
        answer: 1290,
        type: 'weight',
        sum: 0,
        userLength:0,
        guesses: {},
        min: 1,
        max: 10000
    });
}
