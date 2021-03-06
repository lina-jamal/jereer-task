const errorHandler = {
  clientError: (req, res) => {
    res.status(404).json({ statusCode: 404, message: "page not found" });
  },
  serverError: (err, req, res, next) => {
    const message = err.message || "internal server error";
    const status = err.output ? err.output.statusCode : 500;

    res.status(status).json({ statusCode: status, message });
  },
};

module.exports = errorHandler;
