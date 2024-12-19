function validateBarCode(barcode) {
  if (!barcode || barcode.length != 13) {
    return false;
  } else {
    return true;
  }
}

function validateName(name) {
  if (!name) {
    return false;
  } else {
    return true;
  }
}

module.exports = { validateBarCode, validateName };
