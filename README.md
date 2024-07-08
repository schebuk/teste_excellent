Desenvolvedor NODE/PHP PLENO - Teste de CRUD de Produto e Pedido
Requisitos Obrigatórios:
Projetos e Tecnologias Utilizadas:
● Criar dois projetos, backend e frontend.
● Utilizar Docker.
● Banco de dados Postgres ou Mysql.
● No backend: Node (framework NestJs) ou PHP (framework Laravel).
● No frontend: Angular ou React, framework Bootstrap ou Material.
Funcionalidades do Sistema:
Cliente Pessoa Jurídica:
1. Tela de Cadastro do cliente (Tela 1):
● Exibir todos os clientes.
● Botão para acessar a tela cadastro de clientes
● Campos: ID, Razão Social, CNPJ, E-mail;
● Consumir API Pública: https://www.cnpj.ws, informar o CNPJ e obter os campos
automaticamente informados acima.
Produto:
1. Tela de Listagem de Produtos (Tela 1):
● Exibir todos os produtos.
● Botão para acessar a tela de cadastro de produtos.
● Para cada produto na listagem, botões de editar e excluir.
2. Tela de Cadastro de Produto (Tela 2):
● Campos: ID, Descrição, Valor de Venda, Estoque, Imagens.
● IMPORTANTE - Possibilidade de upload de uma ou mais imagens para o produto.
3. Tela de Edição de Produto (Tela 3):
● Permitir a edição das informações de um produto.
4. Tela de Exclusão de Produto (Tela 4):
● Modal ou sweetalert para confirmar a exclusão do produto.
Pedido:
1. Tela de Listagem de Pedidos (Tela 6):
● Exibir todos os pedidos.
● Botão para criar um novo pedido.
● Para cada pedido na listagem, botão de excluir.
2. Tela de Novo Pedido (Tela 7):
● Permitir adicionar um ou mais produtos a um pedido.
● Vincular o cliente ao pedido
● Para cada produto, escolher a quantidade a ser adicionada ao pedido.
3. Tela de Exclusão de Pedido (Tela 8):
● Modal ou Sweetalert para confirmar a exclusão do pedido.

Para rodar a aplicação usando Docker, você pode seguir estas instruções:

Configuração inicial
Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

Passos para configurar e rodar a aplicação
Clone o repositório

bash
Copiar código
git clone https://github.com/schebuk/teste_excellent
cd teste_excellent
Configuração das variáveis de ambiente

Construa e inicie os containers Docker

bash
Copiar código
docker-compose up -d --build

Após configurar e instalar tudo, a aplicação deve estar pronta para ser acessada. Verifique os logs do Docker Compose para garantir que não houve erros durante a inicialização dos containers.

Acessando a aplicação
Depois de concluídos os passos acima, você pode acessar a aplicação através do navegador web:

Frontend: http://localhost:3000 (ou outra porta conforme configurado)
Backend (API): http://localhost:8000 (ou outra porta conforme configurado)
Encerrando a execução
Para parar e remover os containers Docker, você pode usar:

bash
Copiar código
docker-compose down
Este README fornece uma base inicial. Personalize conforme necessário para detalhes específicos do seu projeto ou ambiente.