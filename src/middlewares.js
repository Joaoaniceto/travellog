const notFound = (req, res, next) => {
  const error = new Error(`not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(status);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? 'smile' : res.statusCode,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
