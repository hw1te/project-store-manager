const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/products');
const productsService = require('../../../services/productsServices');

const productsList = [
  { id: 1, name: 'Manopla Thanos' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
]

describe('Testa o get All', () => {
  before(() => {
    sinon.stub(productsModel, 'getAll').resolves(productsList)
  });

  after(() => {
    productsModel.getAll.restore();
  });

  it('Retorna uma lista de produtos', async () => {
    const response = await productsService.getAll();
    expect(response).to.be.deep.equal(productsList);
  });

  it('Retorna um array', async () => {
    const response = await productsService.getAll();
    expect(response).to.be.an('array');
  });
});

describe('Testa o funcionamento de getById com sucesso', () => {
  const product = {
    id: 1,
    name: "Martelo de Thor",
  }
  before(() => {
    sinon.stub(productsModel, 'getById').resolves(product);
  })

  after(() => {
    productsModel.getById.restore();
  })
  it('retorna o produto selecionado', async () => {
    const response = {
      code: 200,
      data: product
    }
    expect(await productsService.getById(1)).to.be.deep.equal(response)
  })
})

describe('Testa funcionamento de getById quando falha', () => {

  const errorMessage = {
    code: 404,
    data: {
      message: 'Product not found'
    }
  }
  // console.log(errorMessage)
  before(() => {
    sinon.stub(productsModel, 'getById').resolves();
  })

  after(() => {
    productsModel.getById.restore();
  })
  it('retorna um erro se não achar o produto', async () => {
    const response = await productsService.getById('a');
    expect(response.data.message).to.be.equal(errorMessage.data.message)
  })
})

describe('Testa funcionamento de create', () => {
  const productTest = {
    code: 201,
    data: { id: 1, name: 'Brinquedo' },
  };

  before(() => {
    sinon.stub(productsModel, 'create').resolves(productTest)
  })

  after(() => {
    productsModel.create.restore();
  })
  it('Caso o produto seja inserido com sucesso', async () => {
    const response = await productsModel.create(productTest.data.name);

    expect(response).to.be.equal(productTest)
  })
})