const { expect } = require('chai');
const { array } = require('joi');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/sales');

describe('O metodo createSale da camada models', () => {
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