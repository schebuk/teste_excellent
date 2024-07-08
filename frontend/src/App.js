import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ClientesList from './components/ClientesList';
import CadastroClienteForm from './components/CadastroClienteForm';
import ProdutosList from './components/ProdutosList';
import CadastroProdutoForm from './components/CadastroProdutoForm';
import PedidosList from './components/PedidosList';
import NovoPedidoForm from './components/NovoPedidoForm';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container maxWidth="lg">
          <Box my={4}>
            <nav>
              <Box mb={2}>
                <Button component={Link} to="/clientes" color="primary" variant="contained" style={{ marginRight: '10px' }}>
                  Clientes
                </Button>
                <Button component={Link} to="/produtos" color="primary" variant="contained" style={{ marginRight: '10px' }}>
                  Produtos
                </Button>
                <Button component={Link} to="/pedidos" color="primary" variant="contained">
                  Pedidos
                </Button>
              </Box>
            </nav>

            <Routes>
              <Route path="/clientes" element={<ClientesList />} />
              <Route path="/clientes/cadastrar" element={<CadastroClienteForm />} />
              <Route path="/clientes/editar/:id" element={<CadastroClienteForm />} />
              <Route path="/produtos" element={<ProdutosList />} />
              <Route path="/produtos/cadastrar" element={<CadastroProdutoForm />} />
              <Route path="/produtos/editar/:id" element={<CadastroProdutoForm />} />
              <Route path="/pedidos" element={<PedidosList />} />
              <Route path="/pedidos/novo" element={<NovoPedidoForm />} />
              <Route path="/pedidos/editar/:id" element={<NovoPedidoForm />} />
            </Routes>
          </Box>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
