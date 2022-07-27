const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/products');
const productsService = require('../../../services/productsServices');
const salesModel = require('../../../models/sales');
const salesService = require('../../../services/salesServices');

describe('Testa metodo createSale', () => {
  const sales = [{ productId: 4, quantity: 10 }, { productId: 4, quantity: 10 }]
  const createdSales = {
    "id": 3,
    "itemsSold": [{ productId: 4, quantity: 10 }, { productId: 4, quantity: 10 }]
  }
  before(() => {
    sinon.stub(salesModel, 'createSale').resolves(sales)
    sinon.stub(salesService, 'createSale').resolves(createdSales);
  })
  after(() => {
    salesModel.createSale.restore();
    salesService.createSale.restore()
  })
  it('Cria sales com sucesso', async () => {
    const data = await salesModel.createSale(sales);
    expect(data).to.be.equal(sales);
  })

  it('Retorno com estrutura criada', async () => {
    const data = await salesService.createSale(createdSales);
    expect(data).to.be.equal(createdSales);
  })

  it('Retorno com estrutura criada', async () => {
    const data = await salesService.createSale(createdSales);
    expect(data.id).to.be.equal(3);
  })
})
const sales = [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  },
]

describe('O metodo getAll da camda service de sales', () => {
  before(() => {
    sinon.stub(salesModel, 'getAll').resolves(sales);
  })
  after(() => {
    salesModel.getAll.restore();
  })
  it('Retorna array', async () => {
    const data = await salesService.getAll();

    expect(data).to.be.an('array');
  })
  it('Retorna array', async () => {
    const data = await salesService.getAll();

    expect(data).to.be.equal(sales);
  })
})

describe('Testa o metodo getById em service sales', () => {
  before(() => {
    sinon.stub(salesService, 'getById').resolves(sales[1]);
  });

  after(() => {
    salesService.getById.restore();
  });

  it('Retorno é um objeto', async () => {
    const response = await salesService.getById(1);
    expect(response).to.be.instanceOf(Object);
  });

  it('Retorna item pelo id', async () => {
    const response = await salesService.getById(1);

    expect(response).to.deep.equal(sales[1]);
  });

});
