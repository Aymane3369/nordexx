module.exports = (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'StyleShop API fonctionne !',
    endpoints: ['POST /api/create-checkout-session']
  });
};
