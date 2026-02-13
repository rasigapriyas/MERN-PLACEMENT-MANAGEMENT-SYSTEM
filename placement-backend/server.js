// // import express from "express";
// // import mongoose from "mongoose";
// // import cors from "cors";
// // import dotenv from "dotenv";

// // import studentRoutes from "./routes/studentRoutes.js";
// // import adminRoutes from "./routes/adminRoutes.js";

// // dotenv.config();

// // const app = express();

// // // Middlewares
// // app.use(cors());
// // app.use(express.json());

// // // Routes
// // app.use("/api/students", studentRoutes);
// // app.use("/api/admin", adminRoutes);

// // // MongoDB connection
// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => console.log("MongoDB connected"))
// //   .catch((err) => console.log("MongoDB connection error:", err));

// // const PORT = 5000;

// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });
// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";

// import studentRoutes from "./routes/studentRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import companyRoutes from "./routes/companyRoutes.js";

// dotenv.config();

// const app = express();

// app.use(cors()); // ✅ IMPORTANT
// app.use(express.json());
// app.use("/api/companies", companyRoutes);


// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

// app.use("/api/students", studentRoutes);
// app.use("/api/admin", adminRoutes);

// app.listen(5000, () => console.log("Server running on port 5000"));
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import studentRoutes from "./routes/studentRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";







dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/api/students", studentRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/admin", adminRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
