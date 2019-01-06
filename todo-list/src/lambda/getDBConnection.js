exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: 'It seems that this was successfully called!',
  });
};
