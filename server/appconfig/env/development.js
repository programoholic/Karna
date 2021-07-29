const inventoryConfig = {
  BOOK_STORE_API_BASE: 'https://api.itbook.store/1.0',
  ELECTRONIC_API_BASE: ''
}

// config for Mongo
const connectionString = { 
  keyspace: 'KarnaDB',
  contact: (process.env.MONGODB_HOST || 'mongodb://localhost:'),
  port: '27888',
};

const redis = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
};
const loggerConfig = { // config for log4js
  "appenders": {
    "access": {
      "type": "dateFile",
      "filename": "log/access.log",
      "pattern": "-yyyy-MM-dd",
      "category": "http"
    },
    "app": {
      "type": "file",
      "filename": "log/app.log",
      "maxLogSize": 10485760,
      "numBackups": 3
    },
    "errorFile": {
      "type": "file",
      "filename": "log/errors.log"
    },
    "errors": {
      "type": "logLevelFilter",
      "level": "ERROR",
      "appender": "errorFile"
    }
  },
  "categories": {
    "default": { "appenders": [ "app", "errors" ], "level": "DEBUG" },
    "http": { "appenders": [ "access"], "level": "DEBUG" }
  }
};

const jwtdetails = {
  secret: 'karna@cisco',
  expiryTime: 60 * 500,
};


const events = {
  addmember: 'newmembersadded',
  addtool: 'newtoolsadded',
  addcommunity: 'newcommunityadded',
};
const cookieInfo = {
  admin: 'isUserAdmin',
  user: 'loggedUser'
}

module.exports = {
  connectionString,
  loggerConfig,
  jwtdetails,
  redis,
  cookieInfo,
  inventoryConfig
};

