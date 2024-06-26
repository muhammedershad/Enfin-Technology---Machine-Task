const validateBook = require("../utils/validations");
const BooksModel = require("../models/books");

module.exports = {
    addBook: async (req, res, next) => {
        try {
            console.log(req.body)
            const { name, description, publishDate, price } = req.body;
            validateBook(name, description, publishDate, price);

            const book = new BooksModel({
                name,
                description,
                publishDate,
                price,
            });
            const addNewBook = await book.save();


            if (addNewBook)
                return res
                    .status(200)
                    .json({
                        success: true,
                        message: "New book added",
                        book: addNewBook,
                    });
            else throw createError(400, "Error in adding new book");
        } catch (error) {
            next(error);
        }
    },

    editBook: async (req, res, next) => {
        const { name, description, publishDate, price } = req.body;
        const { id } = req.params;

        try {
            validateBook(name, description, publishDate, price);

            const updateFields = {
                $set: { name, description, publishDate, price },
            };

            const updatedBook = await BooksModel.findByIdAndUpdate(
                id,
                updateFields,
                { new: true }
            );
            if (updatedBook) {
                return res
                    .status(200)
                    .json({
                        success: true,
                        message: "Book details updated",
                        book: updatedBook,
                    });
            } else {
                throw createError(400, "Error in updating book details");
            }
        } catch (error) {
            next(error);
        }
    },

    getBooks : async (req, res, next) => {
        try {
            const { page = 1, limit = 10, search } = req.query;
            const query = {};
    
            if (search) {
                query.$or = [
                    { name: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ];
            }
    
            const skip = (page - 1) * limit;
    
            const books = await BooksModel.find(query)
                .skip(skip)
                .limit(limit);
    
            const totalBooks = await BooksModel.countDocuments(query);
    
            const totalPages = Math.ceil(totalBooks / limit);
    
            res.status(200).json({
                success: true,
                message: 'Books retrieved successfully',
                data: {
                    books,
                    currentPage: page,
                    totalPages,
                    totalBooks
                }
            });
        } catch (error) {
            next(error);
        }
    },

    deleteBook: async (req, res, next) => {
        try {
            const { id } = req.params;
            const deletedBook = await BooksModel.findByIdAndDelete(id);
            if (deletedBook) {
                return res.status(200).json({
                    success: true,
                    message: "Book deleted",
                });
            } else {
                throw createError(404, "Book not found");
            }
        } catch (error) {
            next(error);
        }
    },
    
    bookDetails: async (req, res, next ) => {
        try {
            const { id } = req.params;
            const book = await BooksModel.findById(id);
            if (book) {
                return res.status(200).json({
                    success: true,
                    message: "Book data fetched",
                    data: book
                });
            } else {
                throw createError(404, "Book not found");
            }
        } catch (error) {
            throw createError(404, "Book not found");
        }
    }
};
