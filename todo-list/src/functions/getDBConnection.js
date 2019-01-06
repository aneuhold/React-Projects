exports.handler = (event, context, callback) => {
  callback(null, {
    message: "It seems that this was successfully called!";
  });
};
