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

describe('Testa salesController getAll', () => {
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
})

describe('Testa salesController getById', () => {
  const req = {};
  const res = {};

  before(() => {
    res.status = sinon.stub().returns(res);
    req.params = { id: 2 }
    res.json = sinon.stub().returns([sales]);
    sinon.stub(salesService, 'getById').resolves([sales[2]]);
  });
  after(() => {
    salesService.getById.restore();
  });

  it('Espera que o json seja um objeto', async () => {
    await salesController.getById(req, res);
    console.log(sales[2])
    expect(res.json.calledWith(sales[2]));
  });

  it('Retorna status OK', async () => {

    await salesController.getById(req, res);

    expect(res.status.calledWith(200))
  });
});




