const blank = (value) => (!value);
const minLength = (value, min) => (value.length < min);

const validate = (name) => {
  if (blank(name)) {
    return { code: 400, data: { message: '"name" is required' } };
  }

  if (minLength(name, 5)) {
    return { code: 422, data: { message: '"name" length must be at least 5 characters long' } };
  }

  return true;
};

module.exports = {
  validate,
};