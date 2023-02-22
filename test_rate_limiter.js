const axios = require("axios");
const {transports, createLogger, format} = require('winston');
//const winston = require('winston');

const logger = createLogger({
    format: format.combine(
      format.label({ label: '[my-label]' }),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.cli(),
      format.colorize(),
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
            })        
            .catch(err => {
              if (err.response.status=="429") {
                logger.info("Request rate limited (429)");
              } else {
                logger.info(`error: ${Object.keys(err.response)}`);
              }
            })
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

main();
