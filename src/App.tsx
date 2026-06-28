import React, { useState, useEffect } from 'react';

const App = () => {
  const [activeModule, setActiveModule] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Efecto para aplicar la clase 'dark' al tag HTML
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Navegación
  const goTo = (module: string) => setActiveModule(module);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 bg-slate-50 dark:bg-[#0a0f1c] text-slate-900 dark:text-slate-200 font-sans">

      {/* HEADER / NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-[#0a0f1c]/90 border-b border-slate-300 dark:border-blue-900/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-between items-center gap-4">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => goTo('home')}
          >
            <span className="text-3xl group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all">🛍️</span>
            <h1 className="text-2xl font-black tracking-tighter dark:text-white uppercase">
              Mercado<span className="text-blue-600 dark:text-blue-400">Sur</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Botón Bitácora IA (Separado y destacado) */}
            <button
              onClick={() => goTo('bitacora')}
              className="flex items-center gap-2 px-4 py-2 rounded-md font-mono text-sm font-bold transition-all
                         bg-purple-100 text-purple-700 hover:bg-purple-200
                         dark:bg-purple-900/30 dark:text-purple-300 dark:border dark:border-purple-500/50 dark:hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5h2v2H9v-2zm0-6h2v4H9V5z" /></svg>
              BITÁCORA IA
            </button>

            {/* Botón Modo Oscuro */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-yellow-400 hover:shadow-lg transition-all"
              title="Alternar Tema"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-10 w-full flex flex-col">

        {/* === HOME: MENÚ DE MÓDULOS EN CUADRÍCULA === */}
        {activeModule === 'home' && (
          <div className="animate-fade-in flex-grow flex flex-col justify-center">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black mb-4 dark:text-white tracking-tight">
                Portal de Auditoría de Ciberseguridad
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 font-mono">
                [ ESTADO DE INFRAESTRUCTURA: <span className="text-red-600 dark:text-red-400 font-bold dark:drop-shadow-[0_0_5px_rgba(248,113,113,0.8)]">COMPROMETIDA</span> ]
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: 'resumen', title: 'Resumen Ejecutivo', icon: '📑', color: 'blue' },
                { id: 'sqli', title: 'Explotación SQLi', icon: '💉', color: 'red' },
                { id: 'comandos', title: 'Inyección de Comandos', icon: '⚙️', color: 'red' },
                { id: 'xss', title: 'Ataque XSS Reflejado', icon: '🎣', color: 'orange' },
                { id: 'activos', title: 'Activos de Información', icon: '🗄️', color: 'blue' },
                { id: 'matriz', title: 'Matriz de Riesgos IPER', icon: '🔥', color: 'red', glow: true },
                { id: 'controles', title: 'Controles de Mitigación', icon: '🛡️', color: 'emerald' },
                { id: 'drp', title: 'Plan de Recuperación (DRP)', icon: '🔄', color: 'emerald' },
              ].map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => goTo(mod.id)}
                  className={`relative group p-8 rounded-xl border flex flex-col items-center justify-center text-center transition-all duration-300 overflow-hidden
                    ${isDarkMode
                      ? 'bg-slate-900/50 border-slate-800 hover:bg-slate-800'
                      : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm hover:shadow-md'}
                    ${mod.glow ? 'dark:border-red-900/50 dark:hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]' : ''}
                  `}
                >
                  <span className={`text-5xl mb-4 transition-transform group-hover:scale-110 ${mod.glow ? 'dark:drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]' : ''}`}>
                    {mod.icon}
                  </span>
                  <h3 className="text-xl font-bold dark:text-white group-hover:text-blue-500 transition-colors">
                    {mod.title}
                  </h3>
                  {mod.glow && (
                    <div className="absolute inset-0 bg-red-500/5 dark:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CONTENEDOR MODULAR CON BOTÓN VOLVER */}
        {activeModule !== 'home' && (
          <div className="animate-fade-in w-full">
            <button
              onClick={() => goTo('home')}
              className="mb-8 text-blue-600 dark:text-blue-400 font-mono hover:underline flex items-center gap-2"
            >
              ← Volver al Panel Principal
            </button>

            {/* MODULOS DE VULNERABILIDADES */}
            {activeModule === 'sqli' && (
              <div className="space-y-6">
                <h2 className="text-4xl font-black text-red-600 dark:text-red-400 dark:drop-shadow-[0_0_10px_rgba(220,38,38,0.6)]">Inyección SQL (SQLi)</h2>
                <div className="dark:bg-slate-900 bg-white p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">Evidencia de Explotación - CVSS 9.8 (Crítica)</h3>
                  <p className="mb-4 text-lg">Al analizar los formularios de MercadoSur en el entorno DVWA, se logró evadir la autenticación y volcar la base de datos completa utilizando el siguiente payload, generando una tautología matemática:</p>

                  {/* Bloque de código Neón */}
                  <div className="bg-black text-green-400 font-mono p-4 rounded-lg border border-green-900/50 shadow-[0_0_15px_rgba(34,197,94,0.15)] mb-6 overflow-x-auto">
                    <pre><code>' OR '1'='1</code></pre>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="border border-slate-300 dark:border-slate-700 rounded-lg p-2 bg-slate-100 dark:bg-slate-950">
                      <p className="text-sm font-mono mb-2 text-center text-slate-500">docs_barmic/img_barmic/sqli_barmic.png</p>
                      <img src="/docs_barmic/img_barmic/sqli_barmic.png" alt="Evidencia de entrada SQLi" className="w-full rounded object-cover" />
                    </div>
                    <div className="border border-slate-300 dark:border-slate-700 rounded-lg p-2 bg-slate-100 dark:bg-slate-950">
                      <p className="text-sm font-mono mb-2 text-center text-slate-500">docs_barmic/img_barmic/p-sqli_barmic.png</p>
                      <img src="/docs_barmic/img_barmic/p-sqli_barmic.png" alt="Evidencia de resultado SQLi" className="w-full rounded object-cover" />
                    </div>
                  </div>
                  <p className="text-lg"><strong>Impacto Operativo:</strong> Pérdida total de la confidencialidad de la Información de Identificación Personal (PII) de los clientes.</p>
                </div>
              </div>
            )}

            {activeModule === 'comandos' && (
              <div className="space-y-6">
                <h2 className="text-4xl font-black text-red-600 dark:text-red-400 dark:drop-shadow-[0_0_10px_rgba(220,38,38,0.6)]">Inyección de Comandos OS</h2>
                <div className="dark:bg-slate-900 bg-white p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">Ejecución Remota de Código (RCE) - CVSS 9.8</h3>
                  <p className="mb-4 text-lg">Se descubrió que el servidor host de MercadoSur interpreta comandos nativos de la terminal debido a la falta de sanitización al usar delimitadores. Payload inyectado:</p>

                  <div className="bg-black text-cyan-400 font-mono p-4 rounded-lg border border-cyan-900/50 shadow-[0_0_15px_rgba(34,211,238,0.15)] mb-6 overflow-x-auto">
                    <pre><code>127.0.0.1; cat /etc/passwd</code></pre>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="border border-slate-300 dark:border-slate-700 rounded-lg p-2 bg-slate-100 dark:bg-slate-950">
                      <p className="text-sm font-mono mb-2 text-center text-slate-500">Evidencia Payload</p>
                      <img src="/docs_barmic/img_barmic/command-injection_barmic.png" alt="Payload Comandos" className="w-full rounded object-cover" />
                    </div>
                    <div className="border border-slate-300 dark:border-slate-700 rounded-lg p-2 bg-slate-100 dark:bg-slate-950">
                      <p className="text-sm font-mono mb-2 text-center text-slate-500">Evidencia Ejecución /etc/passwd</p>
                      <img src="/docs_barmic/img_barmic/p-command-injection_barmic.png" alt="Resultado Comandos" className="w-full rounded object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeModule === 'xss' && (
              <div className="space-y-6">
                <h2 className="text-4xl font-black text-orange-500 dark:text-orange-400 dark:drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]">Cross-Site Scripting (XSS Reflejado)</h2>
                <div className="dark:bg-slate-900 bg-white p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">Secuestro de Sesión - CVSS 6.1 (Media)</h3>
                  <p className="mb-4 text-lg">El servidor de MercadoSur devuelve entradas sin codificar. Utilizando ingeniería social, un atacante puede ejecutar código JavaScript en el navegador del cliente:</p>

                  <div className="bg-black text-orange-400 font-mono p-4 rounded-lg border border-orange-900/50 shadow-[0_0_15px_rgba(249,115,22,0.15)] mb-6 overflow-x-auto">
                    <pre><code>{`<script>alert('auditoria_barmic')</script>`}</code></pre>
                  </div>

                  <p className="text-lg"><strong>Impacto:</strong> Permite el robo de cookies (Session Hijacking) durante el proceso de pago, afectando directamente la Reputación de Marca.</p>
                </div>
              </div>
            )}

            {/* MODULO: MATRIZ DE RIESGOS (NEÓN EXTREMO) */}
            {activeModule === 'matriz' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-4xl font-black text-center text-red-600 dark:text-white dark:drop-shadow-[0_0_20px_rgba(239,68,68,0.8)] mb-8">
                  MATRIZ DE RIESGOS IPER
                </h2>

                <div className="overflow-x-auto dark:bg-[#0d1326] bg-white p-8 rounded-xl border border-slate-200 dark:border-blue-900/50 shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(59,130,246,0.15)]">
                  <table className="w-full text-center border-collapse">
                    <thead>
                      <tr>
                        <th className="p-4 border dark:border-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-slate-300">Impacto \ Probabilidad</th>
                        <th className="p-4 border dark:border-slate-700 dark:bg-slate-800/50">1. Rara vez</th>
                        <th className="p-4 border dark:border-slate-700 dark:bg-slate-800/50">2. Improbable</th>
                        <th className="p-4 border dark:border-slate-700 dark:bg-slate-800/50">3. Posible</th>
                        <th className="p-4 border dark:border-slate-700 dark:bg-slate-800/50">4. Probable</th>
                        <th className="p-4 border dark:border-slate-700 dark:bg-slate-800/50">5. Casi Certeza</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-4 border dark:border-slate-700 font-bold dark:bg-slate-800/50 text-left">5. Catastrófico</td>
                        <td className="p-4 border dark:border-slate-700 bg-yellow-400 dark:bg-yellow-500/20 dark:text-yellow-400">5</td>
                        <td className="p-4 border dark:border-slate-700 bg-yellow-400 dark:bg-yellow-500/20 dark:text-yellow-400">10</td>
                        <td className="p-4 border dark:border-slate-700 bg-orange-500 dark:bg-orange-500/30 dark:text-orange-400">15</td>
                        <td className="p-4 border dark:border-slate-700 relative bg-red-600 text-white font-black overflow-hidden group">
                          <div className="absolute inset-0 bg-red-500 shadow-[inset_0_0_20px_rgba(255,255,255,0.5)] dark:shadow-[0_0_30px_rgba(239,68,68,1)] animate-pulse"></div>
                          <span className="relative z-10 text-xl dark:drop-shadow-[0_0_5px_#fff]">20 (V2)</span>
                        </td>
                        <td className="p-4 border dark:border-slate-700 relative bg-red-700 text-white font-black overflow-hidden group">
                          <div className="absolute inset-0 bg-red-600 shadow-[inset_0_0_30px_rgba(255,255,255,0.6)] dark:shadow-[0_0_40px_rgba(220,38,38,1)] animate-pulse"></div>
                          <span className="relative z-10 text-2xl dark:drop-shadow-[0_0_8px_#fff]">25 (V1)</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 border dark:border-slate-700 font-bold dark:bg-slate-800/50 text-left">4. Mayor</td>
                        <td className="p-4 border dark:border-slate-700 bg-green-500 dark:bg-green-500/20 dark:text-green-400">4</td>
                        <td className="p-4 border dark:border-slate-700 bg-yellow-400 dark:bg-yellow-500/20 dark:text-yellow-400">8</td>
                        <td className="p-4 border dark:border-slate-700 bg-orange-500 dark:bg-orange-500/30 dark:text-orange-400">12</td>
                        <td className="p-4 border dark:border-slate-700 bg-orange-500 dark:bg-orange-500/30 dark:text-orange-400">16</td>
                        <td className="p-4 border dark:border-slate-700 bg-red-600 dark:bg-red-600/40 dark:text-red-400 font-bold">20</td>
                      </tr>
                      <tr>
                        <td className="p-4 border dark:border-slate-700 font-bold dark:bg-slate-800/50 text-left">3. Moderado</td>
                        <td className="p-4 border dark:border-slate-700 bg-green-500 dark:bg-green-500/20 dark:text-green-400">3</td>
                        <td className="p-4 border dark:border-slate-700 bg-yellow-400 dark:bg-yellow-500/20 dark:text-yellow-400">6</td>
                        <td className="p-4 border dark:border-slate-700 bg-yellow-400 dark:bg-yellow-500/20 dark:text-yellow-400">9</td>
                        <td className="p-4 border dark:border-orange-500 relative bg-orange-500 text-white font-bold border-4">
                          <div className="absolute inset-0 bg-orange-500/80 dark:bg-orange-500/40 dark:shadow-[0_0_20px_rgba(249,115,22,0.8)]"></div>
                          <span className="relative z-10 dark:text-orange-300">12 (V3)</span>
                        </td>
                        <td className="p-4 border dark:border-slate-700 bg-orange-500 dark:bg-orange-500/30 dark:text-orange-400">15</td>
                      </tr>
                      {/* Otras filas */}
                      <tr>
                        <td className="p-4 border dark:border-slate-700 font-bold dark:bg-slate-800/50 text-left">2. Menor</td>
                        <td className="p-4 border dark:border-slate-700 bg-green-500 dark:bg-green-500/20 dark:text-green-400">2</td>
                        <td className="p-4 border dark:border-slate-700 bg-green-500 dark:bg-green-500/20 dark:text-green-400">4</td>
                        <td className="p-4 border dark:border-slate-700 bg-yellow-400 dark:bg-yellow-500/20 dark:text-yellow-400">6</td>
                        <td className="p-4 border dark:border-slate-700 bg-yellow-400 dark:bg-yellow-500/20 dark:text-yellow-400">8</td>
                        <td className="p-4 border dark:border-slate-700 bg-yellow-400 dark:bg-yellow-500/20 dark:text-yellow-400">10</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* MODULO: PLAN DE RECUPERACIÓN (DRP) */}
            {activeModule === 'drp' && (
              <div className="space-y-6">
                <h2 className="text-4xl font-black text-emerald-600 dark:text-emerald-400 dark:drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]">Plan de Recuperación ante Desastres (DRP)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="dark:bg-slate-900 bg-white p-8 rounded-xl border border-slate-200 dark:border-emerald-900/50 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl">⏱️</div>
                    <h3 className="text-2xl font-bold mb-6 relative z-10">Métricas Objetivas</h3>
                    <div className="space-y-6 relative z-10">
                      <div>
                        <span className="block text-5xl font-black dark:text-white mb-1">15 Min</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest text-sm">RPO (Pérdida de Datos)</span>
                      </div>
                      <div>
                        <span className="block text-5xl font-black dark:text-white mb-1">2 Horas</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest text-sm">RTO (Tiempo Máximo de Caída)</span>
                      </div>
                    </div>
                  </div>
                  <div className="dark:bg-slate-900 bg-white p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
                    <h3 className="text-2xl font-bold mb-4">Gobierno y Resiliencia</h3>
                    <ul className="space-y-4 text-lg text-slate-700 dark:text-slate-300">
                      <li className="flex gap-3"><span className="text-emerald-500">✔</span> <strong>Regla 3-2-1 Inmutable:</strong> Respaldos WORM off-site para evitar secuestros (Ransomware).</li>
                      <li className="flex gap-3"><span className="text-emerald-500">✔</span> <strong>Comité RACI:</strong> Roles de emergencia definidos para el CISO y Líder DevSecOps.</li>
                      <li className="flex gap-3"><span className="text-emerald-500">✔</span> <strong>Zero Trust:</strong> Segmentación de la base de datos y despliegue de WAF Híbrido.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* MODULO: BITÁCORA IA */}
            {activeModule === 'bitacora' && (
              <div className="space-y-6">
                <h2 className="text-4xl font-black text-purple-600 dark:text-purple-400 dark:drop-shadow-[0_0_10px_rgba(168,85,247,0.6)] flex items-center gap-4">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5h2v2H9v-2zm0-6h2v4H9V5z" /></svg>
                  Bitácora de IA - Prompts
                </h2>
                <div className="dark:bg-[#0f0919] bg-purple-50 p-8 rounded-xl border border-purple-200 dark:border-purple-900/50 shadow-lg">
                  <p className="mb-6 text-lg">Registro de interacciones (Documento 09_prompts_barmic.md) utilizadas para estructurar la auditoría del e-commerce.</p>

                  <div className="space-y-6">
                    <div className="dark:bg-slate-900 bg-white p-6 rounded-lg border-l-4 border-l-purple-500 shadow-md">
                      <h4 className="font-bold text-slate-800 dark:text-purple-300 mb-2">Prompt 01: Inicialización</h4>
                      <p className="italic text-slate-600 dark:text-slate-400">"Estoy montando el entorno para una auditoría de seguridad web de un e-commerce ficticio llamado MercadoSur... Dame los comandos exactos de terminal para inicializar el proyecto..."</p>
                    </div>
                    <div className="dark:bg-slate-900 bg-white p-6 rounded-lg border-l-4 border-l-purple-500 shadow-md">
                      <h4 className="font-bold text-slate-800 dark:text-purple-300 mb-2">Prompt 02: Inyección SQL y CVSS</h4>
                      <p className="italic text-slate-600 dark:text-slate-400">"Actúa como auditora de seguridad. Necesito redactar el archivo Markdown 02_sqli_barmic.md para evidenciar el ataque... Justifica el CVSS de 9.8."</p>
                    </div>
                    <div className="dark:bg-slate-900 bg-white p-6 rounded-lg border-l-4 border-l-purple-500 shadow-md">
                      <h4 className="font-bold text-slate-800 dark:text-purple-300 mb-2">Prompt 03: Matriz y DRP</h4>
                      <p className="italic text-slate-600 dark:text-slate-400">"Construye una matriz probabilidad × impacto con mapa de calor (colores), ubicando las 3 vulnerabilidades... Desarrolla un Plan de Recuperación ante Desastres (DRP) exhaustivo."</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Si el modulo no esta explícitamente programado arriba, muestra un placeholder */}
            {['resumen', 'activos', 'controles'].includes(activeModule) && (
              <div className="dark:bg-slate-900 bg-white p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
                <h3 className="text-2xl font-bold mb-4 uppercase">{activeModule}</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  La información de esta sección se extrae directamente de la carpeta <code>docs_barmic</code>. Contenido documentado durante la fase de auditoría.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* === FOOTER MINIMALISTA E INMERSIVO === */}
      <footer className="mt-auto py-8 bg-[#020617] border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center text-xs md:text-sm">
          <div className="text-slate-500 font-mono tracking-widest uppercase">
            AGENTE: <span className="text-blue-500 dark:text-blue-400 ml-2">MICHELE BARRIGA</span>
          </div>

          <a
            href="https://github.com/Michprogram"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-md bg-[#0f172a] border border-slate-700/50 text-slate-400 hover:text-white hover:border-blue-500 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all"
            title="GitHub Repository"
          >
            <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </a>
        </div>
      </footer>

    </div>
  );
};

export default App;