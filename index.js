const app = require('./app');
require('dotenv').config();

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log('Primeiro commit :)');
  console.log(`Escutando na porta ${process.env.PORT}`);
});
