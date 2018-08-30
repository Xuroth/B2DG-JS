//- Server
var express     =   require('express'),
    chalk       =   require('chalk')

// Initilize App Configuration
var app = express();
// Load config file
const config = require('dotenv').config({path: __dirname + '/conf/.env'});
// verify config was correctly loaded.
if (config.error){
    throw config.error
}

app.listen( process.env.PORT, () => {
    console.log(chalk.green.bold(`\n\n[B2DG]\nServer is starting...`))
    console.log(chalk.blue.bold(`Visit: `),chalk.bgBlue.bold(` localhost:${process.env.PORT}/ `),chalk.blue.bold(` to access site.`))
    console.log(chalk.red.bold(`CTRL+C to terminate server.\n`))
})