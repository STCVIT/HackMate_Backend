const successHandler = (suc, res) => {
  console.log(suc.statusCode);
  return res.status(suc.statusCode).send({
    statusCode: suc.statusCode,
    message: suc.message,
  });
};

module.exports = successHandler;
