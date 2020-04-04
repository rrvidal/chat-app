import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Chats = new Mongo.Collection('chats');

if (Meteor.isServer) {
    Meteor.publish('chats', function chatsPublication() {
        return Chats.find({});
    });
}

Meteor.methods({
    'chats.insert'(text) {
      check(text, String);
   
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }
   
      Chats.insert({
        name: text,
        messages: [
          {name:'System',text:'Welcome'}
        ]
      });
    },
    'chats.remove'(chatId) {
      check(chatId, String);
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      Chats.remove(chatId);
    },
    'chats.pushMessage'(chatId, text) {

      check(chatId, String);
      check(text, String);
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      Chats.update(chatId, 
        { $push: { messages:  {
                name:Meteor.users.findOne(this.userId).username,
                text} 
            } 
        });
    },
  });