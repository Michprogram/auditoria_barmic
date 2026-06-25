import React, { useState } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('resumen');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* Header Corporativo MercadoSur */}
      <header className="bg-blue-900 text-yellow-400 py-6 px-8 shadow-md border-b-4 border-yellow-400 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
              <span className="text-4xl">🛍️</span> MercadoSur
            </h1>
            <p className="text-sm text-blue-200 mt-1 font-semibold uppercase tracking-wider">
              Portal de Auditoría de Ciberseguridad DevSecOps
            </p>
          </div>
          <div className="hidden md:flex gap-4">
            <span className="bg-blue-800 text-xs py-1 px-3 rounded-full border border-blue-700 shadow-inner">
              Status: Riesgo Crítico Detectado
            </span>
          </div>
        </div>
      </header>

      {/* Menú de Navegación Interactivo */}
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8 flex flex-wrap gap-2 py-3">
          {[
            { id: 'resumen', label: 'Resumen Ejecutivo' },
            { id: 'vulnerabilidades', label: 'Vulnerabilidades (Informe A)' },
            { id: 'activos', label: 'Activos y DRP' },
            { id: 'matriz', label: 'Matriz de Riesgos (Informe B)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-md font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-yellow-400 text-blue-900 shadow-md transform -translate-y-0.5'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-blue-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Área de Contenido Principal */}
      <main className="flex-grow max-w-7xl mx-auto px-8 py-10 w-full">
        
        {/* TAB: RESUMEN EJECUTIVO */}
        {activeTab === 'resumen' && (
          <div className="animate-fade-in space-y-6">
            <h2 className="text-3xl font-bold border-b-2 border-yellow-400 pb-2 text-blue-900">Resumen Ejecutivo</h2>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 border-l-8 border-l-blue-600">
              <p className="text-lg leading-relaxed text-slate-700">
                El presente informe consolida los hallazgos técnicos, la evaluación de riesgos corporativos y las estrategias de remediación resultantes de la auditoría de ciberseguridad realizada al portal de **MercadoSur**. Las pruebas de penetración se ejecutaron en un entorno controlado para identificar brechas en la validación de entradas que pudieran comprometer la confidencialidad, integridad o disponibilidad (Tríada CIA) de la plataforma de ventas.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-red-50 p-5 rounded-xl border border-red-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-red-700 font-black text-xl">9.8 Crítica</h3>
                <p className="font-semibold text-slate-800">Inyección SQL (SQLi)</p>
                <p className="text-sm text-slate-600 mt-2">Compromiso total de la base de datos de clientes y PII.</p>
              </div>
              <div className="bg-red-50 p-5 rounded-xl border border-red-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-red-700 font-black text-xl">9.8 Crítica</h3>
                <p className="font-semibold text-slate-800">Inyección de Comandos</p>
                <p className="text-sm text-slate-600 mt-2">Ejecución Remota de Código (RCE) en el servidor host.</p>
              </div>
              <div className="bg-orange-50 p-5 rounded-xl border border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-orange-700 font-black text-xl">6.1 Media</h3>
                <p className="font-semibold text-slate-800">XSS Reflejado</p>
                <p className="text-sm text-slate-600 mt-2">Secuestro de sesiones de usuarios en pasarela de pagos.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB: VULNERABILIDADES */}
        {activeTab === 'vulnerabilidades' && (
          <div className="animate-fade-in space-y-6">
            <h2 className="text-3xl font-bold border-b-2 border-yellow-400 pb-2 text-blue-900">Análisis Técnico y Evidencias</h2>
            <div className="grid gap-6">
              {/* Acordeón Simulado / Tarjetas Expandidas */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                <h3 className="text-2xl font-bold text-red-600 mb-2">1. Inyección SQL (SQLi)</h3>
                <p className="text-slate-700 mb-4"><strong>Causa Raíz:</strong> Concatenación insegura de cadenas en el backend sin parametrización.</p>
                <div className="bg-slate-900 text-green-400 font-mono p-4 rounded-md text-sm shadow-inner mb-4">
                  Payload: ' OR '1'='1
                </div>
                <p className="text-slate-600">Al ingresar este payload, se genera una tautología matemática que fuerza al motor de base de datos a devolver todos los registros, evadiendo la autenticación. Se requiere mitigación inmediata mediante Consultas Parametrizadas y la implementación de un WAF perimetral.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                <h3 className="text-2xl font-bold text-red-600 mb-2">2. Inyección de Comandos OS</h3>
                <p className="text-slate-700 mb-4"><strong>Causa Raíz:</strong> Invocación directa de la terminal del sistema (Shell) con entrada de usuario no saneada.</p>
                <div className="bg-slate-900 text-green-400 font-mono p-4 rounded-md text-sm shadow-inner mb-4">
                  Payload: 127.0.0.1; cat /etc/passwd
                </div>
                <p className="text-slate-600">El uso del delimitador punto y coma (;) permite concatenar comandos nativos de Linux, logrando RCE. Es mandatorio migrar a arquitecturas de contenedores aislados y restringir los privilegios del usuario de servicio.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB: ACTIVOS Y DRP */}
        {activeTab === 'activos' && (
          <div className="animate-fade-in space-y-6">
            <h2 className="text-3xl font-bold border-b-2 border-yellow-400 pb-2 text-blue-900">Activos Críticos y Plan de Recuperación</h2>
            <div className="bg-blue-900 text-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Métricas Críticas de Resiliencia</h3>
              <div className="flex flex-col md:flex-row gap-8">
                <div>
                  <span className="block text-4xl font-black text-white">15 Min</span>
                  <span className="text-blue-200 text-sm uppercase tracking-wider">RPO (Pérdida de Datos Máxima)</span>
                </div>
                <div>
                  <span className="block text-4xl font-black text-white">2 Horas</span>
                  <span className="text-blue-200 text-sm uppercase tracking-wider">RTO (Tiempo Máximo de Caída)</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 mt-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Gobierno de Crisis y Respaldos</h3>
              <ul className="space-y-3 text-slate-700 list-disc pl-5">
                <li><strong>Regla 3-2-1 Inmutable:</strong> Respaldos cifrados WORM off-site para evitar secuestro de base de datos.</li>
                <li><strong>Comité de Emergencia (RACI):</strong> Roles definidos para el CISO, Líder DevSecOps y Relaciones Públicas.</li>
                <li><strong>Zero Trust:</strong> Micro-segmentación de la base de datos de clientes aislada del clúster web público.</li>
                <li><strong>Simulacros:</strong> Pruebas Tabletop semestrales y Failover real anual en infraestructura Hot Standby.</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB: MATRIZ DE RIESGOS (CON EFECTO GLOW) */}
        {activeTab === 'matriz' && (
          <div className="animate-fade-in space-y-6">
            <h2 className="text-3xl font-bold border-b-2 border-yellow-400 pb-2 text-blue-900">Matriz de Riesgos IPER</h2>
            <p className="text-slate-600 mb-6">Mapa de calor evaluando la probabilidad de explotación vs el impacto en el negocio. Los riesgos críticos presentan alertas visuales.</p>
            
            <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-lg border border-slate-200">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr>
                    <th className="p-3 border border-slate-300 bg-slate-100 text-slate-700">Impacto \ Probabilidad</th>
                    <th className="p-3 border border-slate-300 bg-slate-50">1. Rara vez</th>
                    <th className="p-3 border border-slate-300 bg-slate-50">2. Improbable</th>
                    <th className="p-3 border border-slate-300 bg-slate-50">3. Posible</th>
                    <th className="p-3 border border-slate-300 bg-slate-50">4. Probable</th>
                    <th className="p-3 border border-slate-300 bg-slate-50">5. Casi Certeza</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-slate-300 font-bold bg-slate-50 text-left">5. Catastrófico</td>
                    <td className="p-3 border border-slate-300 bg-yellow-400 text-yellow-900 font-bold">5</td>
                    <td className="p-3 border border-slate-300 bg-yellow-400 text-yellow-900 font-bold">10</td>
                    <td className="p-3 border border-slate-300 bg-orange-500 text-white font-bold">15</td>
                    <td className="p-3 border border-slate-300 bg-red-600 text-white font-bold relative group">
                      {/* Efecto Glow Tailwind */}
                      <span className="absolute inset-0 bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse"></span>
                      <span className="relative z-10">20 (V2)</span>
                    </td>
                    <td className="p-3 border border-slate-300 bg-red-700 text-white font-bold relative">
                      {/* Efecto Glow Tailwind */}
                      <span className="absolute inset-0 bg-red-700 shadow-[0_0_25px_rgba(185,28,28,0.9)] animate-pulse"></span>
                      <span className="relative z-10 text-xl">25 (V1)</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-300 font-bold bg-slate-50 text-left">4. Mayor</td>
                    <td className="p-3 border border-slate-300 bg-green-500 text-white font-bold">4</td>
                    <td className="p-3 border border-slate-300 bg-yellow-400 text-yellow-900 font-bold">8</td>
                    <td className="p-3 border border-slate-300 bg-orange-500 text-white font-bold">12</td>
                    <td className="p-3 border border-slate-300 bg-orange-500 text-white font-bold">16</td>
                    <td className="p-3 border border-slate-300 bg-red-600 text-white font-bold">20</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-300 font-bold bg-slate-50 text-left">3. Moderado</td>
                    <td className="p-3 border border-slate-300 bg-green-500 text-white font-bold">3</td>
                    <td className="p-3 border border-slate-300 bg-yellow-400 text-yellow-900 font-bold">6</td>
                    <td className="p-3 border border-slate-300 bg-yellow-400 text-yellow-900 font-bold">9</td>
                    <td className="p-3 border border-slate-300 bg-orange-500 text-white font-bold border-4 border-orange-700">12 (V3)</td>
                    <td className="p-3 border border-slate-300 bg-orange-500 text-white font-bold">15</td>
                  </tr>
                  {/* Filas Menores */}
                  <tr>
                    <td className="p-3 border border-slate-300 font-bold bg-slate-50 text-left">2. Menor</td>
                    <td className="p-3 border border-slate-300 bg-green-500 text-white">2</td>
                    <td className="p-3 border border-slate-300 bg-green-500 text-white">4</td>
                    <td className="p-3 border border-slate-300 bg-yellow-400 text-yellow-900">6</td>
                    <td className="p-3 border border-slate-300 bg-yellow-400 text-yellow-900">8</td>
                    <td className="p-3 border border-slate-300 bg-yellow-400 text-yellow-900">10</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-300 font-bold bg-slate-50 text-left">1. Insignificante</td>
                    <td className="p-3 border border-slate-300 bg-green-500 text-white">1</td>
                    <td className="p-3 border border-slate-300 bg-green-500 text-white">2</td>
                    <td className="p-3 border border-slate-300 bg-green-500 text-white">3</td>
                    <td className="p-3 border border-slate-300 bg-green-500 text-white">4</td>
                    <td className="p-3 border border-slate-300 bg-yellow-400 text-yellow-900">5</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-slate-800 text-white p-5 rounded-lg shadow-md mt-4">
              <h4 className="font-bold text-yellow-400">Priorización de Acción:</h4>
              <ul className="mt-2 space-y-1">
                <li><span className="font-mono text-red-400">[V1]</span> Inyección SQL - <strong>Detención inmediata de operaciones.</strong> Parche en capa de persistencia.</li>
                <li><span className="font-mono text-red-400">[V2]</span> Inyección de Comandos - Aislamiento del entorno del contenedor.</li>
                <li><span className="font-mono text-orange-400">[V3]</span> XSS Reflejado - Aplicación de Output Encoding y CSP.</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Footer Personalizado */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t-4 border-yellow-400 mt-auto">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-white font-bold text-lg mb-1">
              Auditoría realizada por Michele Andrea Barriga Carrasco
            </p>
            <p className="text-sm">Analista Programador, INACAP Valparaíso</p>
          </div>
          <div>
            <a 
              href="https://github.com/Michprogram" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-yellow-400 hover:text-slate-900 text-white py-2 px-6 rounded-full font-bold transition-colors duration-300 shadow-md border border-slate-700"
            >
              <svg height="24" width="24" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              GitHub / Michprogram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;