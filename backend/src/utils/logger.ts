import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV !== 'production' 
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
          ignore: 'pid,hostname',
        },
      }
    : undefined,
  formatters: {
    level: (label: string) => {
      return { level: label.toUpperCase() };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

// 요양레이다 특화 로거 컨텍스트
export const createContextLogger = (context: string) => {
  return logger.child({ context });
};

export const loggers = {
  server: createContextLogger('SERVER'),
  db: createContextLogger('DATABASE'),
  api: createContextLogger('API'),
  ai: createContextLogger('AI'),
  publicData: createContextLogger('PUBLIC_DATA'),
  extract: createContextLogger('EXTRACT'),
  care: createContextLogger('CARE'),
  mobile: createContextLogger('MOBILE'),
  auth: createContextLogger('AUTH'),
};
