import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@mui/material';

const ClientesList = () => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        try {
            setLoading(true);
            const response = await api.get('/clientes');
            setClientes(response.data);
        } catch (error) {
            console.error('Error fetching clientes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await api.delete(`/clientes/${id}`);
            setClientes(clientes.filter(cliente => cliente.id !== id));
        } catch (error) {
            console.error('Erro ao deletar cliente:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TableContainer component={Paper}>            
            <h2>Lista de Clientes</h2>
            <Button component={Link} to="/clientes/cadastrar" variant="contained" color="primary" style={{ marginTop: '20px', marginLeft: '20px' }}>
                Cadastrar Novo Cliente
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Razão Social</TableCell>
                        <TableCell>CNPJ</TableCell>
                        <TableCell>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                                <CircularProgress />
                            </TableCell>
                        </TableRow>
                    ) : clientes.map(cliente => (
                        <TableRow key={cliente.id}>
                            <TableCell>{cliente.razao_social}</TableCell>
                            <TableCell>{cliente.cnpj}</TableCell>
                            <TableCell>{cliente.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ClientesList;
