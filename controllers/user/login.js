const bcrypt = require('bcryptjs')
const User = require('../../database/models/User')

module.exports = (req, res) => {
    const {
        email,
        password
    } = req.body;
    // try to find the user

    User.findOne({
        email
    }, (error, user) => {
        if (user) {
            // compare passwords.
            bcrypt.compare(password, user.password, (error, same) => {

                if (same) {
                    req.session.userId = user._id
                    res.redirect('/admin')
                } else {
                    res.redirect('/login')

                }
            })
        } else {
          console.log(error)
            res.redirect('/login')
        }
    })
}
