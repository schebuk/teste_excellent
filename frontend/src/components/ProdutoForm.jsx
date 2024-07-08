import React, { useState } from 'react';
import api from '../services/api';

function ProductForm() {
    const [formData, setFormData] = useState({
        description: '',
        price: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        // Aqui você precisa definir setFormData para atualizar imagens
        setFormData(prevState => ({
            ...prevState,
            imagens: e.target.files,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataApi = new FormData();
            formDataApi.append('descricao', formData.description);
            formDataApi.append('valor_venda', formData.price);
            formDataApi.append('estoque', formData.estoque);
            for (let i = 0; i < formData.imagens.length; i++) {
                formDataApi.append('imagens[]', formData.imagens[i]);
            }
            
            const response = await api.post('/produtos', formDataApi);
            console.log('Produto criado:', response.data);
        } catch (error) {
            console.error('Erro ao criar produto:', error);
        }
    };

    return (
        <div>
            <h2>Cadastro de Produto</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Descrição:
                    <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Preço:
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
                </label>
                <br />
                <input type="file" name="imagens" onChange={handleFileChange} multiple />
                <br />
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default ProductForm;
