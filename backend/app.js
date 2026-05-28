import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import { errorHandler } from "./middleware/errorMiddleware.js"
import listingRoutes from "./routes/listingRoutes.js";

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth",authRoutes)

app.use(errorHandler);

app.use("/api/listings",listingRoutes)

export default app;