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
			if (!books || books.length == 0) {
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
			.then(book => res.json(book))
			.catch(() => res.json({ error: 'Failed to add a new book' }));
	}
);

//@route PUT /api/books/:id
//@desc Update book
//@access private
router.put(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const bookFields = {};
		if (req.body.title) bookFields.title = req.body.title;
		if (req.body.author) bookFields.author = req.body.author;
		if (req.body.publisher) bookFields.publisher = req.body.publisher;

		Book.findById(req.params.id).then(book => {
			if (!book) {
				res.status(404).json({ error: 'No book with this id' });
			} else {
				Book.findOneAndUpdate(
					{ _id: req.params.id },
					{ $set: bookFields },
					{ new: true }
				).then(book => res.json(book));
			}
		});
	}
);

//@route DELETE /api/books/:id
//@desc DELETE book
//@access private
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Book.findOneAndRemove({ _id: req.params.id }).then(book => {
			res.send({ success: true });
		});
	}
);

module.exports = router;
