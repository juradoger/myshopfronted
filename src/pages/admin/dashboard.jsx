import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChevronRight, CircleUser } from 'lucide-react';
import pedidosService from '../../services/pedidos-service';
import userService from '../../services/user-service';
import productosService from '../../services/productos-service';

export default function Dashboard() {
  const [pedidos, setPedidos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [chartView, setChartView] = useState('MENSUAL');

  const [topProducts, setTopProducts] = useState([]);

  const chartData = [
    { name: 'JUL', value: 50 },
    { name: 'AGO', value: 80 },
    { name: 'SEP', value: 90 },
    { name: 'OCT', value: 85 },
    { name: 'NOV', value: 180 },
    { name: 'DIC', value: 320 },
  ];
  const [stats, setStats] = useState({
    pagoAlto: 0,
    clienteTop: '',
    completados: 0,
    pendientes: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const pedidosData = await pedidosService.getAll();

      const usuariosData = await userService.getAll();
      console.log('🚀 ~ fetchData ~ usuariosData:', usuariosData);
      setPedidos(pedidosData);
      setUsuarios(usuariosData);

      // Pago alto (mayor total)
      let pagoAlto = Math.max(...pedidosData.map((p) => p.total || 0));

      // Cliente top (más pedidos)
      const conteo = {};
      pedidosData.forEach((p) => {
        if (p.idUsuario) {
          conteo[p.idUsuario] = (conteo[p.idUsuario] || 0) + 1;
        }
      });

      const topUserId = Object.keys(conteo).reduce(
        (a, b) => (conteo[a] > conteo[b] ? a : b),
        null
      );
      const clienteTop =
        usuariosData.find((u) => u.id === topUserId)?.nombre || 'Sin datos';

      // Completados y pendientes
      const completados = pedidosData.filter(
        (p) => p.estado === 'Entregado'
      ).length;
      const pendientes = pedidosData.filter(
        (p) => p.estado === 'Pendiente'
      ).length;

      setStats({
        pagoAlto,
        clienteTop,
        completados,
        pendientes,
      });
    };

    const fetchTopProducts = async () => {
      const productos = await productosService.getAll();
      const top = productos.slice(0, 3).map((p) => ({
        nombre: p.name,
        ventas: `${Math.floor(Math.random() * 10)} ventas`,
        precio: `Bs. ${p.price}`,
      }));
      setTopProducts(top);
    };

    fetchTopProducts();
    fetchData();
  }, []);

  const clientes = usuarios.filter((u) => u.rol === 'CLIENTE');

  return (
    <div className='container mx-auto p-4 space-y-4'>
      {/* Stat Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <StatCard
          title='Pago alto'
          value={`Bs. ${stats.pagoAlto.toFixed(2)}`}
          percentage=''
        />
        <StatCard title='Cliente top' value={stats.clienteTop} />
        <StatCard title='Completados' value={stats.completados} percentage='' />
        <StatCard title='Pendientes' value={stats.pendientes} percentage='' />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <div className='lg:col-span-2 bg-white rounded-lg shadow p-4'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-lg font-semibold'>Gráfico de venta</h2>
            <div className='flex bg-gray-100 rounded-md'>
              <ChartButton
                label='SEMANALMENTE'
                active={chartView === 'SEMANALMENTE'}
                onClick={() => setChartView('SEMANALMENTE')}
              />
              <ChartButton
                label='MENSUAL'
                active={chartView === 'MENSUAL'}
                onClick={() => setChartView('MENSUAL')}
              />
              <ChartButton
                label='ANUAL'
                active={chartView === 'ANUAL'}
                onClick={() => setChartView('ANUAL')}
              />
            </div>
          </div>
          <div className='h-64'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray='3 3' vertical={false} />
                <XAxis dataKey='name' />
                <YAxis tickFormatter={(value) => `Bs. ${value}`} />
                <Tooltip />
                <Line
                  type='monotone'
                  dataKey='value'
                  stroke='#3b82f6'
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow p-4'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-lg font-semibold'>Los más vendidos</h2>
          </div>
          <div className='space-y-4'>
            {topProducts.map((product, idx) => (
              <div key={idx} className='flex items-center'>
                <div className='h-12 w-12 bg-gray-200 rounded-md mr-3'></div>
                <div className='flex-grow'>
                  <p className='font-medium'>{product.nombre}</p>
                  <p className='text-sm text-gray-500'>{product.ventas}</p>
                </div>
                <div className='text-right'>
                  <p className='font-medium'>{product.precio}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='mt-4'>
            <button className='bg-black text-white py-2 px-4 rounded w-full'>
              REPORTE
            </button>
          </div>
        </div>
      </div>

      {/* Tabla: Usuarios */}
      <div className='bg-white rounded-lg shadow p-4'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold'>Usuarios</h2>
        </div>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead>
              <tr>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-500'>
                  Nombre
                </th>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-500'>
                  Correo
                </th>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-500'>
                  Dirección
                </th>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-500'>
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {clientes.map((user) => (
                <tr key={user.id}>
                  <td className='px-4 py-2 flex items-center text-sm'>
                    <CircleUser className='mr-2 text-gray-600' />
                    {user.nombre}
                  </td>
                  <td className='px-4 py-2 text-sm'>{user.email}</td>
                  <td className='px-4 py-2 text-sm'>{user.direccion}</td>
                  <td className='px-4 py-2 text-sm capitalize'>
                    {user.estado}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Componente stat card
function StatCard({ title, value, percentage }) {
  return (
    <div className='bg-white rounded-lg shadow p-4'>
      <h3 className='text-sm font-medium text-gray-500'>{title}</h3>
      <p className='text-lg font-bold'>{value}</p>
      {percentage && (
        <div className='text-xs text-green-600 mt-1'>{percentage}</div>
      )}
    </div>
  );
}

function ChartButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-xs ${
        active ? 'bg-black text-white' : 'text-gray-700'
      } rounded-md`}
    >
      {label}
    </button>
  );
}
