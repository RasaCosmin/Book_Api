const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

const User = require('../../models/User');

//@route POST /api/users/register
//@desc Register user
//@access public
router.post('/register', (req, res) => {
	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			res.status(400).json({ error: 'This email is already registered' });
		} else {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json({ message: 'success' }))
						.catch(err => console.log(err));
				});
			});
		}
	});
});

//@route POST /api/users/login
//@desc Login user
//@access public
router.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email: email }).then(user => {
		if (!user) {
			res.status(404).json({
				error: 'No user registered with this email'
			});
		} else {
			bcrypt.compare(password, user.password).then(isMatch => {
				if (isMatch) {
					const payload = {
						id: user.id,
						name: user.name
					};

					jwt.sign(
						payload,
						keys.secret,
						{ expiresIn: 3600 },
						(err, token) => {
							if (err) {
								res.status(404).json({
									error: err
								});
							} else {
								res.json({
									success: true,
									token: 'Bearer ' + token
								});
							}
						}
					);
				} else {
					res.status(400).json({ error: 'Password incorrect' });
				}
			});
		}
	});
});

module.exports = router;
