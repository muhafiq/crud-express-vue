import { PrismaClient } from "@prisma/client";
import logger from "./logging.js";

const prismaClient = new PrismaClient({
  log: [
    {
      emit: "stdout",
      level: "query",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
    {
      emit: "event",
      level: "error",
    },
  ],
});

prismaClient.$on("error", (e) => logger.error(e));

prismaClient.$on("warn", (e) => logger.warn(e));

prismaClient.$on("info", (e) => logger.info(e));

export default prismaClient;
