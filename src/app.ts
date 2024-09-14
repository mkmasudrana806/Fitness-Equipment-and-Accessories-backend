import { Request, Response } from "express";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ApiRoutes } from "./app/routes";
import notFoundRoute from "./app/middlewares/notFoundRoute";
import globalErrorHandler from "./app/middlewares/globalErrorHandlerRoute";
import fs from "fs";
import path from "path";
import { getRandomArray } from "./app/utils/getRandomArray";

const app = express();

// parsers (middleware)
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // your client url
app.use(cookieParser());

// api routes (middleware)
app.use("/api", ApiRoutes);

app.post("/random", (req: Request, res: Response) => {
  const existingArray = req.body; // Array of objects sent from the client

  if (!Array.isArray(existingArray)) {
    return res.status(400).json({ error: "Invalid data. Expecting an array." });
  }

  // Randomize the array
  const randomArray = getRandomArray(existingArray);

  // Path to store the randomized array as a JSON file
  const filePath = path.join(__dirname, "randomizedData.json");

  // Save the randomized array to a file
  fs.writeFile(
    filePath,
    JSON.stringify(randomArray, null, 2),
    "utf-8",
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to save the data." });
      }

      res.json({
        message: "Data randomized and saved successfully.",
        filePath,
      });
    }
  );
});

// base api route
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running...");
});

// not found route
app.use("*", notFoundRoute);

// global error handler
app.use(globalErrorHandler);

export default app;
