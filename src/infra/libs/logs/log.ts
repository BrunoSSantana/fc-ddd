const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",
  fgBlack: "\x1b[30m",
  fgRed: "\x1b[31m",
  fgGreen: "\x1b[32m",
  fgYellow: "\x1b[33m",
  fgBlue: "\x1b[34m",
  fgMagenta: "\x1b[35m",
  fgCyan: "\x1b[36m",
  fgWhite: "\x1b[37m",
  bgBlack: "\x1b[40m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m",
};

export enum LogLevel {
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
  DEBUG = "debug",
}

function log(level: LogLevel, message: string) {
  let timeStampColor;
  let logLevelColor;
  let textColor;

  switch (level.toLowerCase()) {
    case LogLevel.INFO:
      // color = colors.fgCyan;
      timeStampColor = colors.fgGreen;
      logLevelColor = colors.bgGreen
      textColor = colors.fgGreen;;
      break;
    case LogLevel.WARN:
      // color = colors.fgYellow;
      timeStampColor = colors.fgYellow;
      logLevelColor = colors.bgYellow
      textColor = colors.fgYellow;
      break;
    case LogLevel.ERROR:
      // color = colors.fgRed;
      timeStampColor = colors.fgRed;
      logLevelColor = colors.bgRed
      textColor = colors.fgRed;
      break;
    case LogLevel.DEBUG:
      // color = colors.fgGreen;
      timeStampColor = colors.fgCyan;
      logLevelColor = colors.bgCyan
      textColor = colors.fgCyan;
      break;
    default:
      // color = colors.reset;
      timeStampColor = colors.reset;
      logLevelColor = colors.reset
      textColor = colors.reset;
      break;
  }

  const timeStamp = new Date().toISOString();
  process.stdout.write(
    `${timeStampColor}[${timeStamp}]${colors.reset} ${logLevelColor}[${level.toUpperCase()}]${colors.reset}${textColor}: ${message}${colors.reset}\n`,
  );
}

export const logger = {
  info: (msg: string) => log(LogLevel.INFO, msg),
  warn: (msg: string) => log(LogLevel.WARN, msg),
  error: (msg: string) => log(LogLevel.ERROR, msg),
  debug: (msg: string) => log(LogLevel.DEBUG, msg),
};
