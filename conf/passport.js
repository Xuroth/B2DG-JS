var LocalStrategy       =   require('passport-local').Strategy,
    User                =   require('../models/auth/user')

module.exports = (passport) => {
    passport.serializeUser( (user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser( (id, done) => {
        User.findById(id, (err, user) => {
            if(err) console.log(err);
            done(err, user);
        })
    })

    passport.use('local-register', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done) {
        process.nextTick( ()=> {
            User.findOne({'username': username}, (err, user) => {
                if(err) return done(err);
                if(user){
                    //Already a user with username
                    return done(null, false, req.flash('registerMessage', 'That username is already taken'))
                } else {
                    var newUser = new User();
                    newUser.username = username;
                    newUser.password = newUser.generateHash(password);

                    newUser.save( (err) => {
                        if(err) throw err;
                        return done(null, newUser, req.flash('registerSuccess', 'Thanks for registering.'))
                    })
                }
            })
        })
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done){
        User.findOne({'username': username}, (err, user) => {
            if(err) return done(err);
            if(!user) return done(null, false, req.flash('loginMessage','No user found'));
            if(!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Incorrect username/password'))
            return done(null, user)
        })
    }))
}