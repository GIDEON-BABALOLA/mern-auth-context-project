const allowedOrigins = require("./allowedOrigins")
const corsOptions = {
  origin: function (origin, callback) {
    // use !origin during development and not during production
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSucessStatus : 200
}
module.exports = corsOptions;