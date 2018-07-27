const express = require('express');
const router = express.Router();
const passport = require('passport');

const Book = require('../../models/Book');

//@route GET /api/books
//@desc Get all books
//@access private
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Book.find().then(books => {
			if (!books) {
				res.status(404).json({
					error: 'No book in db'
				});
			} else {
				res.json(books);
			}
		});
	}
);

//@route POST /api/books
//@desc Add new book
//@access private
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const newBook = new Book({
			title: req.body.title,
			author: req.body.author,
			publisher: req.body.publisher
		});

		newBook
			.save()
			.then(book => res.json({ message: 'success' }))
			.catch(err => res.jsson({ error: 'Failed to add a new book' }));
	}
);

module.exports = router;
