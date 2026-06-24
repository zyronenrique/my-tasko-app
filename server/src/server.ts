import dotenv from "dotenv";
import app from "./app.js";
import { prisma } from "./lib/prisma";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await prisma.$connect();
    console.log("PostgreSQL connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:");
    console.error(error);
    process.exit(1);
  }
}

start();
