import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import { errorHandler } from "./middleware/errorMiddleware.js"
import listingRoutes from "./routes/listingRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import visitRoutes from "./routes/visitRoutes.js";



const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth",authRoutes)



app.use("/api/listings",listingRoutes)

app.use("/api/favorites", favoriteRoutes);

app.use("/api/visits", visitRoutes);

app.use(errorHandler);

export default app;