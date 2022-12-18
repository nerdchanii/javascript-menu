const stringToArray = (string, options) => {
  if (options === undefined) {
    return string.split('');
  }
  return string.split(options.delimiter).map((value) => {
    let result = value;
    if (options.trim) {
      result = result.trim();
    }
    return options.type(result).trim();
  });
};

module.exports = { stringToArray };
