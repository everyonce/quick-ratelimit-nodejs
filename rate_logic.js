const RateLimit = require('ratelimit.js').RateLimit;

var rules = [
    {interval: 1, limit: 1, precision: 10}
    ];
var limiter;

exports.createLimiter = function(redisClient)  {
    limiter = new RateLimit(redisClient, rules,  {
        prefix: redisClient.keyPrefix,
        clientPrefix: true}
    );
}
exports.rateLimitWrapper = function(requestData, errorFunction, limitedFunction, acceptedFunction) {
    limiter.incr(requestData.ip, (err, isRateLimited) => {
        console.log(`Checked limits: for IP ${requestData.ip}, isLimited: ${isRateLimited}, err: ${err}`);
        if (err) return errorFunction(err);
        else if (isRateLimited) return limitedFunction();
        else return acceptedFunction();
    });   
}
