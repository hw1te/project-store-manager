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

describe('Demonstra produtos pelo id na busca', () => {
  const res = {};
  const req = {};

  before(() => {
    res.status = sinon.stub().returns(res);
    req.params = { id: 2 }
    res.json = sinon.stub().returns(productsList[2]);
    sinon.stub(productsService, 'getById').resolves(productsList[2]);
  });

  after(() => {
    productsService.getById.restore();
  });

  it('O retorno é um array de objetos', async () => {
    const data = await productsController.getById(req, res);
    expect(data).to.be.an('object');
  });

  it('O retorno tem o status 200', async () => {
    await productsController.getById(req, res);

    expect(res.status.calledWith(200))
  });
})


