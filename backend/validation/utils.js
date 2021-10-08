module.exports = {
  removeHeader: function (errors) {
    if (!errors) {
      return errors;
    }
    Object.keys(errors).forEach(function (key) {
      const value = errors[key].toString();
      errors[key] = value.substr(value.indexOf(" ") + 1);
    });
    return errors;
  },
};
