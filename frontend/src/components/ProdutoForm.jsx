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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/products', formData);
            console.log('Product created:', response.data);
        } catch (error) {
            console.error('Error creating product:', error);
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
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default ProductForm;
