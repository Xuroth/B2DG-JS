//- Server
var express     =   require('express'),
    chalk       =   require('chalk'),
    hbs         =   require('express-handlebars').create({defaultLayout: 'main', extname: '.hbs', partialsDir: 'views/layouts/partials'}),
    extend      =   require('handlebars-extend-block')

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


// Router
require('./controllers')(app);

// Server Loop
app.listen( process.env.PORT, () => {
    console.log(chalk.green.bold(`\n\n[B2DG]\nServer is starting...`))
    console.log(chalk.blue.bold(`Visit: `),chalk.bgBlue.bold(` localhost:${process.env.PORT}/ `),chalk.blue.bold(` to access site.`))
    console.log(chalk.red.bold(`CTRL+C to terminate server.\n`))
})