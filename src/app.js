const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());

// ---------------- REGISTER ----------------
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    console.log("Received registration:", req.body);

    // In a real app, you'd save to a database
    res.json({ message: `${name} registered successfully!` });
});

// ---------------- LOGIN ----------------
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt:", req.body);

    // Dummy login check
    if (email === "test@example.com" && password === "1234") {
        res.json({ message: "Login successful!" });
    } else {
        res.json({ message: "Invalid email or password." });
    }
});

// ---------------- LOAD USERS ----------------
app.get('/users', (req, res) => {
    // Dummy user list
    const users = [
        { name: "Alice", email: "alice@example.com" },
        { name: "Bob", email: "bob@example.com" },
    ];
    res.json(users);
});

// ---------------- LOAD ORDERS ----------------
app.get('/orders', (req, res) => {
    // Dummy orders list
    const orders = [
        { id: 1, item: "Laptop", quantity: 1 },
        { id: 2, item: "Phone", quantity: 2 },
    ];
    res.json(orders);
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
