const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

main().then(()=>{console.log('connection successful')})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

const allChats =[
    {
        from : 'neha',
        to : 'sneha',
        msg : 'hi',
        created_at : new Date()
    },
    {
        from : 'sneha',
        to : 'neha',
        msg : 'hello',
        created_at : new Date()
    },
    {
        from : 'neha',
        to : 'sneha',
        msg : 'how are you',
        created_at : new Date()
    }
];

Chat.insertMany(allChats);
