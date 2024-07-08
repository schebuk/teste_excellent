import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

const ProdutosList = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [produtoIdToDelete, setProdutoIdToDelete] = useState(null);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await api.get('/produtos');
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/produtos/${produtoIdToDelete}`);
      setProdutos(produtos.filter((produto) => produto.id !== produtoIdToDelete));
      console.log('Produto excluído com sucesso!');
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  const openDeleteModal = (id) => {
    setProdutoIdToDelete(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <TableContainer component={Paper}>
      <h2>Lista de Produtos</h2>
      <Button component={Link} to="/produtos/cadastrar" variant="contained" color="primary" style={{ marginBottom: '20px' }}>
        Cadastrar Novo Produto
      </Button>
      {loading ? (
        <CircularProgress />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Valor de Venda</TableCell>
              <TableCell>Estoque</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((produto) => (
              <TableRow key={produto.id}>
                <TableCell>{produto.id}</TableCell>
                <TableCell>{produto.descricao}</TableCell>
                <TableCell>{produto.valor_venda}</TableCell>
                <TableCell>{produto.estoque}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/produtos/editar/${produto.id}`} variant="contained" color="primary" size="small" style={{ marginRight: '10px' }}>
                    Editar
                  </Button>
                  <Button onClick={() => openDeleteModal(produto.id)} variant="contained" color="secondary" size="small">
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmação de Exclusão</DialogTitle>
        <DialogContent>
          Tem certeza que deseja excluir este produto?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default ProdutosList;
