function tryPackage(name) {
  let pkg;
  try {
    pkg = require(name); // eslint-disable-line
  }
  catch (e) { }
  return pkg;
}

module.exports = tryPackage;
