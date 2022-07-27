const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/salesServices');
const salesController = require('../../../controllers/salesController');

const sales = [
  {
    "saleId": 1,
    "date": "2022-07-18T17:27:42.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-07-18T17:27:42.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-07-18T17:27:42.000Z",
    "productId": 3,
    "quantity": 15
  }
];

describe('Testa metodo getAll', () => {
  const req = {};
  const res = {};

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'getAll').resolves(sales);
  });

  after(() => {
    salesService.getAll.restore();
  });

  it('Espera que o json seja um objeto', async () => {
    await salesController.getAll(req, res);

    expect(res.json.calledWith(sales));
  });

  it('Retorna status OK', async () => {
    await salesController.getAll(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
  });
}); 