//- Server
var express     =   require('express'),
    chalk       =   require('chalk'),
    hbs         =   require('express-handlebars').create({defaultLayout: 'main', extname: '.hbs', partialsDir: 'views/layouts/partials'}),
    extend      =   require('handlebars-extend-block'),
    mongoose    =   require('mongoose'),
    passport    =   require('passport'),
    flash       =   require('connect-flash'),
    bodyParser  =   require('body-parser'),
    getSettings =   require('./middleware/settings')

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
app.use(require('express-session')({
    secret: 'Dorsal Fin Fire Extinguisher',
    resave: false,
    saveUninitialized: false
}))
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