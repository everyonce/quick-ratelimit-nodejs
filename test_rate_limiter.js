const axios = require("axios");
const {transports, createLogger, format} = require('winston');
//const winston = require('winston');

const logger = createLogger({
    format: format.combine(
      format.label({ label: '[my-label]' }),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      //
      // The simple format outputs
      // `${level}: ${message} ${[Object with everything else]}`
      //
      format.cli(),
      format.colorize(),
      //
      // Alternatively you could use this custom printf format if you
      // want to control where the timestamp comes in your final message.
      // Try replacing `format.simple()` above with this:
      //
      format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
      
    ),
    transports: [
      new transports.Console()
    ]
  });
  
logger.info('Starting up....');

const main = async () =>  {
    for (;;)
    {
        await axios.get("http://localhost:3000/")

            .then(response => {
             logger.info(`API returned: ${response.status}`);
            })        .catch(err => {
              logger.info(`error: ${err}`);
            })
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

main();
