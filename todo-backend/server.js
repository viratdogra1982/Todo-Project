require('dotenv').config();
const express = require('express');
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
    console.error("MONGODB_URL is not defined in .env file");
    process.exit(1);
}

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log("DB connected");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch(err => console.error("MongoDB Connection Error:", err));

    const userRoutes = require("./routes/userroutes");
    app.use("/api/users", userRoutes);
    const todoRoutes = require('./routes/todoroutes');
    app.use('/todos', todoRoutes);