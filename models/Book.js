const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
	title: { type: String, required: true },
	author: { type: String, required: true },
	publisher: { type: String, required: true },
	date: { type: Date, default: Date.now }
});

module.exports = Book = mongoose.model('books', BookSchema);
