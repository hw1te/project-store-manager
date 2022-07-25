const { expect } = require('chai');
const { array } = require('joi');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/products');

const productsList = [
  { id: 1, name: 'Manopla Thanos' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
]

describe('O resultado do metodo getAll', () => {
  describe('Caso o retorno tenha sucesso', async () => {
    before(() => {
      sinon.stub(connection, 'query').resolves([productsList]);
    });

    after(() => {
      connection.query.restore();
    })

    it('O retorno é um array de objetos', async () => {
      const response = await productsModel.getAll();

      expect(response).to.be.an('array');
    });
    it('O retorno está com produtos', async () => {
      const response = await productsModel.getAll();

      expect(response).to.be.deep.equal(productsList);
    });

  })
  describe('Caso de errado', async () => {
    it('O retorno falha', async () => {
      const response = await productsModel.getAll();
      expect(!response).to.be.equal(false);

    });

    it('é um array', async () => {
      const response = await productsModel.getAll();

      expect(response).to.be.instanceOf(Array)
    })
  })

})

describe('O resultado do metodo getById', () => {
  const product = {
    "id": 1,
    "name": "Martelo do Thor",
  }
  before(() => {
    sinon.stub(connection, 'query').resolves([[product]])
  });

  after(() => {
    connection.query.restore();
  })

  it('retorna o produto pesquisado', async () => {
    expect(await productsModel.getById(2)).to.be.deep.equal(product)
  })
})

describe('O resultado do metodo create', () => {
  const productId = { insertId: 2 }
  before(() => {
    sinon.stub(connection, 'query').resolves([productId])
  });
  after(() => {
    connection.query.restore();
  })

  it('retorna id criado', async () => {
    const response = await productsModel.create(2);
    expect(response).to.be.deep.equal(productId.insertId)
  })
})