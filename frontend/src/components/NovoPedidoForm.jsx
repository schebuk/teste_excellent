import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  FormControl,
  InputLabel,
  CircularProgress
} from '@material-ui/core';
import api from '../services/api';

const NovoPedidoForm = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    cliente_id: '',
    produtos: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientesResponse, produtosResponse] = await Promise.all([
          api.get('/clientes'),
          api.get('/produtos')
        ]);
        setClientes(clientesResponse.data);
        setProdutos(produtosResponse.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddProduto = () => {
    setFormData((prevData) => ({
      ...prevData,
      produtos: [...prevData.produtos, { produto_id: '', quantidade: 1 }]
    }));
  };

  const handleProdutoChange = (index, e) => {
    const { name, value } = e.target;
    const novosProdutos = [...formData.produtos];
    novosProdutos[index][name] = value;
    setFormData({
      ...formData,
      produtos: novosProdutos,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/pedidos', formData);
      console.log('Pedido criado com sucesso!');
      navigate('/pedidos');
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Novo Pedido
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Cliente</InputLabel>
          <Select
            name="cliente_id"
            value={formData.cliente_id}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>Selecione um cliente</em>
            </MenuItem>
            {clientes.map((cliente) => (
              <MenuItem key={cliente.id} value={cliente.id}>
                {cliente.razao_social}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {formData.produtos.map((produto, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Produto</InputLabel>
                <Select
                  name="produto_id"
                  value={produto.produto_id}
                  onChange={(e) => handleProdutoChange(index, e)}
                >
                  <MenuItem value="">
                    <em>Selecione um produto</em>
                  </MenuItem>
                  {produtos.map((produto) => (
                    <MenuItem key={produto.id} value={produto.id}>
                      {produto.descricao}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Quantidade"
                type="number"
                name="quantidade"
                fullWidth
                value={produto.quantidade}
                onChange={(e) => handleProdutoChange(index, e)}
                margin="normal"
              />
            </Grid>
          </Grid>
        ))}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddProduto}
          fullWidth
          style={{ marginTop: '16px' }}
        >
          Adicionar Produto
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '16px' }}
        >
          Salvar Pedido
        </Button>
      </form>
      <Button
        component={Link}
        to="/pedidos"
        variant="outlined"
        color="default"
        fullWidth
        style={{ marginTop: '16px' }}
      >
        Voltar para Lista de Pedidos
      </Button>
    </Container>
  );
};

export default NovoPedidoForm;
