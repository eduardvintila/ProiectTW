let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let crypto = require('crypto');
let requestIp = require('request-ip');
let app = express();
let port = 3000;
let hostname = '0.0.0.0';

const fs = require('fs');

let rawdata = fs.readFileSync('data/database.json');
let rawdata2 = fs.readFileSync('data/mesaje.json');
let rawdata3 = fs.readFileSync('data/logs.json')
let users = JSON.parse(rawdata);
let mesaje = JSON.parse(rawdata2);
let logs = JSON.parse(rawdata3);
var ultim_ip
var ultima_data

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, access-control-allow-origin")
    next();
  });

app.use(session({
    secret: 'test',
    resave: true,
    saveUninitialized: false
    }
));

app.use(requestIp.mw());

app.set('view engine', 'ejs');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('assets'));

app.get('/', (req, res) => {
    res.render('home.ejs', { root: __dirname, user:req.session.user, nr_vizite:logs.nr_vizite, adresa_ip:ultim_ip, ultima_vizita:ultima_data});;
})

app.get('/whatis', (req, res) => {
    res.render('whatis.ejs', { root: __dirname, user:req.session.user});
})

app.get('/why', (req, res) => {
    res.render('why.ejs', { root: __dirname, user:req.session.user});
})

app.get('/ubuntu', (req, res) => {
    res.render('ubuntu.ejs', { root: __dirname, user:req.session.user});
})

app.get('/arch', (req, res) => {
    res.render('arch.ejs', { root: __dirname, user:req.session.user});
})

app.get('/contact', (req, res) => {
    res.render('contact.ejs', { root: __dirname, user:req.session.user});
})

app.get('/mesaje', (req, res) => {
    if (req.session.user == "admin")
    {
        res.render('mesaje.ejs', { root: __dirname, user:req.session.user, informatii: mesaje})
    }
})

app.post('/contact', (req, res) => {
    mesaje.push(req.body)
    let data = JSON.stringify(mesaje);
    fs.writeFileSync('data/mesaje.json', data);
    res.redirect('/');
})

app.get('/login', (req, res) => {
    res.render('login.ejs', { root: __dirname, user:req.session.user});
})

app.post('/login', (req, res) => {
    
    let cifru = crypto.createCipher('aes-128-cbc', 'testsalt');

    let encrParola = cifru.update(req.body.parola, 'utf8', 'hex');
    encrParola += cifru.final('hex');
    
    if (req.body.user == "admin" && encrParola == users[0].parola)
    {
        req.session.user = "admin";
        let data_curenta = new Date();
        ultim_ip = logs.adresa_ip;
        ultima_data = logs.ultima_vizita;
        logs.ultima_vizita = data_curenta;
        logs.adresa_ip = req.clientIp; 
        let nr = parseInt(logs.nr_vizite);
        if (isNaN(nr))
            nr = 0;
        nr += 1;
        logs.nr_vizite = nr.toString();
        fs.writeFileSync('data/logs.json', JSON.stringify(logs));
        res.redirect('/');
    }
    else
    {
        res.send("Date de autentificare incorecte!")
    }
})

app.post('/stergemesaj', (req, res) => {
    mesaje.splice(req.body.poz, 1);
    let data = JSON.stringify(mesaje);
    fs.writeFileSync('data/mesaje.json', data);
    res.send({redirect: '/mesaje'});
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

app.use((req, res) => {
    res.status(404).render('404.ejs', { root: __dirname, user:req.session.user});
})

app.listen(port, hostname, () => {
    console.log(`Express.JS Server is running on http://localhost:${port}`);
})