import { logger } from "../utils/logger";

export default defineEventHandler((event) => {
  const start = Date.now();
  const { method, url } = event.node.req;

  event.node.res.on("finish", () => {
    const ms = Date.now() - start;
    logger.info({
      method,
      url,
      status: event.node.res.statusCode,
      responseTime: `${ms}ms`,
    });
  });
});
