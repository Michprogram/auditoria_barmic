import React, { useState, useEffect } from 'react';

const App = () => {
  const [activeModule, setActiveModule] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Estado para la interactividad de la Matriz de Riesgos
  const [activeVuln, setActiveVuln] = useState<string | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const goTo = (module: string) => {
    setActiveModule(module);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-zinc-300 font-sans selection:bg-cyan-500/30">

      {/* HEADER / NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-[#050505]/80 border-b border-slate-200 dark:border-zinc-800/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-between items-center gap-4">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => goTo('home')}
          >
            <span className="text-3xl group-hover:drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] transition-all">🛍️</span>
            <h1 className="text-2xl font-black tracking-tighter dark:text-white uppercase">
              Mercado<span className="text-cyan-600 dark:text-cyan-400">Sur</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => goTo('bitacora')}
              className="flex items-center gap-2 px-4 py-2 rounded-md font-mono text-xs font-bold transition-all uppercase tracking-wider
                         bg-fuchsia-100 text-fuchsia-700 hover:bg-fuchsia-200
                         dark:bg-fuchsia-900/20 dark:text-fuchsia-400 dark:border dark:border-fuchsia-500/30 dark:hover:shadow-[0_0_15px_rgba(217,70,239,0.4)] dark:hover:bg-fuchsia-900/40"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5h2v2H9v-2zm0-6h2v4H9V5z" /></svg>
              Bitácora IA
            </button>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-amber-400 hover:shadow-lg transition-all"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* BACKGROUND DECORATIVO (Solo modo oscuro) */}
      <div className="fixed inset-0 z-[-1] hidden dark:block bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-[#050505] to-[#050505] pointer-events-none"></div>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-10 w-full flex flex-col relative z-10">

        {/* === HOME === */}
        {activeModule === 'home' && (
          <div className="animate-fade-in flex-grow flex flex-col justify-center py-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 dark:text-white tracking-tight uppercase">
                Auditoría de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">Ciberseguridad</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-zinc-400 font-mono">
                [ ESTADO DE RED: <span className="text-red-600 dark:text-red-500 font-bold dark:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse">COMPROMETIDA</span> ]
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { id: 'resumen', title: 'Resumen Ejecutivo', icon: '📑' },
                { id: 'sqli', title: 'Evidencia: SQLi', icon: '💉' },
                { id: 'comandos', title: 'Evidencia: OS Command', icon: '⚙️' },
                { id: 'xss', title: 'Evidencia: XSS', icon: '🎣' },
                { id: 'activos', title: 'Activos de Información', icon: '🗄️' },
                { id: 'matriz', title: 'Matriz de Riesgos IPER', icon: '🔥', glow: true },
                { id: 'controles', title: 'Controles & Prevención', icon: '🛡️' },
                { id: 'drp', title: 'Plan DRP & Continuidad', icon: '🔄' },
              ].map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => goTo(mod.id)}
                  className={`relative group p-6 rounded-xl border flex flex-col items-center justify-center text-center transition-all duration-300 overflow-hidden
                    ${isDarkMode
                      ? 'bg-zinc-900/40 border-zinc-800/80 hover:bg-zinc-800/60 hover:border-zinc-700'
                      : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm hover:shadow-md'}
                    ${mod.glow ? 'dark:border-red-900/50 dark:hover:border-red-500/50 dark:hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]' : ''}
                  `}
                >
                  <span className={`text-4xl mb-3 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1 ${mod.glow ? 'dark:drop-shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-pulse' : ''}`}>
                    {mod.icon}
                  </span>
                  <h3 className="text-sm font-bold dark:text-zinc-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors uppercase tracking-wide">
                    {mod.title}
                  </h3>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* === BOTÓN VOLVER (Para todos los módulos excepto Home) === */}
        {activeModule !== 'home' && (
          <button
            onClick={() => goTo('home')}
            className="mb-8 w-fit text-slate-500 hover:text-cyan-600 dark:text-zinc-400 dark:hover:text-cyan-400 font-mono text-sm flex items-center gap-2 transition-colors border border-transparent hover:border-current px-3 py-1 rounded"
          >
            ← RETORNAR AL PANEL
          </button>
        )}

        {/* === MÓDULO: RESUMEN EJECUTIVO === */}
        {activeModule === 'resumen' && (
          <div className="animate-fade-in space-y-8">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Resumen Ejecutivo Integral</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="dark:bg-zinc-900/50 bg-white p-6 rounded-xl border border-slate-200 dark:border-zinc-800">
                <h3 className="text-xl font-bold mb-3 dark:text-cyan-400">1. Contexto y Alcance</h3>
                <p className="text-slate-700 dark:text-zinc-300 leading-relaxed mb-2">
                  Auditoría de ciberseguridad realizada al portal de <strong>MercadoSur</strong>. Las pruebas de penetración se ejecutaron en un entorno controlado (DVWA) para identificar brechas en la validación de entradas que comprometen la Tríada CIA (Confidencialidad, Integridad, Disponibilidad).
                </p>
              </div>
              <div className="dark:bg-zinc-900/50 bg-white p-6 rounded-xl border border-slate-200 dark:border-zinc-800">
                <h3 className="text-xl font-bold mb-3 dark:text-cyan-400">2. Estrategia de Defensa</h3>
                <ul className="list-disc pl-5 text-slate-700 dark:text-zinc-300 space-y-1">
                  <li><strong>Prevención:</strong> Consultas Parametrizadas, Output Encoding estricto.</li>
                  <li><strong>Mitigación:</strong> WAF Perimetral, Sandboxing (Docker), PoLP.</li>
                  <li><strong>Continuidad:</strong> RPO 15 min, RTO 2 hrs, Backups WORM Off-site.</li>
                </ul>
              </div>
            </div>

            <div className="dark:bg-zinc-900/50 bg-white p-6 rounded-xl border border-slate-200 dark:border-zinc-800 overflow-x-auto">
              <h3 className="text-xl font-bold mb-4 dark:text-white">3. Consolidado de Vulnerabilidades (CVSS v3.1)</h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b dark:border-zinc-700 text-sm uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                    <th className="p-3">Hallazgo Técnico</th>
                    <th className="p-3">Vector de Ataque</th>
                    <th className="p-3">Puntaje</th>
                    <th className="p-3">Severidad</th>
                  </tr>
                </thead>
                <tbody className="text-slate-800 dark:text-zinc-200">
                  <tr className="border-b dark:border-zinc-800/50">
                    <td className="p-3 font-bold">Inyección SQL (SQLi)</td>
                    <td className="p-3 font-mono text-xs">AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H</td>
                    <td className="p-3 font-black text-red-500">9.8</td>
                    <td className="p-3">🔴 Crítica</td>
                  </tr>
                  <tr className="border-b dark:border-zinc-800/50">
                    <td className="p-3 font-bold">Inyección de Comandos OS</td>
                    <td className="p-3 font-mono text-xs">AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H</td>
                    <td className="p-3 font-black text-red-500">9.8</td>
                    <td className="p-3">🔴 Crítica</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">XSS Reflejado</td>
                    <td className="p-3 font-mono text-xs">AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N</td>
                    <td className="p-3 font-black text-orange-400">6.1</td>
                    <td className="p-3">🟠 Media</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* === MÓDULO: ACTIVOS === */}
        {activeModule === 'activos' && (
          <div className="animate-fade-in space-y-8">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight dark:text-white">Clasificación de <span className="text-cyan-500">Activos Críticos</span></h2>
            <p className="text-lg dark:text-zinc-400">Se han identificado 6 activos fundamentales para la operatividad de MercadoSur. Su compromiso paraliza la cadena de valor.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: 1, name: "BD de Clientes", type: "Datos / PII", impact: "Confidencialidad" },
                { id: 2, name: "Pasarela de Pagos", type: "Financiero", impact: "Integridad" },
                { id: 3, name: "Servidores Host", type: "Infraestructura", impact: "Disponibilidad" },
                { id: 4, name: "Historial Logístico", type: "Operativo", impact: "Integridad" },
                { id: 5, name: "Código Fuente", type: "Prop. Intelectual", impact: "Confidencialidad" },
                { id: 6, name: "Reputación de Marca", type: "Intangible", impact: "Valor Estratégico" },
              ].map(activo => (
                <div key={activo.id} className="p-6 rounded-xl border dark:border-zinc-800 bg-white dark:bg-zinc-900/30 hover:dark:bg-zinc-800/50 transition-colors">
                  <div className="text-cyan-500 font-mono text-sm mb-1">ACTIVO 0{activo.id}</div>
                  <h3 className="text-xl font-bold dark:text-zinc-100 mb-2">{activo.name}</h3>
                  <div className="flex flex-col gap-1 text-sm dark:text-zinc-400">
                    <span><strong>Clase:</strong> {activo.type}</span>
                    <span><strong>Pilar Crítico:</strong> {activo.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === MÓDULO: CONTROLES DE MITIGACIÓN === */}
        {activeModule === 'controles' && (
          <div className="animate-fade-in space-y-8">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight dark:text-white">Controles de Mitigación <span className="text-fuchsia-500">(Defensa en Profundidad)</span></h2>
            <p className="dark:text-zinc-400 text-lg">Estrategias de arquitectura que asumen el fallo de las políticas preventivas (Zero Trust), referenciadas bajo estándares OWASP, NIST y CIS.</p>

            <div className="space-y-6">
              <div className="dark:bg-zinc-900/50 bg-white p-6 rounded-xl border-l-4 border-l-red-500 dark:border-zinc-800 shadow-md">
                <h3 className="text-xl font-bold dark:text-white mb-2">Mitigación para SQLi (Riesgo Extremo)</h3>
                <ul className="list-disc pl-5 space-y-2 dark:text-zinc-300">
                  <li><strong>WAF Perimetral (OWASP):</strong> Firewall de capa 7 para analizar tráfico HTTP y detener firmas de DB o tautologías antes del servidor.</li>
                  <li><strong>Principio PoLP (NIST SP 800-53):</strong> Cuenta de BD con privilegios mínimos (solo DML, sin DROP ni ALTER).</li>
                </ul>
              </div>
              <div className="dark:bg-zinc-900/50 bg-white p-6 rounded-xl border-l-4 border-l-red-500 dark:border-zinc-800 shadow-md">
                <h3 className="text-xl font-bold dark:text-white mb-2">Mitigación para Comandos OS (Riesgo Extremo)</h3>
                <ul className="list-disc pl-5 space-y-2 dark:text-zinc-300">
                  <li><strong>Aislamiento Sandboxing (CIS Controls v8):</strong> Ejecución de la app en contenedores inmutables Docker (Read-Only Root Filesystem).</li>
                  <li><strong>Hardening de Servicio (NIST SP 800-123):</strong> Ejecución web bajo usuario <code className="dark:bg-zinc-800 px-1 rounded">www-data</code> sin privilegios sobre <code className="dark:bg-zinc-800 px-1 rounded">/etc/shadow</code>.</li>
                </ul>
              </div>
              <div className="dark:bg-zinc-900/50 bg-white p-6 rounded-xl border-l-4 border-l-orange-500 dark:border-zinc-800 shadow-md">
                <h3 className="text-xl font-bold dark:text-white mb-2">Mitigación para XSS (Riesgo Alto)</h3>
                <ul className="list-disc pl-5 space-y-2 dark:text-zinc-300">
                  <li><strong>Cabeceras CSP (OWASP):</strong> Restricción de dominios permitidos para ejecución de scripts (bloqueo de <i>unsafe-inline</i>).</li>
                  <li><strong>Banderas de Seguridad (OWASP A05):</strong> Tokens de sesión configurados estrictamente como <code className="dark:bg-zinc-800 px-1 rounded">HttpOnly</code> y <code className="dark:bg-zinc-800 px-1 rounded">Secure</code>.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* === MÓDULOS DE VULNERABILIDADES (SQLi, Comandos, XSS) === */}
        {/* SQLi */}
        {activeModule === 'sqli' && (
          <div className="animate-fade-in space-y-6">
            <h2 className="text-4xl font-black text-red-600 dark:text-red-500 uppercase tracking-tighter">Inyección SQL (SQLi)</h2>
            <div className="dark:bg-zinc-900/40 bg-white p-8 rounded-xl border border-slate-200 dark:border-zinc-800/80 shadow-lg">
              <p className="mb-4 text-lg dark:text-zinc-300">Bypass de autenticación mediante generación de tautología matemática en BD.</p>

              <div className="bg-black text-cyan-400 font-mono p-4 rounded-lg border border-cyan-900/50 shadow-[0_0_20px_rgba(6,182,212,0.15)] mb-6 overflow-x-auto relative group">
                <div className="absolute top-2 right-3 text-[10px] text-cyan-700">PAYLOAD INYECTADO</div>
                <pre><code>' OR '1'='1</code></pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border border-slate-200 dark:border-zinc-800 rounded-lg p-2 dark:bg-[#020202]">
                  <p className="text-xs font-mono mb-2 text-center text-slate-500">docs_barmic/img_barmic/sqli_barmic.png</p>
                  <img src="/docs_barmic/img_barmic/sqli_barmic.png" alt="Evidencia SQLi" className="w-full rounded border dark:border-zinc-800" />
                </div>
                <div className="border border-slate-200 dark:border-zinc-800 rounded-lg p-2 dark:bg-[#020202]">
                  <p className="text-xs font-mono mb-2 text-center text-slate-500">docs_barmic/img_barmic/p-sqli_barmic.png</p>
                  <img src="/docs_barmic/img_barmic/p-sqli_barmic.png" alt="CVSS SQLi" className="w-full rounded border dark:border-zinc-800" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comandos OS */}
        {activeModule === 'comandos' && (
          <div className="animate-fade-in space-y-6">
            <h2 className="text-4xl font-black text-red-600 dark:text-red-500 uppercase tracking-tighter">Inyección de Comandos OS</h2>
            <div className="dark:bg-zinc-900/40 bg-white p-8 rounded-xl border border-slate-200 dark:border-zinc-800/80 shadow-lg">
              <p className="mb-4 text-lg dark:text-zinc-300">Ejecución Remota de Código (RCE) concatenando comandos con el delimitador (;).</p>

              <div className="bg-black text-fuchsia-400 font-mono p-4 rounded-lg border border-fuchsia-900/50 shadow-[0_0_20px_rgba(217,70,239,0.15)] mb-6 overflow-x-auto relative">
                <div className="absolute top-2 right-3 text-[10px] text-fuchsia-700">PAYLOAD RCE</div>
                <pre><code>127.0.0.1; cat /etc/passwd</code></pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border border-slate-200 dark:border-zinc-800 rounded-lg p-2 dark:bg-[#020202]">
                  <img src="/docs_barmic/img_barmic/command-injection_barmic.png" alt="Comandos" className="w-full rounded border dark:border-zinc-800" />
                </div>
                <div className="border border-slate-200 dark:border-zinc-800 rounded-lg p-2 dark:bg-[#020202]">
                  <img src="/docs_barmic/img_barmic/p-command-injection_barmic.png" alt="CVSS Comandos" className="w-full rounded border dark:border-zinc-800" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* XSS */}
        {activeModule === 'xss' && (
          <div className="animate-fade-in space-y-6">
            <h2 className="text-4xl font-black text-orange-500 dark:text-orange-500 uppercase tracking-tighter">XSS Reflejado</h2>
            <div className="dark:bg-zinc-900/40 bg-white p-8 rounded-xl border border-slate-200 dark:border-zinc-800/80 shadow-lg">
              <p className="mb-4 text-lg dark:text-zinc-300">Permite el secuestro de sesiones inyectando scripts maliciosos en el navegador del cliente.</p>

              <div className="bg-black text-amber-400 font-mono p-4 rounded-lg border border-amber-900/50 shadow-[0_0_20px_rgba(251,191,36,0.15)] mb-6 overflow-x-auto relative">
                <div className="absolute top-2 right-3 text-[10px] text-amber-700">PAYLOAD SCRIPT</div>
                <pre><code>{`<script>alert('auditoria_barmic')</script>`}</code></pre>
              </div>

              <div className="border border-slate-200 dark:border-zinc-800 rounded-lg p-2 dark:bg-[#020202] max-w-xl">
                <img src="/docs_barmic/img_barmic/p-XSS_barmic.png" alt="CVSS XSS" className="w-full rounded border dark:border-zinc-800" />
              </div>
            </div>
          </div>
        )}

        {/* === MÓDULO: MATRIZ DE RIESGOS (INTERACTIVA) === */}
        {activeModule === 'matriz' && (
          <div className="animate-fade-in space-y-8 flex flex-col items-center">
            <div className="text-center">
              <h2 className="text-4xl font-black uppercase text-red-600 dark:text-white dark:drop-shadow-[0_0_15px_rgba(239,68,68,0.5)] mb-2">
                Matriz IPER Interactiva
              </h2>
              <p className="dark:text-zinc-400 text-sm font-mono">HAZ CLIC EN LAS CELDAS RESALTADAS PARA DESPLEGAR EL ANÁLISIS DE IMPACTO.</p>
            </div>

            <div className="w-full overflow-x-auto dark:bg-[#0a0a0a] bg-white p-6 md:p-10 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-2xl">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 border dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900 dark:text-zinc-400 uppercase text-xs tracking-widest">Impacto \ Probabilidad</th>
                    <th className="p-4 border dark:border-zinc-800 dark:bg-zinc-900/50">1. Rara vez</th>
                    <th className="p-4 border dark:border-zinc-800 dark:bg-zinc-900/50">2. Improbable</th>
                    <th className="p-4 border dark:border-zinc-800 dark:bg-zinc-900/50">3. Posible</th>
                    <th className="p-4 border dark:border-zinc-800 dark:bg-zinc-900/50">4. Probable</th>
                    <th className="p-4 border dark:border-zinc-800 dark:bg-zinc-900/50">5. Casi Certeza</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border dark:border-zinc-800 font-bold dark:bg-zinc-900/50 text-left">5. Catastrófico</td>
                    <td className="p-4 border dark:border-zinc-800 bg-yellow-400 dark:bg-yellow-500/10 dark:text-yellow-600">5</td>
                    <td className="p-4 border dark:border-zinc-800 bg-yellow-400 dark:bg-yellow-500/10 dark:text-yellow-600">10</td>
                    <td className="p-4 border dark:border-zinc-800 bg-orange-500 dark:bg-orange-500/20 dark:text-orange-500">15</td>

                    {/* CELDA INTERACTIVA V2 */}
                    <td
                      onClick={() => setActiveVuln('v2')}
                      className={`p-4 border dark:border-zinc-800 relative font-black cursor-pointer group transition-all
                                 ${activeVuln === 'v2' ? 'bg-red-600 text-white dark:shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]' : 'bg-red-500 text-white'}`}
                    >
                      <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-100 dark:shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all"></div>
                      <span className="relative z-10 dark:drop-shadow-[0_0_2px_#000]">20 (V2)</span>
                    </td>

                    {/* CELDA INTERACTIVA V1 */}
                    <td
                      onClick={() => setActiveVuln('v1')}
                      className={`p-4 border dark:border-zinc-800 relative font-black cursor-pointer group transition-all
                                 ${activeVuln === 'v1' ? 'bg-red-700 text-white dark:shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]' : 'bg-red-600 text-white'}`}
                    >
                      <div className="absolute inset-0 bg-red-700 opacity-0 group-hover:opacity-100 dark:shadow-[0_0_40px_rgba(220,38,38,0.7)] transition-all"></div>
                      <span className="relative z-10 text-xl dark:drop-shadow-[0_0_3px_#000]">25 (V1)</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 border dark:border-zinc-800 font-bold dark:bg-zinc-900/50 text-left">4. Mayor</td>
                    <td className="p-4 border dark:border-zinc-800 bg-green-500 dark:bg-emerald-500/10 dark:text-emerald-600">4</td>
                    <td className="p-4 border dark:border-zinc-800 bg-yellow-400 dark:bg-yellow-500/10 dark:text-yellow-600">8</td>
                    <td className="p-4 border dark:border-zinc-800 bg-orange-500 dark:bg-orange-500/20 dark:text-orange-500">12</td>
                    <td className="p-4 border dark:border-zinc-800 bg-orange-500 dark:bg-orange-500/20 dark:text-orange-500">16</td>
                    <td className="p-4 border dark:border-zinc-800 bg-red-500 dark:bg-red-500/30 dark:text-red-500">20</td>
                  </tr>
                  <tr>
                    <td className="p-4 border dark:border-zinc-800 font-bold dark:bg-zinc-900/50 text-left">3. Moderado</td>
                    <td className="p-4 border dark:border-zinc-800 bg-green-500 dark:bg-emerald-500/10 dark:text-emerald-600">3</td>
                    <td className="p-4 border dark:border-zinc-800 bg-yellow-400 dark:bg-yellow-500/10 dark:text-yellow-600">6</td>
                    <td className="p-4 border dark:border-zinc-800 bg-yellow-400 dark:bg-yellow-500/10 dark:text-yellow-600">9</td>

                    {/* CELDA INTERACTIVA V3 */}
                    <td
                      onClick={() => setActiveVuln('v3')}
                      className={`p-4 border dark:border-zinc-800 relative font-bold cursor-pointer group transition-all border-4
                                 ${activeVuln === 'v3' ? 'border-orange-500 bg-orange-500 text-white' : 'border-orange-500 bg-orange-400 text-white dark:bg-orange-500/20 dark:text-orange-400'}`}
                    >
                      <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-20 dark:shadow-[0_0_20px_rgba(249,115,22,0.5)] transition-all"></div>
                      <span className="relative z-10">12 (V3)</span>
                    </td>

                    <td className="p-4 border dark:border-zinc-800 bg-orange-500 dark:bg-orange-500/20 dark:text-orange-500">15</td>
                  </tr>
                  {/* Filas Menores (Simplificadas visualmente) */}
                  <tr>
                    <td className="p-4 border dark:border-zinc-800 font-bold dark:bg-zinc-900/50 text-left">2. Menor</td>
                    <td className="p-4 border dark:border-zinc-800 bg-green-500 dark:bg-emerald-500/10 dark:text-emerald-600">2</td>
                    <td className="p-4 border dark:border-zinc-800 bg-green-500 dark:bg-emerald-500/10 dark:text-emerald-600">4</td>
                    <td className="p-4 border dark:border-zinc-800 bg-yellow-400 dark:bg-yellow-500/10 dark:text-yellow-600">6</td>
                    <td className="p-4 border dark:border-zinc-800 bg-yellow-400 dark:bg-yellow-500/10 dark:text-yellow-600">8</td>
                    <td className="p-4 border dark:border-zinc-800 bg-yellow-400 dark:bg-yellow-500/10 dark:text-yellow-600">10</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* CAJA DE COMENTARIOS / ANÁLISIS (Se despliega al hacer clic en las celdas) */}
            {activeVuln && (
              <div className="w-full max-w-4xl animate-fade-in mt-4">
                <div className="bg-slate-900 dark:bg-[#09090b] border border-slate-700 dark:border-zinc-800 rounded-lg p-6 shadow-2xl relative overflow-hidden">

                  {activeVuln === 'v1' && (
                    <>
                      <div className="absolute top-0 left-0 w-1 h-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,1)]"></div>
                      <h4 className="text-2xl font-black text-red-500 mb-2">V1: Inyección SQL (Nivel 25 - Extremo)</h4>
                      <p className="text-zinc-300 mb-4"><strong>Justificación:</strong> Probabilidad 5 (Casi Certeza) x Impacto 5 (Catastrófico). Existen bots explotando esta falla automáticamente. Extracción masiva de BD destruye MercadoSur.</p>
                      <p className="text-cyan-400 font-mono text-sm">→ ACCIÓN PREVENTIVA: Obligatoriedad de Consultas Parametrizadas (Prepared Statements).</p>
                    </>
                  )}
                  {activeVuln === 'v2' && (
                    <>
                      <div className="absolute top-0 left-0 w-1 h-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,1)]"></div>
                      <h4 className="text-2xl font-black text-red-500 mb-2">V2: Inyección de Comandos (Nivel 20 - Extremo)</h4>
                      <p className="text-zinc-300 mb-4"><strong>Justificación:</strong> Probabilidad 4 (Probable) x Impacto 5 (Catastrófico). Permite RCE y control total del servidor Host Linux, afectando toda la tríada CIA.</p>
                      <p className="text-cyan-400 font-mono text-sm">→ ACCIÓN PREVENTIVA: Erradicación de Invocaciones al Shell. Uso de Sandboxing.</p>
                    </>
                  )}
                  {activeVuln === 'v3' && (
                    <>
                      <div className="absolute top-0 left-0 w-1 h-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,1)]"></div>
                      <h4 className="text-2xl font-black text-orange-400 mb-2">V3: XSS Reflejado (Nivel 12 - Alto)</h4>
                      <p className="text-zinc-300 mb-4"><strong>Justificación:</strong> Probabilidad 4 (Probable) x Impacto 3 (Moderado). Requiere ingeniería social para engañar al usuario. Compromete sesiones individuales (Session Hijacking).</p>
                      <p className="text-cyan-400 font-mono text-sm">→ ACCIÓN PREVENTIVA: Implementar Output Encoding estricto en las vistas.</p>
                    </>
                  )}
                  <button onClick={() => setActiveVuln(null)} className="absolute top-4 right-4 text-zinc-500 hover:text-white">✕</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* === MÓDULO: DRP === */}
        {activeModule === 'drp' && (
          <div className="animate-fade-in space-y-8">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Plan de Recuperación (DRP)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="dark:bg-zinc-900/50 bg-white p-8 rounded-xl border border-slate-200 dark:border-emerald-900/30 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 text-9xl">⏱️</div>
                <h3 className="text-2xl font-bold mb-6 relative z-10 dark:text-white">Métricas Críticas</h3>
                <div className="space-y-6 relative z-10">
                  <div>
                    <span className="block text-5xl font-black dark:text-zinc-100 mb-1">15 Min</span>
                    <span className="text-emerald-600 dark:text-emerald-500 font-bold uppercase tracking-widest text-sm">RPO (Pérdida Tolerable)</span>
                  </div>
                  <div>
                    <span className="block text-5xl font-black dark:text-zinc-100 mb-1">2 Horas</span>
                    <span className="text-emerald-600 dark:text-emerald-500 font-bold uppercase tracking-widest text-sm">RTO (Tiempo de Recuperación)</span>
                  </div>
                </div>
              </div>
              <div className="dark:bg-zinc-900/50 bg-white p-8 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-lg">
                <h3 className="text-2xl font-bold mb-4 dark:text-white">Fases de Continuidad</h3>
                <ul className="space-y-4 text-slate-700 dark:text-zinc-300">
                  <li className="flex gap-3"><span className="text-emerald-500">✔</span> <strong>Backup 3-2-1 Inmutable:</strong> Evita encriptación por ransomware y secuestro de datos operativos.</li>
                  <li className="flex gap-3"><span className="text-emerald-500">✔</span> <strong>Comité de Crisis (RACI):</strong> Protocolo de escalamiento para CISO, DevSecOps y Legales.</li>
                  <li className="flex gap-3"><span className="text-emerald-500">✔</span> <strong>Simulacros:</strong> Pruebas Tabletop semestrales y Failover anual en Hot Standby.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* === MÓDULO: BITÁCORA IA === */}
        {activeModule === 'bitacora' && (
          <div className="animate-fade-in space-y-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-black uppercase text-fuchsia-600 dark:text-fuchsia-500 flex items-center gap-3">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5h2v2H9v-2zm0-6h2v4H9V5z" /></svg>
              Bitácora de IA - Prompts
            </h2>
            <div className="dark:bg-[#0a0610] bg-fuchsia-50 p-8 rounded-xl border border-fuchsia-200 dark:border-fuchsia-900/30 shadow-lg">
              <p className="mb-6 text-lg dark:text-zinc-300">Registro (09_prompts_barmic.md) utilizado para estructurar la auditoría guiada.</p>

              <div className="space-y-6">
                <div className="dark:bg-zinc-900/80 bg-white p-6 rounded-lg border-l-4 border-l-fuchsia-500 shadow-sm">
                  <h4 className="font-bold text-slate-800 dark:text-fuchsia-400 mb-2">Prompt 01: Inicialización & DevSecOps</h4>
                  <p className="italic text-slate-600 dark:text-zinc-400 text-sm">"Estoy montando el entorno para una auditoría de seguridad web de un e-commerce ficticio llamado MercadoSur... Dame los comandos exactos de terminal para inicializar el proyecto..."</p>
                </div>
                <div className="dark:bg-zinc-900/80 bg-white p-6 rounded-lg border-l-4 border-l-fuchsia-500 shadow-sm">
                  <h4 className="font-bold text-slate-800 dark:text-fuchsia-400 mb-2">Prompt 02: SQLi y Métrica CVSS</h4>
                  <p className="italic text-slate-600 dark:text-zinc-400 text-sm">"Actúa como auditora de seguridad. Necesito redactar el archivo Markdown 02_sqli_barmic.md para evidenciar el ataque... Justifica el CVSS de 9.8."</p>
                </div>
                <div className="dark:bg-zinc-900/80 bg-white p-6 rounded-lg border-l-4 border-l-fuchsia-500 shadow-sm">
                  <h4 className="font-bold text-slate-800 dark:text-fuchsia-400 mb-2">Prompt 03: Matriz de Riesgos & DRP</h4>
                  <p className="italic text-slate-600 dark:text-zinc-400 text-sm">"Construye una matriz probabilidad × impacto con mapa de calor (colores), ubicando las 3 vulnerabilidades... Desarrolla un Plan de Recuperación ante Desastres (DRP) exhaustivo."</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* === FOOTER MINIMALISTA === */}
      <footer className="mt-auto py-6 bg-white dark:bg-[#030303] border-t border-slate-200 dark:border-zinc-900/80 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-xs md:text-sm">
          <div className="text-slate-500 dark:text-zinc-600 font-mono tracking-widest uppercase flex items-center">
            AGENTE: <span className="text-cyan-600 dark:text-cyan-500 font-bold ml-2">MICHELE BARRIGA</span>
          </div>

          <a
            href="https://github.com/Michprogram"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md bg-slate-100 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800 text-slate-500 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-white hover:border-cyan-500 dark:hover:border-cyan-500 hover:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all"
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