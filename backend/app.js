import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import { errorHandler } from "./middleware/errorMiddleware.js"
import listingRoutes from "./routes/listingRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import visitRoutes from "./routes/visitRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";



const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth",authRoutes)



app.use("/api/listings",listingRoutes)

app.use("/api/favorites", favoriteRoutes);

app.use("/api/visits", visitRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reviews", reviewRoutes);


app.use(errorHandler);

export default app;