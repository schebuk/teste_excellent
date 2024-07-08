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
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

const ProdutosList = () => {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [produtoParaExcluir, setProdutoParaExcluir] = useState(null);

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

    const openModal = (produto) => {
        setProdutoParaExcluir(produto);
        setOpen(true);
    };

    const closeModal = () => {
        setProdutoParaExcluir(null);
        setOpen(false);
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/produtos/${produtoParaExcluir.id}`);
            setProdutos(produtos.filter((produto) => produto.id !== produtoParaExcluir.id));
            console.log('Produto excluído com sucesso!');
            closeModal();
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Typography variant="h5" gutterBottom style={{ padding: '10px' }}>
                Lista de Produtos
            </Typography>
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
                            <TableCell>Imagens</TableCell>
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
                                    {produto.imagens && produto.imagens.length > 0 ? (
                                        produto.imagens.map((imagem, index) => (
                                            <img
                                                key={index}                                                
                                                src={`http://localhost:8000/storage/${imagem}`}
                                                alt={`Imagem ${index}`}
                                                style={{ width: '100px', height: 'auto', marginRight: '5px' }}
                                            />
                                        ))
                                    ) : (
                                        <Typography variant="body2" color="textSecondary">
                                            Nenhuma imagem disponível
                                        </Typography>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Button component={Link} to={`/produtos/editar/${produto.id}`} variant="contained" color="primary" size="small" style={{ marginRight: '10px' }}>
                                        Editar
                                    </Button>
                                    <Button onClick={() => openModal(produto)} variant="contained" color="secondary" size="small">
                                        Excluir
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            {/* Modal de Confirmação */}
            <Dialog open={open} onClose={closeModal}>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Tem certeza que deseja excluir o produto "{produtoParaExcluir ? produtoParaExcluir.descricao : ''}"?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    );
};

export default ProdutosList;
