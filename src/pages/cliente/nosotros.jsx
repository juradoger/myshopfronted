import { useState } from 'react';
import perfil from '../../assets/img/perfil.jpeg';
import foto from '../../assets/img/foto.jpeg';
import foto1 from '../../assets/img/foto1.jpeg';
import foto2 from '../../assets/img/ma.png';
import foto3 from '../../assets/img/lis.jpeg';
import foto4 from '../../assets/img/carlos.jpg';
import foto5 from '../../assets/img/tarija.jpeg';
export default function Nosotros() {
  const [activeTab, setActiveTab] = useState('story');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold italic text-gray-900 mb-4">Sobre nosotros</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto italic">
          Conoce la historia detrás de nuestra tienda y lo que dicen quienes la han vivido
        </p>
      </header>
      
      {/* Navigation Tabs */}
      <nav className="flex justify-center mb-12">
        <div className="inline-flex rounded-md shadow-sm" role="tablist">
          <button 
            type="button" 
            role="tab"
            aria-selected={activeTab === 'story'}
            className={`px-6 py-3 text-sm font-medium border ${activeTab === 'story' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'} rounded-l-lg focus:z-10 focus:outline-none`}
            onClick={() => setActiveTab('story')}
          >
            Nuestra Historia
          </button>
          <button 
            type="button"
            role="tab"
            aria-selected={activeTab === 'testimonials'}
            className={`px-6 py-3 text-sm font-medium border-t border-b border-r ${activeTab === 'testimonials' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'} rounded-r-lg focus:z-10 focus:outline-none`}
            onClick={() => setActiveTab('testimonials')}
          >
            Testimonios
          </button>
        </div>
      </nav>

      {/* Content Sections */}
      <main className="mb-16">
        {/* Historia de la Tienda */}
        {activeTab === 'story' && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold italic text-gray-900 mb-6">Nuestros Inicios</h2>
              <p className="text-gray-600 mb-4 italic">
              MyShop es un sitio web desarrollado por un grupo de estudiantes tarijeños con el objetivo de aplicar nuestros conocimientos en programación y ofrecer una experiencia de compra en línea sencilla y funcional. Este proyecto representa nuestro compromiso con el aprendizaje, la innovación y el desarrollo tecnológico, buscando conectar a los usuarios con productos de calidad a través de una plataforma accesible y confiable.
              </p>
              <p className="text-gray-600 italic">
                Cada prenda en nuestro catálogo ha sido cuidadosamente seleccionada para asegurar que cumpla 
                con los detalles de diseño y compra que estamos manejando. Creemos que la moda debe ser inclusiva, 
                por eso trabajamos con tallas diversas.
              </p>
            </div>
            <div className="relative h-96">
              <img 
                src={foto5}
                alt="Equipo de la tienda trabajando" 
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </section>
        )}

        {/* Testimonios */}
        {activeTab === 'testimonials' && (
          <section>
            <h2 className="text-3xl font-bold italic text-gray-900 mb-10 text-center">Lo que dicen de nuestro sitio</h2>
            
            {/* Testimonios de Clientes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <article className="bg-white rounded-lg shadow-lg p-8 relative">
                <div className="absolute top-0 left-0 w-24 h-24 bg-pink-200 rounded-tl-lg rounded-br-full flex items-start justify-start pl-4 pt-4">
                  <span className="text-4xl text-white">"</span>
                </div>
                <div className="flex flex-col items-center pt-12">
                  <div className="w-20 h-20 mb-4">
                    <img 
                      src="https://randomuser.me/api/portraits/women/44.jpg" 
                      alt="Cliente satisfecha" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">María González</h3>
                  <p className="text-gray-600 text-center">
                    "La mejor experiencia de compra online. La calidad superó mis expectativas."
                  </p>
                </div>
              </article>
              
              <article className="bg-white rounded-lg shadow-lg p-8 relative">
                <div className="absolute top-0 left-0 w-24 h-24 bg-pink-200 rounded-tl-lg rounded-br-full flex items-start justify-start pl-4 pt-4">
                  <span className="text-4xl text-white">"</span>
                </div>
                <div className="flex flex-col items-center pt-12">
                  <div className="w-20 h-20 mb-4">
                    <img 
                      src="https://randomuser.me/api/portraits/men/32.jpg" 
                      alt="Cliente satisfecho" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Carlos Mendoza</h3>
                  <p className="text-gray-600 text-center">
                    "Increíble atención al cliente gracias a su bot. Me ayudaron a resolver un problema con mi talla de forma rápida y amable."
                  </p>
                </div>
              </article>
            </div>

            {/* Equipo Desarrollador */}
            <div>
              <h3 className="text-4xl font-bold italic text-gray-900 mb-8 text-center">Nuestro Equipo</h3>
              <h2 className="text-xl font-light italic text-gray-900 mb-8 text-center">Conoce al equipo que lo hizo posible</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {/* Desarrollador 1 */}
                <div className="flex flex-col items-center">
                <img src={foto} alt="Foto de perfil" className="w-24 h-24 rounded-full mb-3 object-cover" />
                  <h4 className="text-xl font-semibold">Wattfi Vargas Castro</h4>
                  <p className="text-gray-600 italic text-sm">Desarrolladora Frontend</p>
                </div>
                
                {/* Desarrollador 2 */}
                <div className="flex flex-col items-center">
                <img src={perfil} alt="Foto de perfil" className="w-24 h-24 rounded-full mb-3 object-cover" />

                  <h4 className="text-xl font-semibold">Nayeli Ordoñez</h4>
                  <p className="text-gray-600 italic text-sm">Diseñadora UX/UI</p>
                </div>
                
                {/* Desarrollador 3 */}
                <div className="flex flex-col items-center">
                <img src={foto1} alt="Foto de perfil" className="w-24 h-24 rounded-full mb-3 object-cover" />
                  <h4 className="text-xl font-semibold">Paola Quispe</h4>
                  <p className="text-gray-600 text-sm italic">Backend Developer</p>
                </div>
                
                {/* Desarrollador 4 */}
                <div className="flex flex-col items-center">
                <img src={foto3} alt="Foto de perfil" className="w-24 h-24 rounded-full mb-3 object-cover" />
                  <h4 className="text-xl font-semibold">Mireya Laime</h4>
                  <p className="text-gray-600 text-sm italic">QA Tester</p>
                </div>
                
                {/* Desarrollador 5 */}
                <div className="flex flex-col items-center">
                <img src={foto2} alt="Foto de perfil" className="w-24 h-24 rounded-full mb-3 object-cover" />
                  <h4 className="text-xl font-semibold">Mauricio López</h4>
                  <p className="text-gray-600 text-sm italic">DevOps</p>
                </div>
                
                {/* Desarrollador 6 */}
                <div className="flex flex-col items-center">
                  <img 
                    src={foto4} 
                    alt="Carlos Torrez" 
                    className="w-24 h-24 rounded-full mb-3 object-cover"
                  />
                  <h4 className="text-xl font-semibold">Carlos Torrez</h4>
                  <p className="text-gray-600 text-sm italic">Project Manager</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}