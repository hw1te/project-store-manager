// const { expect } = require('chai');
// const sinon = require('sinon');
// const salesModel = require('../../../models/sales');
// const salesService = require('../../../services/salesServices');

// describe('O metodo createSale da camada service', () => {
//   const sales = [
//     {
//       "productId": 1,
//       "quantity": 1
//     },
//     {
//       "productId": 2,
//       "quantity": 5
//     }
//   ]

//   before(() => {
//     sinon.stub(connection, 'query').resolves();
//   })

//   after(() => {
//     connection.query.restore();
//   })
//   it('Quando insere com sucesso', async () => {
//     const response = await salesModel.createSale(sales);

//     expect(response).to.be.equal(3);
//   })
// })