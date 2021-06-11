const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
const app = express();
const dbURI = "mongodb+srv://ycw25:zx01819@cluster0.aoytg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

process.env.MONGODB_URI || mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(result => app.listen(port)).catch(err => console.log(err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(morgan('short'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/dream', function(req, res) {
    var myText = req.body.mytext;
    var myName = req.body.myname;
    const blog = new Blog({
        title: myName,
        content: myText
    });

    blog.save().then(result => {
        res.send('留言成功');
    }).catch(err => {
        console.log(err);
    });
});
app.post('/index', function(req, res) {
    var myText = req.body.mytext;
    var myName = req.body.myname;
    const blog = new Blog({
        title: myName,
        content: myText
    });

    blog.save().then(result => {
        res.send('留言成功');
    }).catch(err => {
        console.log(err);
    });
});

app.get('/', (req, res) => {
    res.redirect('index');
});

app.get('/index', (req, res) => {
    Blog.find().then(result => {
        res.render('index', { blogs: result, title: "Comments" });
    }).catch(err => {
        console.log(err);
    });
});
// app.get('/dream', (req, res) => {
//     Blog.find().then(result => {
//         res.render('dream', { blogs: result, title: "Comments" });
//     }).catch(err => {
//         console.log(err);
//     });
// });
app.use((req, res) => {
    res.status(404).render('404', { title: '找不到網頁' });
});