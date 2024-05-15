const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js');
const methodOverride = require('method-override');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

main().then(()=>{console.log('connection successful')})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.get('/chats',async (req,res)=>{
    let chats = await Chat.find();
    res.render('chats.ejs',{chats});
});

app.get('/chats/new',(req,res)=>{
    res.render('chatForm.ejs');
});

app.post('/chats',(req,res)=>{
    let {from,to,msg}= req.body;
    let chat = new Chat({
        from : from,
        to : to ,
        msg : msg,
        created_at : new Date()
    });
    console.log(chat);
    chat.save().then(()=>{
        res.redirect('/chats');
    }).catch(err=>{console.log(err);});
});

app.get('/chats/:id/edit',async(req,res)=>{
    let id = req.params.id;
    let chat = await Chat.findById(id);
    res.render('edit.ejs',{chat});
});

app.put('/chats/:id',async (req,res)=>{
    let id = req.params.id;
    let {msg: newMsg}= req.body;
    let chat = await Chat.findByIdAndUpdate(id , {msg:newMsg}, {runValidators:true , new :true});
    chat.save().then(()=>{
        //console.log('message edited');
        res.redirect('/chats');
    }).catch(err=>{console.log(err);});
});

app.delete('/chats/:id',(req,res)=>{
    let id = req.params.id;
    Chat.findByIdAndDelete(id).then(()=>{
        //console.log('deleted');
        res.redirect('/chats');
    }).catch(err=>{console.log(err);});
});

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.listen(8080, ()=>{
    console.log('Server is running on port 8080');
});