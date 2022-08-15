import log4js from 'log4js'

log4js.configure({
  appenders: {
    Console: { type: 'console' },
    WarningFile: { type: 'file', filename: './Logs/Activity.log' },
    ErrorFile: { type: 'file', filename: './Logs/Errors.log' },
    loggerConsole: {
      type: 'logLevelFilter',
      appender: 'Console',
      level: 'trace',
    },
    ActivityLogger: {
      type: 'logLevelFilter',
      appender: 'WarningFile',
      level: 'info',
      maxLevel: 'warn'
    },
    ErrorLogger: {
      type: 'logLevelFilter',
      appender: 'ErrorFile',
      level: 'error',
    },
  },
  categories: {
    default: {
      appenders: ['loggerConsole', 'ActivityLogger', 'ErrorLogger'],
      level: 'all'
    },
    prod: {
      appenders: ['ActivityLogger', 'ErrorLogger'],
      level: 'all'
    }

  },
})

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'default'

const logger = log4js.getLogger(env)


export default logger
