const redis = require("redis");

const redisClient = redis.createClient();
//     {
//     legacyMode: true,
//   PORT: 8003
// }

// redisClient.on("connect", () => {
//   console.log("Connected to Redis12345");
// });

// //await redisClient.connect();
// redisClient.on("error", (err) => {
//   console.error(`redis err ${err}`);
// });

// redisClient.on("ready", () => {
//   console.log("Redis is ready");
// });

// redisClient.on("end", () => {
//   console.log("Redis connection ended");
// });

// process.on("SIGINT", () => {
//   redisClient.quit();
// });

// redisClient
//   .connect()
//   .then(() => {
//     console.log("Connected to Redis");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// function cache(req, res, next) {
//   const { status } = req.params;

//   redisClient.get(status, (err, data) => {
//     if (err) throw err;
//     if (data !== null) {
//       console.log(`cache hits`);
//       res.send(JSON.parse(data));
//     } else {
//       next();
//     }
//   });
// }

//module.exports = { redisClient, cache };
