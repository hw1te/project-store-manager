const { expect } = require('chai');
const { array } = require('joi');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/sales');

describe('O metodo createSale da camada models de sales', () => {
  const sales = [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]

  before(() => {
    sinon.stub(connection, 'query').resolves([{ insertId: 3 }]);
  })

  after(() => {
    connection.query.restore();
  })
  it('Quando insere com sucesso', async () => {
    const response = await salesModel.createSale(sales);

    expect(response).to.be.equal(3);
  })
})

describe('O metodo getAll da camda models de sales', () => {
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
  before(() => {
    sinon.stub(connection, 'query').resolves([sales]);
  })
  after(() => {
    connection.query.restore();
  })
  it('Retorna todas as vendas', async () => {
    const data = await salesModel.getAll();

    expect(data).to.be.deep.equal(sales);
  })

  it('Retorna uma venda pelo id', async () => {
    const data = await salesModel.getById(1);

    expect(data).to.be.deep.equal(sales);
  })
})
