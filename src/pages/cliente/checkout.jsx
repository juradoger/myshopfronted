import { useState, useEffect, useRef } from 'react';
import { fetchClothingProducts } from '../../services/api';
import { useAppStore } from '../../store/app-store';
import pedidosService from '../../services/pedidos-service';
import pagosService from '../../services/pagos-service';

export default function Checkout() {
  const [subtotal, setSubtotal] = useState(0);
  const [currentStep, setCurrentStep] = useState(1); // 1: Información, 2: Compra, 3: Pago
  const { setIsCartOpen, carrito, userAuth } = useAppStore();
  const [total, setTotal] = useState(
    carrito.reduce((total, item) => total + item.price * item.quantity, 0)
  );
  const [formData, setFormData] = useState({
    email: userAuth.email || '',
    address: userAuth.direccion || '',
    shippingMethod: {
      0: 'Tarjeta de credito',
      1: 'Tarjeta de debito',
      2: 'Transferencia',
    },
    shippingPrice: carrito.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
    shippingDays: '28 to 34 business days',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    securityCode: '',
    country: '',
    department: '',
    city: '',
    postalCode: '',
  });
  const [message, setMessage] = useState(false);
  const receiptCanvasRef = useRef(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchClothingProducts();
        // Solo tomamos los primeros 2 productos para el carrito como se muestra en la imagen
        const cartProducts = data.slice(0, 2);
        setProducts(cartProducts);

        // Calcular subtotal
        const subtotalValue = cartProducts.reduce(
          (sum, product) => sum + product.price,
          0
        );
        setSubtotal(subtotalValue);
        setTotal(subtotalValue);
      } catch (error) {
        console.error('Error cargando productos:', error);
      }
    };

    loadProducts();
  }, []);
  const handleClick = async () => {
    setMessage(true);

    const pedidoId = await pedidosService.create({
      cantidad: formData.shippingPrice,
      descripcion: 'Compra de productos',
      direccion: {
        country: formData.country,
        department: formData.department,
        city: formData.city,
        postalCode: formData.postalCode,
      },
      estado: 'Pendiente',
      fecha: new Date(),
      idUsuario: userAuth.id,
      productos: carrito.map((product) => product.id),
      tipo_venta: formData.shippingMethod,
      total,
    });
    console.log('🚀 ~ handleClick ~ pedido:', pedidoId);

    await pagosService.create({
      idPedido: pedidoId,
      idUsuario: userAuth.id,
      metodo: formData.shippingMethod,
      total: total,
    });

    console.log(formData);
  };
  const handleContinueToShipping = () => {
    setCurrentStep(2);
  };

  const handleContinueToPayment = () => {
    setCurrentStep(3);
    // Actualizar formData con datos de envío seleccionados
    setFormData({
      ...formData,
      shippingMethodSelected: formData.shippingMethod,
      shippingPriceSelected: formData.shippingPrice,
      shippingDaysSelected: formData.shippingDays,
    });
  };

  const handleBackToInformation = () => {
    setCurrentStep(1);
  };

  const handleBackToShipping = () => {
    setCurrentStep(2);
  };

  const handleShippingMethodChange = (method, price, days) => {
    setFormData({
      ...formData,
      shippingMethod: method,
      shippingPrice: price,
      shippingDays: days,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const generateReceipt = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');

    // Configurar el fondo
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Estilo para el texto
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('COMPROBANTE DE COMPRA', 250, 50);

    // Fecha y hora actual
    const now = new Date();
    ctx.font = '16px Arial';
    ctx.fillText(`Fecha: ${now.toLocaleDateString()}`, 50, 90);
    ctx.fillText(`Hora: ${now.toLocaleTimeString()}`, 50, 120);

    // Línea separadora
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(50, 140);
    ctx.lineTo(750, 140);
    ctx.stroke();

    // Información del cliente
    ctx.font = 'bold 20px Arial';
    ctx.fillText('Información de Cliente', 50, 180);
    ctx.font = '16px Arial';
    ctx.fillText(`Email: ${formData.email}`, 50, 210);
    ctx.fillText(`Dirección: ${formData.address}`, 50, 240);

    // Información de envío
    ctx.font = 'bold 20px Arial';
    ctx.fillText('Información de Envío', 50, 290);
    ctx.font = '16px Arial';
    ctx.fillText(`Método: ${formData.shippingMethod}`, 50, 320);
    ctx.fillText(`Tiempo de entrega: ${formData.shippingDays}`, 50, 350);
    ctx.fillText(
      `Costo de envío: Bs. ${formData.shippingPrice.toFixed(2)}`,
      50,
      380
    );

    // Información de pago
    ctx.font = 'bold 20px Arial';
    ctx.fillText('Información de Pago', 50, 430);
    ctx.font = '16px Arial';
    // Ocultar parte del número de tarjeta por seguridad
    const cardLastFour = formData.cardNumber
      .slice(-4)
      .padStart(formData.cardNumber.length, '*');
    ctx.fillText(`Tarjeta: ${cardLastFour}`, 50, 460);
    ctx.fillText(`Titular: ${formData.cardHolder}`, 50, 490);

    // Línea separadora
    ctx.beginPath();
    ctx.moveTo(50, 520);
    ctx.lineTo(750, 520);
    ctx.stroke();

    // Productos
    ctx.font = 'bold 20px Arial';
    ctx.fillText('Productos', 50, 560);

    let yPos = 590;
    carrito.forEach((product, index) => {
      ctx.font = '16px Arial';
      ctx.fillText(`${index + 1}. ${product.name}`, 50, yPos);
      ctx.fillText(`Bs. ${product.price.toFixed(2)}`, 650, yPos);
      yPos += 30;
    });

    // Línea separadora
    ctx.beginPath();
    ctx.moveTo(50, yPos + 10);
    ctx.lineTo(750, yPos + 10);
    ctx.stroke();

    // Totales
    yPos += 50;
    ctx.font = '16px Arial';
    ctx.fillText('Subtotal:', 550, yPos);
    ctx.fillText(`Bs. ${subtotal.toFixed(2)}`, 650, yPos);

    yPos += 30;
    ctx.fillText('Envío:', 550, yPos);
    ctx.fillText(`Bs. ${formData.shippingPrice.toFixed(2)}`, 650, yPos);

    yPos += 30;
    ctx.font = 'bold 18px Arial';
    ctx.fillText('Total:', 550, yPos);
    const finalTotal = subtotal + formData.shippingPrice;
    ctx.fillText(`Bs. ${finalTotal.toFixed(2)} USD`, 650, yPos);

    // Información de la tienda
    yPos += 70;
    ctx.font = '16px Arial';
    ctx.fillText('Gracias por su compra', 330, yPos);

    yPos += 30;
    ctx.font = '14px Arial';
    ctx.fillText(
      'Si tiene alguna pregunta, contáctenos a myshop@tienda.com',
      250,
      yPos
    );

    // Convertir el canvas a una imagen descargable
    const dataUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = dataUrl;
    downloadLink.download = `comprobante-${now.getTime()}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Renderiza el paso de información (primer paso)
  const renderInformationStep = () => {
    return (
      <>
        <div className='flex border-b mb-8'>
          <div className='mr-8 pb-2 border-b-2 border-black font-medium'>
            Información
          </div>
          <div className='mr-8 pb-2 text-gray-400'>Método de pago</div>
          <div className='pb-2 text-gray-400'>Pago</div>
        </div>

        <div className='mb-8'>
          <h2 className='text-sm uppercase tracking-wide mb-4 font-medium'>
            INFORMACIÓN DE CONTACTO
          </h2>
          <div className='mb-4'>
            <input
              type='text'
              placeholder='Correo'
              className='w-full border p-3 rounded'
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className='mb-4'>
            <input
              type='text'
              placeholder='Dirección'
              className='w-full border p-3 rounded'
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>
        </div>

        <div className='mb-8'>
          <h2 className='text-sm uppercase tracking-wide mb-4 font-medium'>
            DIRECCIÓN DE ENVÍO
          </h2>
          <div className='mb-4'>
            <input
              type='text'
              placeholder='País'
              className='w-full border p-3 rounded'
              value={formData.country || ''}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
            />
          </div>
          <div className='mb-4'>
            <input
              type='text'
              placeholder='Departamento'
              className='w-full border p-3 rounded'
              value={formData.department || ''}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
            />
          </div>
          <div className='mb-4'>
            <input
              type='text'
              placeholder='Ciudad'
              className='w-full border p-3 rounded'
              value={formData.city || ''}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            <input
              type='text'
              placeholder='Código Postal'
              className='border p-3 rounded'
              value={formData.postalCode || ''}
              onChange={(e) =>
                setFormData({ ...formData, postalCode: e.target.value })
              }
            />
          </div>
        </div>

        {/* Botones de navegación */}
        <div className='flex justify-between items-center'>
          <a
            href='#'
            className='text-sm flex items-center text-gray-600'
            onClick={() => setIsCartOpen(true)}
          >
            <svg
              className='w-4 h-4 mr-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
            REGRESAR AL CARRITO
          </a>
          <button
            className='bg-black text-white px-6 py-3 uppercase text-sm font-medium rounded-sm'
            onClick={handleContinueToShipping}
          >
            CONTINUAR CON LA COMPRA
          </button>
        </div>
      </>
    );
  };

  // Renderiza el paso de envío (segundo paso)
  const renderShippingStep = () => {
    return (
      <>
        {/* Tabs de navegación */}
        <div className='flex border-b mb-8'>
          <div className='mr-8 pb-2 text-gray-400'>Información</div>
          <div className='mr-8 pb-2 border-b-2 border-black font-medium'>
            Método de pago
          </div>
          <div className='pb-2 text-gray-400'>Pago</div>
        </div>
        {/* Método de pago */}
        <div className='mb-8'>
          <h2 className='text-sm uppercase tracking-wide mb-4 font-medium'>
            MÉTODO DE PAGO
          </h2>

          <div className='border-b pb-3 mb-3'>
            <label className='flex items-center justify-between py-3 cursor-pointer'>
              <div className='flex items-center'>
                <input
                  type='radio'
                  name='shipping'
                  className='mr-3 cursor-pointer'
                  checked={formData.shippingMethod === 'Tarjeta de credito'}
                  onChange={() =>
                    handleShippingMethodChange('Tarjeta de credito')
                  }
                />
                <span>Tarjeta de credito</span>
              </div>
            </label>
          </div>
          <div className='border-b pb-3 mb-3'>
            <label className='flex items-center justify-between py-3'>
              <div className='flex items-center'>
                <input
                  type='radio'
                  name='shipping'
                  className='mr-3 cursor-pointer'
                  checked={formData.shippingMethod === 'Tarjeta de debito'}
                  onChange={() =>
                    handleShippingMethodChange('Tarjeta de debito')
                  }
                />
                <span>Tarjeta de debito</span>
              </div>
            </label>
          </div>
          <div className='border-b pb-3 mb-3'>
            <label className='flex items-center justify-between py-3'>
              <div className='flex items-center'>
                <input
                  type='radio'
                  name='shipping'
                  className='mr-3 cursor-pointer'
                  checked={formData.shippingMethod === 'Transferencia'}
                  onChange={() => handleShippingMethodChange('Transferencia')}
                />
                <span>Transferencia</span>
              </div>
            </label>
          </div>
        </div>

        {/* Botones de navegación */}
        <div className='flex justify-between items-center'>
          <button
            className='text-sm flex items-center text-gray-600'
            onClick={handleBackToInformation}
          >
            <svg
              className='w-4 h-4 mr-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
            REGRESAR A INFORMACIÓN
          </button>
          <button
            className='bg-black text-white px-6 py-3 uppercase text-sm font-medium rounded-sm'
            onClick={handleContinueToPayment}
          >
            CONTINUAR CON EL PAGO
          </button>
        </div>
      </>
    );
  };

  // Renderiza el paso de pago (tercer paso)
  const renderPaymentStep = () => {
    return (
      <>
        {/* Tabs de navegación */}
        <div className='flex border-b mb-8'>
          <div className='mr-8 pb-2 text-gray-400'>Información</div>
          <div className='mr-8 pb-2 text-gray-400'>Método de pago</div>
          <div className='pb-2 border-b-2 border-black font-medium'>Pago</div>
        </div>

        {/* Método de pago */}
        <div className='mb-8'>
          <h2 className='text-sm uppercase tracking-wide mb-4 font-medium'>
            MÉTODO DE PAGO
          </h2>

          <div className='mb-6'>
            <div className='flex justify-between items-center border p-3 rounded mb-4 bg-gray-100'>
              <span className='font-medium'>{formData.shippingMethod}</span>
              <div className='bg-yellow-400 rounded-full w-6 h-6 flex items-center justify-center'>
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
              </div>
            </div>

            <div className='mb-4 relative'>
              <input
                type='text'
                name='cardNumber'
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder='Número de tarjeta'
                className='w-full border p-3 rounded pr-10'
              />
              <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                <svg
                  className='w-5 h-5 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
            </div>

            <div className='mb-4'>
              <input
                type='text'
                name='cardHolder'
                value={formData.cardHolder}
                onChange={handleInputChange}
                placeholder='Titular'
                className='w-full border p-3 rounded'
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <input
                  type='text'
                  name='expiryDate'
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder='Fecha de expiración (MM / YY)'
                  className='w-full border p-3 rounded'
                />
              </div>
              <div className='relative'>
                <input
                  type='text'
                  name='securityCode'
                  value={formData.securityCode}
                  onChange={handleInputChange}
                  placeholder='Código de seguridad'
                  className='w-full border p-3 rounded pr-10'
                />
                <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                  <svg
                    className='w-5 h-5 text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Botones de navegación */}
        <div className='flex justify-between items-center'>
          <button
            className='text-sm flex items-center text-gray-600'
            onClick={handleBackToShipping}
          >
            <svg
              className='w-4 h-4 mr-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
            REGRESAR A COMPRAS
          </button>
          <div className='flex flex-col space-y-2'>
            {!message ? (
              <button
                onClick={handleClick}
                className='bg-black text-white px-6 py-3 uppercase text-sm font-medium rounded-sm'
              >
                ACEPTAR
              </button>
            ) : (
              <div className='mt-6 p-4 bg-green-100 text-green-800 border border-green-300 rounded-md text-center'>
                ¡Gracias por su compra! Su pago fue procesado con éxito.
              </div>
            )}
            <button
              className='bg-black text-white px-6 py-3 uppercase text-sm font-medium rounded-sm'
              onClick={generateReceipt}
            >
              GENERAR COMPROBANTE
            </button>
          </div>
        </div>
      </>
    );
  };

  // Renderiza el contenido según el paso actual
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderInformationStep();
      case 2:
        return renderShippingStep();
      case 3:
        return renderPaymentStep();
      default:
        return renderInformationStep();
    }
  };

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Columna izquierda - Formulario */}
        <div className='w-full lg:w-3/5'>{renderStepContent()}</div>

        {/* Columna derecha - Resumen de compra */}
        <div className='w-full lg:w-2/5 bg-white'>
          {/* Productos en el carrito */}
          <div className='border-b pb-6 mb-6'>
            {carrito.map((product, index) => (
              <div
                key={product.id}
                className='flex items-center justify-between py-4'
              >
                <div className='flex items-center'>
                  <div className='relative mr-4'>
                    <img
                      src={product.images[0] || '/placeholder.svg'}
                      alt={product.name}
                      className='w-16 h-16 object-cover rounded'
                    />
                    <div className='absolute -top-2 -right-2 bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center text-xs'>
                      {product.quantity}
                    </div>
                  </div>
                  <div>
                    <p className='text-sm'>{product.name}</p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='text-sm'>
                    Bs. {Number(product.price).toFixed(2)} u.
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Resumen de costos */}
          <div className='border-b pb-6 mb-6'>
            {carrito.map((product, index) => (
              <div key={index} className='flex justify-between mb-4'>
                <p>
                  {product.name} x {product.quantity}
                </p>
                <p>Bs. {(product.price * product.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className='flex justify-between items-center'>
            <p className='font-medium'>Total</p>
            <p className='text-xl font-bold'>Bs. {total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
