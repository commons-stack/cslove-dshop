const manualPrices = {
  TEST: 1 / 60,
  SWAGTEC: 1 / 60,
  CSLOVE: 1 / 55
}

module.exports = function (router) {
  // This endpoint will tell the price of manually configured tokens
  router.get('/tec/price', async (req, res) => {
    const tsyms = req.query.tsyms
    const prices = {}
    tsyms.split(',').map((symbol) => {
      if (symbol in manualPrices) {
        prices[symbol] = manualPrices[symbol]
      }
    })
    res.json(prices)
  })
}
