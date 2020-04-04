import { Meteor } from 'meteor/meteor';
import { Chats } from '/imports/api/chats';

function insertChat({ title, url }) {
  Chats.insert({title,  createdAt: new Date()});
}

Meteor.startup(() => {
  // If the chats collection is empty, add some data.
  if (Chats.find().count() === 0) {
    insertChat({
      name: 'Home Chat',
      messages: [
        {name:'System',text:'Welcome'}
      ]
    });
  }
});
