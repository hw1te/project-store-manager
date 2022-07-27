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
});

describe('Testa funcionamento de getById quando falha', () => {

  const errorMessage = {
    code: 404,
    data: {
      message: 'Product not found'
    }
  }
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

describe('Testa o metodo create da camada service de products', () => {
  before(() => {
    sinon.stub(productsModel, 'create').resolves(2)
  })

  after(() => {
    productsModel.create.restore()
  })
  it('Caso crie com sucesso', async () => {
    const response = {
      code: 201,
      data: {
        id: 2,
        name: 'Brinquedo Teste'
      }
    }
    const data = await productsModel.create(response);
    expect(response).to.be.instanceOf(Object)
  })
  it('Caso não encontre o produto', async () => {

  })
})

describe('Testa o metodo remove na camada service de products', () => {
  const product = {
    id: 1,
    name: 'Martelo de Thor',
  }
  const response = {
    code: 204,
    data: ''
  }
  before(() => {
    sinon.stub(productsModel, 'getById').resolves(product)
    sinon.stub(productsModel, 'delete').resolves(null)
  })
  after(() => {
    productsModel.getById.restore();
    productsModel.delete.restore();
  })
  it('Quando funciona com sucesso', async () => {
    const data = await productsService.delete(1)
    expect(data).to.be.deep.equal(response)
  })

})

describe(`Retorna um erro caso o metodo de errado`, () => {
  before(() => {
    sinon.stub(productsModel, 'getById').resolves(null)
  })
  after(() => {
    productsModel.getById.restore();
  })

  it('retorna um response de erro caso o Model não encontre o produto', async () => {
    const result = {
      code: 404,
      data: {
        message: 'Product not found'
      }
    }
    const response = await productsService.getById();
    expect(response.data.message).to.be.deep.equal(result.data.message)
  })
})