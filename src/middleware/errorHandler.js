const errorHanlder = (err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production" ? "Server Error" : err.message,
    ...err(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

module.exports = errorHanlder;
