module.exports = function renderErrorMessage(error, res, renderPath, data,next) {
    if (error.name === "ValidationError") {
      const message = getErrorMessage(error);
      res.render(renderPath, { message, ...data});
      return;
    }
    if (error.name === "MongoError") {
      res.render(renderPath, { message: "Title is already taken !", ...data});
      return;
    }
    next();

};
function getErrorMessage(error) {
    return error.message.includes("Path")
      ? "Please fullfil all fields"
      : error.message.split(": ")[error.message.split(": ").length - 1];
  }
