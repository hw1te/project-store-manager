const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/products');
const productsService = require('../../../services/productsServices');

const productsList = [
  { id: 1, name: 'Manopla Thanos' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
]

describe('Testa a camada service e suas funcionalidades', () => {
  before(() => {
    sinon.stub(productsModel, 'getAll').resolves(productsList)
  });

  after(() => {
    productsModel.getAll.restore();
  });

  it('Retorna uma lista de produtos', async () => {
    const response = await productsService.getAll();
    console.log(response);
    expect(response).to.be.deep.equal(productsList);
  });

  it('Retorna um array', async () => {
    const response = await productsService.getAll();
    console.log(response)
    expect(response).to.be.an('array');
  });
});