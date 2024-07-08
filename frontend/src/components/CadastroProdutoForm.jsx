import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Typography, Container, CircularProgress } from '@material-ui/core';
import api from '../services/api';

const CadastroProdutoForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [produtoData, setProdutoData] = useState({
        descricao: '',
        valorVenda: '',
        estoque: '',
        imagens: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            fetchProduto();
        }
    }, [id]);

    const fetchProduto = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/produtos/${id}`);
            const { descricao, valor_venda, estoque, imagens } = response.data;
            setProdutoData({
                descricao,
                valorVenda: valor_venda,
                estoque,
                imagens: imagens || [],
            });
            setError('');
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            setError('Erro ao buscar produto.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProdutoData({
            ...produtoData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setProdutoData(prevState => ({
            ...prevState,
            imagens: files,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('descricao', produtoData.descricao);
            formData.append('valor_venda', produtoData.valorVenda);
            formData.append('estoque', produtoData.estoque);
            produtoData.imagens.forEach((imagem, index) => {
                formData.append(`imagens[${index}]`, imagem);
            });

            if (id) {
                formData.append('_method', 'PUT');
                await api.post(`/produtos/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Produto atualizado com sucesso!');
            } else {
                await api.post('/produtos', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Produto cadastrado com sucesso!');
            }
            navigate('/produtos');
        } catch (error) {
            console.error('Erro ao salvar produto:', error);
            setError('Erro ao salvar produto.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                {id ? 'Editar Produto' : 'Cadastro de Produto'}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Descrição"
                            fullWidth
                            name="descricao"
                            value={produtoData.descricao}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Valor de Venda"
                            fullWidth
                            name="valorVenda"
                            value={produtoData.valorVenda}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Estoque"
                            fullWidth
                            name="estoque"
                            value={produtoData.estoque}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            type="file"
                            name="imagens"
                            multiple
                            onChange={handleFileChange}
                            disabled={loading}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : (id ? 'Salvar' : 'Cadastrar')}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {error && <Typography color="error">{error}</Typography>}
        </Container>
    );
};

export default CadastroProdutoForm;
