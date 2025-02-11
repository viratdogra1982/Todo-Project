const jwt = require("jsonwebtoken");
const userModel = require("../models/usermodel");

const authTodoUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    console.log("Received Token:", token);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }



    try {
      
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user; // Attach the user object to the request
        next(); // Proceed to the next middleware/controller

    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = { authTodoUser };
