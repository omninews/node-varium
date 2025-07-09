const esmImport = (path) =>
  new Promise((resolve, reject) => {
    import(path).then(resolve).catch(reject);
  });

let esm;
let initialized = false;

function getEsm() {
  if (!initialized) {
    esm = require("esm")(module)("./index.mjs");
    initialized = true;
  }
  return esm;
}

module.exports = (...args) => getEsm().default(...args);
module.exports.reader = (...args) => getEsm().reader(...args);
