import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown, ChevronRight, CircleUser } from 'lucide-react';

export default function Dashboard() {
  const [chartView, setChartView] = useState('MENSUAL');

  const chartData = [
    { name: 'JUL', value: 50 },
    { name: 'AGO', value: 80 },
    { name: 'SEP', value: 90 },
    { name: 'OCT', value: 85 },
    { name: 'NOV', value: 180 },
    { name: 'DIC', value: 320 },
  ];


  const recentOrders = [
    { id: '#25426', fecha: 'Nov 8th, 2023', cliente: 'Kevin', estado: 'Entregado', cantidad: 'Bs. 200.00', producto: 'Lorem ipsum' },
    { id: '#25425', fecha: 'Nov 7th, 2023', cliente: 'Romad', estado: 'Cancelado', cantidad: 'Bs. 200.00', producto: 'Lorem ipsum' },
    { id: '#25424', fecha: 'Nov 6th, 2023', cliente: 'Ridhi', estado: 'Entregado', cantidad: 'Bs. 200.00', producto: 'Lorem ipsum' },
    { id: '#25423', fecha: 'Nov 5th, 2023', cliente: 'Shivam', estado: 'Cancelado', cantidad: 'Bs. 200.00', producto: 'Lorem ipsum' },
    { id: '#25422', fecha: 'Nov 4th, 2023', cliente: 'Shadab', estado: 'Entregado', cantidad: 'Bs. 200.00', producto: 'Lorem ipsum' },
    { id: '#25421', fecha: 'Nov 2nd, 2023', cliente: 'Yogesh', estado: 'Entregado', cantidad: 'Bs. 200.00', producto: 'Lorem ipsum' },
  ];

  // Top productos
  const topProducts = [
    { nombre: 'Lorem ipsum', ventas: '999 sales', precio: 'Bs. 124.50' },
    { nombre: 'Lorem ipsum', ventas: '999 sales', precio: 'Bs. 124.50' },
    { nombre: 'Lorem ipsum', ventas: '999 sales', precio: 'Bs. 124.50' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">PANEL</h1>
            <p className="flex text-start text-sm text-gray-500">Inicio <ChevronRight size={14} className=" flex-wrap mx-2 my-1 text-gray-400" />Panel de control</p>
          </div>
          <div className="text-sm text-gray-500 flex items-center justify-between">
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-1'
            >
              <rect
                x='3'
                y='4'
                width='18'
                height='18'
                rx='2'
                ry='2'
              ></rect>
              <line x1='16' y1='2' x2='16' y2='6'></line>
              <line x1='8' y1='2' x2='8' y2='6'></line>
              <line x1='3' y1='10' x2='21' y2='10'></line>
            </svg>
            Oct 11, 2024 - Nov 11, 2024
          </div>
        </div>
      </div>


      <div className="container mx-auto p-4 space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Órdenes totales" value="Bs. 124,500" percentage="34.7%" />
          <StatCard title="Órdenes activas" value="Bs. 124,500" percentage="34.7%" />
          <StatCard title="Pedidos completados" value="Bs. 124,500" percentage="34.7%" />
          <StatCard title="Órdenes de devolución" value="Bs. 124,500" percentage="34.7%" />
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Gráfico de venta</h2>
              <div className="flex bg-gray-100 rounded-md">
                <ChartButton
                  label="SEMANALMENTE"
                  active={chartView === 'SEMANALMENTE'}
                  onClick={() => setChartView('SEMANALMENTE')}
                />
                <ChartButton
                  label="MENSUAL"
                  active={chartView === 'MENSUAL'}
                  onClick={() => setChartView('MENSUAL')}
                />
                <ChartButton
                  label="ANUAL"
                  active={chartView === 'ANUAL'}
                  onClick={() => setChartView('ANUAL')}
                />
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `₹${value}`} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>


          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Los más vendidos</h2>
            </div>
            <div className="space-y-4">
              {topProducts.map((product, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="h-12 w-12 bg-gray-200 rounded-md mr-3"></div>
                  <div className="flex-grow">
                    <p className="font-medium">{product.nombre}</p>
                    <p className="text-sm text-gray-500">{product.ventas}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{product.precio}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button className="bg-black text-white py-2 px-4 rounded w-full">
                REPORTE
              </button>
            </div>
          </div>
        </div>


        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Pedidos recientes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Producto</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Fecha</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Cliente</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Estado</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Cantidad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 text-sm">{order.producto}</td>
                    <td className="px-4 py-2 text-sm">{order.id}</td>
                    <td className="px-4 py-2 text-sm">{order.fecha}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center">
                        <CircleUser size={20} className="mr-2 text-gray-600" />
                        <span className="text-sm">{order.cliente}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${order.estado === 'Entregado' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                        <span className={`w-2 h-2 rounded-full mr-1 ${order.estado === 'Entregado' ? 'bg-blue-600' : 'bg-orange-600'
                          }`}></span>
                        {order.estado}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm">{order.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}


function StatCard({ title, value, percentage }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      </div>
      <div className="mt-2 flex items-baseline">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-lg mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-bold">{value}</p>
            <div className="flex items-center text-xs">
              <span className="text-green-600 font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                {percentage}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function ChartButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-xs ${active ? 'bg-black text-white' : 'text-gray-700'
        } rounded-md`}
    >
      {label}
    </button>
  );
}