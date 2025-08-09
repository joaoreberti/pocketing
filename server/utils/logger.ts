import pino from "pino";

export const logger = pino({
  transport: {
    target: "pino-pretty", // remove this if you want raw JSON logs
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  },
  level: "info",
});
