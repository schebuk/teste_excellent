import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Grid, CircularProgress } from '@mui/material';
import InputMask from 'react-input-mask';
import api from '../services/api';

const CadastroClienteForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [razaoSocial, setRazaoSocial] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            fetchCliente();
        }
    }, [id]);

    const fetchCliente = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/clientes/${id}`);
            const { razao_social, cnpj, email } = response.data;
            setRazaoSocial(razao_social);
            setCnpj(cnpj);
            setEmail(email);
            setError('');
        } catch (error) {
            console.error('Erro ao buscar cliente:', error);
            setError('Erro ao buscar cliente.');
        } finally {
            setLoading(false);
        }
    };

    const handleCnpjChange = async (e) => {
        const cnpjValue = e.target.value.replace(/\D/g, '');
        setCnpj(cnpjValue);

        if (cnpjValue.length === 14) {
            try {
                setLoading(true);
                const response = await api.get(`/cnpj/${cnpjValue}`);
                const { nome, email } = response.data;
                setRazaoSocial(nome);
                setEmail(email);
                setError('');
            } catch (error) {
                console.error('Erro ao buscar dados do CNPJ:', error);
                setError('Erro ao buscar dados do CNPJ.');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (id) {
                await api.put(`/clientes/${id}`, {
                    razao_social: razaoSocial,
                    cnpj,
                    email
                });
                console.log('Cliente atualizado com sucesso!');
            } else {
                const response = await api.post('/clientes', {
                    razao_social: razaoSocial,
                    cnpj,
                    email
                });
                console.log('Cliente cadastrado:', response.data);
            }
            navigate('/clientes');
        } catch (error) {
            console.error('Erro ao salvar cliente:', error);
            setError('Erro ao salvar cliente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                {id ? 'Editar Cliente' : 'Cadastro de Cliente'}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InputMask
                            mask="99.999.999/9999-99"
                            value={cnpj}
                            onChange={handleCnpjChange}
                            disabled={loading}
                        >
                            {(inputProps) => (
                                <TextField
                                    {...inputProps}
                                    label="CNPJ"
                                    fullWidth
                                    error={!!error}
                                    helperText={error}
                                />
                            )}
                        </InputMask>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Razão Social"
                            fullWidth
                            value={razaoSocial}
                            onChange={(e) => setRazaoSocial(e.target.value)}
                            disabled={loading}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
        </Container>
    );
};

export default CadastroClienteForm;
