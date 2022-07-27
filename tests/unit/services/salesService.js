const { expect } = require('chai');
const sinon = require('sinon');
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

describe('Retorna venda usando id', () => {
  before(() => {
    sinon.stub(salesModel, 'getById').resolves(sales[2]);
  });
  after(() => {
    salesModel.getById.restore();
  });

  it('O retorno é um objeto', async () => {
    const response = await salesService.getById(3);
    expect(response).to.be.an('object');
  });

  it('O retorno tem o id buscado', async () => {
    const response = await salesModel.getById(2);
    expect(response).to.deep.equal(sales[2]);
  });

});

