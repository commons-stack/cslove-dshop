// return a fix price of 50$ per token
module.exports = function (router) {
  // This endpoint will tell the price of the CSLOVE token
  router.get('/cs/price', async (req, res) => {
    res.json({ CSLOVE: 1 / 50 })
  })
}
