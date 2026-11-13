const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({
    path: __dirname + "/.env"
});
console.log("ADMIN USERNAME:", process.env.ADMIN_USERNAME);

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());


// Test backend
app.get("/", (req, res) => {
    res.send("Backend is working!");
});
// Admin Login
app.post("/api/admin-login", async (req, res) => {

    const { username, password } = req.body;

    // Check username
    if (username !== process.env.ADMIN_USERNAME) {
        return res.status(401).json({
            success: false,
            message: "Invalid username or password."
        });
    }

    // Check password
    const passwordMatch = password === process.env.ADMIN_PASSWORD;

    if (!passwordMatch) {
        return res.status(401).json({
            success: false,
            message: "Invalid username or password."
        });
    }

    // Create login token
    const token = jwt.sign(
        {
            username: username,
            role: "admin"
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );

    res.json({
        success: true,
        message: "Login successful!",
        token: token
    });
});
// Protect admin routes
function adminAuth(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Admin login required."
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Invalid token."
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (decoded.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Admin access required."
            });
        }

        req.admin = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });

    }
}

// Safari booking
app.post("/api/safari-booking", (req, res) => {

    console.log("Safari Booking Received:");
    console.log(req.body);

    let bookings = [];

    try {
        const data = fs.readFileSync("bookings.json", "utf8");

        if (data) {
            bookings = JSON.parse(data);
        }
    } catch (error) {
        console.log("Could not read bookings file.");
    }

    bookings.push({
        ...req.body,
        bookingType: "Safari",
        bookingDate: new Date().toISOString()
    });

    fs.writeFileSync(
        "bookings.json",
        JSON.stringify(bookings, null, 2)
    );

    res.json({
        success: true,
        message: "Safari booking saved successfully!"
    });
});


// Hotel booking
app.post("/api/hotel-booking", (req, res) => {

    console.log("Hotel Booking Received:");
    console.log(req.body);

    let bookings = [];

    try {
        const data = fs.readFileSync("bookings.json", "utf8");

        if (data) {
            bookings = JSON.parse(data);
        }
    } catch (error) {
        console.log("Could not read bookings file.");
    }

    bookings.push({
        ...req.body,
        bookingType: "Hotel",
        bookingDate: new Date().toISOString()
    });

    fs.writeFileSync(
        "bookings.json",
        JSON.stringify(bookings, null, 2)
    );

    res.json({
        success: true,
        message: "Hotel booking saved successfully!"
    });
});
// Taxi booking
app.post("/api/taxi-booking", (req, res) => {

    console.log("Taxi Booking Received:");
    console.log(req.body);

    let bookings = [];

    try {
        const data = fs.readFileSync("bookings.json", "utf8");

        if (data) {
            bookings = JSON.parse(data);
        }
    } catch (error) {
        console.log("Could not read bookings file.");
    }

    bookings.push({
        ...req.body,
        bookingType: "Taxi",
        bookingDate: new Date().toISOString()
    });

    fs.writeFileSync(
        "bookings.json",
        JSON.stringify(bookings, null, 2)
    );

    res.json({
        success: true,
        message: "Taxi booking saved successfully!"
    });
});

// Get all bookings
app.get("/api/bookings", adminAuth, (req, res) => {

    let bookings = [];

    try {
        const data = fs.readFileSync("bookings.json", "utf8");

        if (data) {
            bookings = JSON.parse(data);
        }
    } catch (error) {
        console.log("Could not read bookings file.");
    }

    res.json(bookings);
});

// Update booking status or customer details
app.put("/api/bookings/:index", adminAuth, (req, res) => {

    const index = parseInt(req.params.index);

    const {
        status,
        name,
        guestName,
        phone,
        email
    } = req.body;

    const allowedStatuses = [
        "Pending",
        "Confirmed",
        "Cancelled"
    ];

    let bookings = [];

    try {

        const data = fs.readFileSync(
            "bookings.json",
            "utf8"
        );

        if (data) {
            bookings = JSON.parse(data);
        }

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Could not read bookings."
        });

    }

    if (index < 0 || index >= bookings.length) {

        return res.status(404).json({
            success: false,
            message: "Booking not found."
        });

    }

    // Update status if provided
    if (status !== undefined) {

        if (!allowedStatuses.includes(status)) {

            return res.status(400).json({
                success: false,
                message: "Invalid booking status."
            });

        }

        bookings[index].status = status;
    }

    // Update customer details if provided
    if (name !== undefined) {
        bookings[index].name = name;
    }

    if (guestName !== undefined) {
        bookings[index].guestName = guestName;
    }

    if (phone !== undefined) {
        bookings[index].phone = phone;
    }

    if (email !== undefined) {
        bookings[index].email = email;
    }

    fs.writeFileSync(
        "bookings.json",
        JSON.stringify(bookings, null, 2)
    );

    res.json({
        success: true,
        message: "Booking updated successfully.",
        booking: bookings[index]
    });

});

// Delete a booking
app.delete("/api/bookings/:index", adminAuth, (req, res) => {

    const index = parseInt(req.params.index);

    let bookings = [];

    try {
        const data = fs.readFileSync("bookings.json", "utf8");

        if (data) {
            bookings = JSON.parse(data);
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Could not read bookings."
        });
    }

    if (index < 0 || index >= bookings.length) {
        return res.status(404).json({
            success: false,
            message: "Booking not found."
        });
    }

    bookings.splice(index, 1);

    fs.writeFileSync(
        "bookings.json",
        JSON.stringify(bookings, null, 2)
    );

    res.json({
        success: true,
        message: "Booking deleted successfully."
    });
});


const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

server.on("error", (error) => {
    console.error("SERVER ERROR:", error);
});

process.stdin.resume();