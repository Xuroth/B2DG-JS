//- Server
var express     =   require('express'),
    chalk       =   require('chalk'),
    hbs         =   require('express-handlebars').create({defaultLayout: 'main', extname: '.hbs', partialsDir: 'views/layouts/partials'}),
    extend      =   require('handlebars-extend-block'),
    mongoose    =   require('mongoose'),
    passport    =   require('passport'),
    flash       =   require('connect-flash'),
    bodyParser  =   require('body-parser'),
    getSettings =   require('./middleware/settings'),
    session     =   require('express-session'),
    MongoStore    =   require('connect-mongodb-session')(session);

const Security = require('./libs/Security');
// Initilize App Configuration
var app = express();
const config = require('dotenv').config({path: __dirname + '/conf/.env'});
// verify config was correctly loaded.
if (config.error){
    throw config.error
}
hbs.handlebars = extend(hbs.handlebars)

app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')

hbs.getPartials()
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
// app.use(require('express-session')({
//     secret: 'Dorsal Fin Fire Extinguisher',
//     resave: false,
//     saveUninitialized: false
// }))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./conf/passport')(passport);

//Database Connection
let dbURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
mongoose.connect(dbURI, {useNewUrlParser: true}, (err, res) => {
    if(err){
        console.error(chalk.bgRed.bold(`Database Error\n[${err.name}] : ${err.message}`))
    } else {
        console.log(chalk.green.bold('Database connection established.'));
    }
})
//Setup Session Storage
const store = new MongoStore({
    uri: dbURI,
    collection: 'sessions'
})
app.use(session({
    secret: 'Dorsal Fin Fire Extinguisher',
    resave: false,
    saveUninitialized: true,
    store: store,
    unset: 'destroy',
    name: `${process.env.COOKIE_NAME}_${Security.generateID()}`,
    genid: (req) => Security.generateID()
}))
app.get('/sessCheck', (req, res) => {
    if(!req.session.test) {
        req.session.test = 'OK'; //Create new property in session
        res.send('Session!')
    }
});
// app.post('/testSecure', (req, res) => {
//     
//     let token = req.body.nonce;
//     console.log(token)
//     if(Security.isValidNonce(token, req)) {
//         res.send('valid')
//     } else {
//         res.send('invalid')
//     }
// })

// define middleware to add nonce to all views
app.use( (req, res, next) => {
    res.locals.nonce = Security.md5(req.sessionID + req.headers['user-agent'])
    //Setup Cart (if not initialized)
    if(!req.session.cart){
        //Generic cart structure. Will need to match Model.
        req.session.cart = {
            items: [],
            totals: 0.00,
            formattedTotals: ''
        }
    }
    res.locals.cart = req.session.cart;
    res.locals.cartJSON = JSON.stringify(req.session.cart);
    next();
})
//Get Site Settings from db.
app.use(getSettings)
app.use( (req, res, next) => {
    if(req.user){
        res.locals.user = req.user;
    }

    next()
})
// Router
require('./controllers')(app, passport);

// Server Loop
app.listen( process.env.PORT, () => {
    console.log(chalk.green.bold(`\n\n[B2DG]\nServer is starting...`))
    console.log(chalk.blue.bold(`Visit: `),chalk.bgBlue.bold(` localhost:${process.env.PORT}/ `),chalk.blue.bold(` to access site.`))
    console.log(chalk.red.bold(`CTRL+C to terminate server.\n`))
})