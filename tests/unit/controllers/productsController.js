const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../services/productsServices');
const productsController = require('../../../controllers/productsController');

const productsList = [
  { id: 1, name: 'Manopla Thanos' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
]

describe('Demonstra todos os produtos na camada controller', () => {
  const res = {};
  const req = {};

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getAll').resolves(productsList);
  });

  after(() => {
    productsService.getAll.restore();
  });

  it('O retorno é um array de objetos', async () => {
    await productsController.getAll(req, res);

    expect(res.json.calledWith(productsList)).to.be.equal(true);
  });

  it('O retorno tem o status 200', async () => {
    await productsController.getAll(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
  });
})


