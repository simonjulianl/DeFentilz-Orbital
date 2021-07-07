const webPush = require('web-push')

// Move this to env
// There must be better way of doing this locally
webPush.setVapidDetails(
  process.env.WEB_PUSH_EMAIL || "mailto:amadeus.winarto@u.nus.edu",
  process.env.WEB_PUSH_PUBLIC_KEY || "BIrwgIfEWi6V7zSo7wPbobsEykXR5LMsCVNmmSeGHR4ctltUa49jOke3px4JbagLR9xVNcm30zzpRCuL-zOr1fw",
  process.env.WEB_PUSH_PRIVATE_KEY || "5CUhVGHSP73z3nP8pmqz7TCnLR2IJHNVZpoiGSNIy-0",
)

exports.create = (req, res) => {
  if (req.method == 'POST') {
    const { subscription } = req.body;
    webPush
      .sendNotification(subscription, JSON.stringify({title: 'Hello Web Push', message: 'Your web push notification is here!'}))
      .then(response => {
        res.writeHead(response.statusCode, response.headers).end(response.body)
      })
      .catch(err => {
        if ('statusCode' in err) {
          res.writeHead(err.statusCode, err.headers).end(err.body)
        } else {
          console.error(err)
          res.statusCode = 500
          res.end()
        }
      })
  } else {
    res.statusCode = 405
    res.end()
  }
}