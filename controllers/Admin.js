module.exports = (app, passport, ...rest) => {
    app.route('/admin')
        .get((req, res) => {
            console.log('Admin Panel!')
        })
}