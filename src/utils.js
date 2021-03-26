String.prototype.isNullOrEmpty = function () {
  return !this || this?.length === 0;
};
