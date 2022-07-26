const blank = (value) => (!value);

const lessOrEqual = (value, amount) => (value <= amount);

const validate = (productId, quantity) => {
  if (blank(productId)) {
    return { code: 400, data: { message: '"productId" is required' } };
  }
  if (lessOrEqual(quantity, 0)) {
    return { code: 422, data: { message: '"quantity" must be greater than or equal to 1' } };
  }
  if (lessOrEqual(productId, 0)) {
    return { code: 422, data: { message: '"productId" must be greater than or equal to 1' } };
  }
  if (blank(quantity)) {
    return { code: 400, data: { message: '"quantity" is required' } };
  }

  return false;
};

module.exports = {
  validate,
};
