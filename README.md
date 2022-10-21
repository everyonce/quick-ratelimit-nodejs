# quick-ratelimit-nodejs
Example of adding rate limiting to a nodejs router. Uses ratelimit.js (https://github.com/dudleycarr/ratelimit.js/) to provide adjustable sliding window rate limiting algorithm with redis as the backend.

Running this requires express (for web server), ratelimit.js (for rate limiting), ioredis (for connecting to redis), winston, axios (these are used by the test script)

```npm install```
