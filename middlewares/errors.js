export const errorHandler = (error, req, res, next) => {
  res.status(500).json({
    status: 500,
    message: error.message,
  });
};
