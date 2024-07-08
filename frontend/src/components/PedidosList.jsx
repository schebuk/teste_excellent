import React, { useState, useEffect } from 'react';
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

const PedidosList = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [pedidoIdToDelete, setPedidoIdToDelete] = useState(null);

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const response = await api.get('/pedidos');
      setPedidos(response.data);
    } catch (error) {
      console.error('Error fetching pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/pedidos/${pedidoIdToDelete}`);
      setPedidos(pedidos.filter((pedido) => pedido.id !== pedidoIdToDelete));
      console.log('Pedido excluído com sucesso!');
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao deletar pedido:', error);
    }
  };

  const openDeleteModal = (id) => {
    setPedidoIdToDelete(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <TableContainer component={Paper}>
      <h2>Lista de Pedidos</h2>
      <Button component={Link} to="/pedidos/novo" variant="contained" color="primary" style={{ marginBottom: '20px' }}>
        Novo Pedido
      </Button>
      {loading ? (
        <CircularProgress />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pedidos.map((pedido) => (
              <TableRow key={pedido.id}>
                <TableCell>{pedido.id}</TableCell>
                <TableCell>{pedido.cliente?.razao_social || 'N/A'}</TableCell>
                <TableCell>
                  <Button onClick={() => openDeleteModal(pedido.id)} variant="contained" color="secondary" size="small">
                    Deletar
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
          Tem certeza que deseja excluir este pedido?
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

export default PedidosList;
