require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

// Import Routes
const authRouter = require("./routes/auth/auth-route"); // fix to match file name

const admineventRoute= require("./routes/admin/Event-route");
const studenteventRoute= require("./routes/student/Event-route")
const studentteamroute= require("./routes/student/Team-route")


const adminmerchRoute= require("./routes/admin/Merch-route");
const studentmerchRoute= require("./routes/student/Merch-route")

const adminuserdetails = require('./routes/admin/user-details-route');
const studentregisterRoute= require("./routes/student/register-route")

const adminRegisterRoute = require("./routes/admin/register-route");
// payemnt
const paymentRoute = require("./routes/student/payment-route");


const app = express();
const PORT = process.env.PORT || 5001;

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ✅ Routes
app.use("/api/auth", authRouter);

// event routes
app.use("/api/admin/event",admineventRoute);
app.use("/api/student/event",studenteventRoute );

// team route

app.use('/api/student/team', studentteamroute); 

// merch routes

app.use('/api/admin/merch', adminmerchRoute); 
app.use('/api/student/merch', studentmerchRoute); 

// userdetails admin
app.use('/api/admin/studinfo', adminuserdetails); 

// register route
app.use('/api/student/reg', studentregisterRoute); 
app.use("/api/admin/registers", adminRegisterRoute);



app.use("/api/student/payment", paymentRoute);



// ✅ Base Health Check Route
app.get("/", (req, res) => {
  res.send("🎉 Event Management Backend is running");
});

// ✅ Server Listener
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
