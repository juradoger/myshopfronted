import React, { useEffect, useState } from 'react';
import Insertar from './insertarproducto';
import { useParams } from 'react-router-dom';
import productosService from '../../services/productos-service';

const Actualizarproducto = () => {
  const params = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const productId = params?.id;

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await productosService.getById(productId);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar el producto:', error);
        setLoading(false);
      }
    };

    getProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <p>Cargando producto...</p>
      </div>
    );
  }

  return <Insertar initialData={product} />;
};

export default Actualizarproducto;
