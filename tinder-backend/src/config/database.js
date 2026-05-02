const mongoose = require('mongoose')

// mongoose.connect("mongodb+srv://venkysrinu1999:D6bZHB6KI1uYu70k@node.19gfyve.mongodb.net/socialMedia")

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://venkysrinu1999:D6bZHB6KI1uYu70k@node.19gfyve.mongodb.net/devTinder")

};

module.exports = connectDB;

