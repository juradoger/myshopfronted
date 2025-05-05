import { useState } from 'react';
export default function Nosotros() {
  const [activeTab, setActiveTab] = useState('story');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Sobre Nosotros</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Descubre la historia, misión y valores detrás de nuestra marca
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
            aria-selected={activeTab === 'mission'}
            className={`px-6 py-3 text-sm font-medium border-t border-b border-r ${activeTab === 'mission' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'} focus:z-10 focus:outline-none`}
            onClick={() => setActiveTab('mission')}
          >
            Misión y Valores
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
        {/* Behind the Brand */}
        {activeTab === 'story' && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Behind the Brand</h2>
              <p className="text-gray-600 mb-4">
                Nuestra marca nació con la visión de crear prendas que combinan estilo, calidad y sostenibilidad. 
                Desde nuestros inicios, nos hemos dedicado a seleccionar cuidadosamente cada material y diseño para 
                asegurar que nuestras piezas no solo se vean bien, sino que también perduren en el tiempo.
              </p>
              <p className="text-gray-600">
                Con cada colección, buscamos innovar y sorprender, manteniendo siempre nuestra esencia y compromiso 
                con la excelencia. Nuestro equipo de diseñadores trabaja incansablemente para crear prendas que 
                inspiren confianza y expresen personalidad.
              </p>
            </div>
            <div className="relative h-96">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Mujer en tienda de ropa sonriendo" 
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </section>
        )}

        {/* Our Mission */}
        {activeTab === 'mission' && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-96">
              <img 
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Interior de tienda de moda con ropa colgada" 
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                Nuestra misión es transformar la industria de la moda ofreciendo prendas excepcionales que 
                hacen sentir a nuestros clientes seguros y auténticos. Creemos en un enfoque consciente 
                que respeta tanto a las personas como al planeta.
              </p>
              <p className="text-gray-600 mb-4">
                Nos esforzamos por crear una comunidad donde la moda sea accesible, inclusiva y representativa 
                de la diversidad que nos rodea. Cada prenda cuenta una historia y está diseñada para formar 
                parte de momentos especiales en la vida de quienes las usan.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="bg-gray-100 rounded-full px-4 py-2 text-sm font-medium text-gray-700">Calidad</div>
                <div className="bg-gray-100 rounded-full px-4 py-2 text-sm font-medium text-gray-700">Sostenibilidad</div>
                <div className="bg-gray-100 rounded-full px-4 py-2 text-sm font-medium text-gray-700">Innovación</div>
                <div className="bg-gray-100 rounded-full px-4 py-2 text-sm font-medium text-gray-700">Inclusividad</div>
              </div>
            </div>
          </section>
        )}

        {/* Testimonials */}
        {activeTab === 'testimonials' && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Testimonios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Testimonial 1 */}
              <article className="bg-white rounded-lg shadow-lg p-8 relative">
                <div className="absolute top-0 left-0 w-24 h-24 bg-pink-200 rounded-tl-lg rounded-br-full flex items-start justify-start pl-4 pt-4">
                  <span className="text-4xl text-white">"</span>
                </div>
                <div className="flex flex-col items-center pt-12">
                  <div className="w-20 h-20 mb-4">
                    <img 
                      src="https://randomuser.me/api/portraits/women/44.jpg" 
                      alt="Jennifer Taylor" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Jennifer Taylor</h3>
                  <p className="text-gray-600 text-center">
                    "Estoy constantemente impresionada por la calidad y el estilo de la ropa. Las piezas que he comprado se han convertido en básicos en mi guardarropa, y siempre recibo cumplidos cuando las uso."
                  </p>
                </div>
              </article>
              
              {/* Testimonial 2 */}
              <article className="bg-white rounded-lg shadow-lg p-8 relative">
                <div className="absolute top-0 left-0 w-24 h-24 bg-pink-200 rounded-tl-lg rounded-br-full flex items-start justify-start pl-4 pt-4">
                  <span className="text-4xl text-white">"</span>
                </div>
                <div className="flex flex-col items-center pt-12">
                  <div className="w-20 h-20 mb-4">
                    <img 
                      src="https://randomuser.me/api/portraits/women/68.jpg" 
                      alt="Mia Wilson" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Mia Wilson</h3>
                  <p className="text-gray-600 text-center">
                    "Lo que más me gusta es la atención al detalle en cada prenda. El servicio al cliente es excepcional y siempre encuentro exactamente lo que busco. ¡Mi marca favorita sin duda!"
                  </p>
                </div>
              </article>
            </div>
          </section>
        )}
      </main>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Nuestro Equipo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Team Member 1 */}
          <article className="flex flex-col items-center">
            <div className="w-40 h-40 mb-4">
              <img 
                src="https://randomuser.me/api/portraits/women/33.jpg" 
                alt="Ana López, Directora Creativa" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h3 className="text-xl font-semibold mb-1">Ana López</h3>
            <p className="text-gray-600 mb-2">Directora Creativa</p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-gray-600" aria-label="Twitter de Ana López">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600" aria-label="LinkedIn de Ana López">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600" aria-label="Instagram de Ana López">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </article>
          
          {/* Team Member 2 */}
          <article className="flex flex-col items-center">
            <div className="w-40 h-40 mb-4">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="Carlos Martínez, Director de Operaciones" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h3 className="text-xl font-semibold mb-1">Carlos Martínez</h3>
            <p className="text-gray-600 mb-2">Director de Operaciones</p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-gray-600" aria-label="Twitter de Carlos Martínez">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600" aria-label="LinkedIn de Carlos Martínez">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600" aria-label="Instagram de Carlos Martínez">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </article>
          
          {/* Team Member 3 */}
          <article className="flex flex-col items-center">
            <div className="w-40 h-40 mb-4">
              <img 
                src="https://randomuser.me/api/portraits/women/63.jpg" 
                alt="Elena Gómez, Diseñadora Principal" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h3 className="text-xl font-semibold mb-1">Elena Gómez</h3>
            <p className="text-gray-600 mb-2">Diseñadora Principal</p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-gray-600" aria-label="Twitter de Elena Gómez">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600" aria-label="LinkedIn de Elena Gómez">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600" aria-label="Instagram de Elena Gómez">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </article>
          
          {/* Team Member 4 */}
          <article className="flex flex-col items-center">
            <div className="w-40 h-40 mb-4">
              <img 
                src="https://randomuser.me/api/portraits/men/75.jpg" 
                alt="David Chen, Especialista en Sostenibilidad" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h3 className="text-xl font-semibold mb-1">David Chen</h3>
            <p className="text-gray-600 mb-2">Especialista en Sostenibilidad</p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-gray-600" aria-label="Twitter de David Chen">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600" aria-label="LinkedIn de David Chen">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600" aria-label="Instagram de David Chen">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}