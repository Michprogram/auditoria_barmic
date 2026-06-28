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

            <div className="dark:bg-zinc-900/50 bg-white p-8 rounded-xl border border-slate-200 dark:border-zinc-800">
              <h3 className="text-2xl font-bold mb-4 dark:text-cyan-400 border-b dark:border-zinc-700 pb-2">1. Contexto del Negocio y Alcance</h3>
              <p className="text-slate-700 dark:text-zinc-300 leading-relaxed mb-4">
                El presente informe consolida los hallazgos técnicos, la evaluación de riesgos corporativos y las estrategias de remediación resultantes de la auditoría de ciberseguridad realizada al portal de clientes de <strong>MercadoSur</strong>, una empresa del rubro de comercio electrónico (E-commerce). Como plataforma de ventas online, el portal gestiona diariamente información crítica: datos de identificación personal (PII), direcciones de despacho, historiales de compra y la integración con pasarelas de pago electrónico. La resiliencia de esta plataforma no solo sostiene la operatividad financiera, sino también la reputación de la marca y la confianza de sus usuarios.
              </p>
              <p className="text-slate-700 dark:text-zinc-300 leading-relaxed">
                Las pruebas de penetración se ejecutaron en un ambiente controlado (entorno DVWA) autorizado para esta actividad, simulando el nivel de seguridad actual ("Low") del portal web de MercadoSur. El objetivo fue identificar brechas en la validación de los datos de entrada que pudieran comprometer la confidencialidad, integridad o disponibilidad (Tríada CIA) de los activos de la empresa.
              </p>
            </div>

            <div className="dark:bg-zinc-900/50 bg-white p-8 rounded-xl border border-slate-200 dark:border-zinc-800">
              <h3 className="text-2xl font-bold mb-4 dark:text-cyan-400 border-b dark:border-zinc-700 pb-2">2. Activos de Información Identificados</h3>
              <p className="text-slate-700 dark:text-zinc-300 leading-relaxed mb-4">
                Se evaluó el impacto de las amenazas sobre seis activos críticos para la cadena de valor y operatividad del e-commerce:
              </p>
              <ul className="list-disc pl-6 text-slate-700 dark:text-zinc-300 space-y-2">
                <li><strong>Base de Datos de Clientes:</strong> Información de Identificación Personal (PII) y contraseñas.</li>
                <li><strong>Pasarela de Pagos y Facturación:</strong> Integridad de transacciones.</li>
                <li><strong>Servidores Web y Sistema Operativo:</strong> Infraestructura host que mantiene la tienda 24/7.</li>
                <li><strong>Historial Logístico y de Despachos:</strong> Registros operativos logísticos.</li>
                <li><strong>Código Fuente de la Aplicación:</strong> Propiedad intelectual y algoritmos.</li>
                <li><strong>Reputación de Marca:</strong> Percepción de confianza del consumidor.</li>
              </ul>
            </div>

            <div className="dark:bg-zinc-900/50 bg-white p-8 rounded-xl border border-slate-200 dark:border-zinc-800 overflow-x-auto">
              <h3 className="text-2xl font-bold mb-4 dark:text-cyan-400 border-b dark:border-zinc-700 pb-2">3. Consolidado de Vulnerabilidades (CVSS v3.1)</h3>
              <p className="text-slate-700 dark:text-zinc-300 leading-relaxed mb-4">
                Se lograron demostrar y explotar con éxito tres vectores de ataque críticos. A continuación, se presenta la tabla unificada con la clasificación de severidad utilizando el estándar Common Vulnerability Scoring System (CVSS v3.1):
              </p>
              <table className="w-full text-left border-collapse mt-4">
                <thead>
                  <tr className="border-b dark:border-zinc-700 text-sm uppercase tracking-wider text-slate-500 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-800/50">
                    <th className="p-4">Hallazgo Técnico</th>
                    <th className="p-4">Vector de Ataque CVSS v3.1</th>
                    <th className="p-4">Puntaje Base</th>
                    <th className="p-4">Severidad</th>
                  </tr>
                </thead>
                <tbody className="text-slate-800 dark:text-zinc-200">
                  <tr className="border-b dark:border-zinc-800/50 hover:bg-slate-50 dark:hover:bg-zinc-800/30">
                    <td className="p-4 font-bold">Inyección SQL (SQLi)</td>
                    <td className="p-4 font-mono text-xs text-cyan-500">AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H</td>
                    <td className="p-4 font-black text-red-500 text-lg">9.8</td>
                    <td className="p-4">🔴 Crítica</td>
                  </tr>
                  <tr className="border-b dark:border-zinc-800/50 hover:bg-slate-50 dark:hover:bg-zinc-800/30">
                    <td className="p-4 font-bold">Inyección de Comandos OS</td>
                    <td className="p-4 font-mono text-xs text-fuchsia-500">AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H</td>
                    <td className="p-4 font-black text-red-500 text-lg">9.8</td>
                    <td className="p-4">🔴 Crítica</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-zinc-800/30">
                    <td className="p-4 font-bold">Cross-Site Scripting (XSS Reflejado)</td>
                    <td className="p-4 font-mono text-xs text-amber-500">AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N</td>
                    <td className="p-4 font-black text-orange-400 text-lg">6.1</td>
                    <td className="p-4">🟠 Media</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="dark:bg-zinc-900/50 bg-white p-8 rounded-xl border border-slate-200 dark:border-zinc-800">
              <h3 className="text-2xl font-bold mb-4 dark:text-cyan-400 border-b dark:border-zinc-700 pb-2">4. Evaluación de Riesgos y Estrategia de Defensa en Profundidad</h3>
              <p className="text-slate-700 dark:text-zinc-300 leading-relaxed mb-4">
                Aplicando una metodología de evaluación de Riesgo Inherente (Probabilidad × Impacto), se definió la remediación de **Prioridad 1 para SQLi (Riesgo Extremo 25)**, **Prioridad 2 para Inyección de Comandos (Riesgo Extremo 20)**, y **Prioridad 3 para XSS Reflejado (Riesgo Alto 12)**. Para neutralizar estos riesgos, se diseñó un modelo de seguridad multicapa:
              </p>
              <ul className="list-disc pl-6 text-slate-700 dark:text-zinc-300 space-y-2 mb-6">
                <li><strong>Políticas de Prevención (Código Seguro):</strong> Implementación obligatoria de Consultas Parametrizadas (Prepared Statements), codificación de salida estricta (Output Encoding) y validación por listas blancas, erradicando la invocación directa a la terminal del sistema.</li>
                <li><strong>Controles de Mitigación (Infraestructura):</strong> Despliegue de un Web Application Firewall (WAF) perimetral, aislamiento de procesos mediante contenedores (Sandboxing), aplicación del Principio del Menor Privilegio (PoLP) en motores de bases de datos y emisión de políticas CSP.</li>
              </ul>

              <h4 className="text-xl font-bold mb-2 dark:text-emerald-400 mt-6">Continuidad de Negocio (DRP)</h4>
              <p className="text-slate-700 dark:text-zinc-300 leading-relaxed">
                Se estableció un Plan de Recuperación ante Desastres garantizando un RPO (Pérdida de datos tolerable) de 15 minutos y RTO (Tiempo de inactividad) máximo de 2 horas. Adopción de la regla 3-2-1 con copias inmutables (WORM) off-site y establecimiento de un Comité de Emergencia (RACI).
              </p>
            </div>
          </div>
        )}

        {/* === MÓDULOS DE VULNERABILIDADES (SQLi, Comandos, XSS) === */}
        {/* SQLi */}
        {activeModule === 'sqli' && (
          <div className="animate-fade-in space-y-8">
            <div className="border-b-4 border-red-600 pb-4">
              <h2 className="text-4xl font-black text-red-600 dark:text-red-500 uppercase tracking-tighter drop-shadow-md">1. Inyección SQL (SQLi)</h2>
              <p className="text-xl text-slate-500 dark:text-zinc-400 font-mono mt-2">Nivel de Severidad: 🔴 CRÍTICA (CVSS: 9.8)</p>
            </div>

            <div className="dark:bg-zinc-900/40 bg-white p-8 rounded-xl border border-slate-200 dark:border-zinc-800/80 shadow-lg space-y-8">

              {/* Payload Block */}
              <div>
                <h3 className="text-2xl font-bold dark:text-cyan-400 mb-4 flex items-center gap-2"><span className="text-xl">💉</span> Vector de Ataque Explotado</h3>
                <div className="bg-black text-cyan-400 font-mono p-5 rounded-lg border border-cyan-900/50 shadow-[0_0_20px_rgba(6,182,212,0.15)] overflow-x-auto relative group">
                  <div className="absolute top-2 right-3 text-[10px] text-cyan-700 tracking-widest">PAYLOAD ENTORNO DVWA</div>
                  <pre className="text-lg"><code>' OR '1'='1</code></pre>
                </div>
              </div>

              {/* Imágenes Evidencia */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-slate-200 dark:border-zinc-800 rounded-lg p-3 dark:bg-[#020202] shadow-inner">
                  <p className="text-xs font-mono mb-3 text-center text-slate-500 dark:text-zinc-500 border-b dark:border-zinc-800 pb-2">INPUT: docs_barmic/img_barmic/sqli_barmic.png</p>
                  <img src="/docs_barmic/img_barmic/sqli_barmic.png" alt="Evidencia SQLi" className="w-full rounded border dark:border-zinc-800" />
                </div>
                <div className="border border-slate-200 dark:border-zinc-800 rounded-lg p-3 dark:bg-[#020202] shadow-inner">
                  <p className="text-xs font-mono mb-3 text-center text-slate-500 dark:text-zinc-500 border-b dark:border-zinc-800 pb-2">OUTPUT: docs_barmic/img_barmic/p-sqli_barmic.png</p>
                  <img src="/docs_barmic/img_barmic/p-sqli_barmic.png" alt="Evidencia resultado SQLi" className="w-full rounded border dark:border-zinc-800" />
                </div>
              </div>

              {/* Análisis Técnico */}
              <div>
                <h3 className="text-2xl font-bold dark:text-cyan-400 mb-3 border-l-4 border-cyan-500 pl-3">Análisis Técnico y Mecanismo de Falla</h3>
                <p className="text-slate-700 dark:text-zinc-300 leading-relaxed mb-4 text-lg">
                  La Inyección SQL ocurre cuando una aplicación web inserta directamente los datos proporcionados por el usuario en una consulta hacia la base de datos sin una validación o parametrización adecuada. En el entorno DVWA, el formulario de búsqueda recibe un ID de usuario y lo concatena dinámicamente con la sentencia SQL de <i>backend</i>.
                </p>
                <p className="text-slate-700 dark:text-zinc-300 leading-relaxed text-lg">
                  Al ingresar el payload <code className="text-cyan-500 bg-zinc-900 px-2 py-1 rounded">{'\' OR \'1\'=\'1'}</code>, el atacante cierra deliberadamente la instrucción original con la comilla simple e introduce una operación lógica <strong>OR</strong> seguida de una <strong>tautología matemática</strong> (1 siempre será igual a 1, por lo que la condición siempre es verdadera). Esto fuerza al motor de la base de datos a ignorar las restricciones de búsqueda y devolver absolutamente todos los registros de la tabla de usuarios, logrando un bypass total de las validaciones de acceso.
                </p>
              </div>

              {/* Impacto */}
              <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-lg border border-red-200 dark:border-red-900/30">
                <h3 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-3">Impacto en MercadoSur</h3>
                <p className="text-slate-700 dark:text-zinc-300 leading-relaxed text-lg">
                  Esta vulnerabilidad pone en <strong>riesgo crítico el Activo 1 (Base de Datos de Clientes) y el Activo 4 (Historial Logístico)</strong>. Permite la exfiltración masiva e inmediata de Información de Identificación Personal (PII) de los clientes de MercadoSur, tales como nombres, correos electrónicos y contraseñas hasheadas. El robo masivo de bases de datos desencadena destrucción de confianza (Activo 6 - Reputación), exposición a extorsiones por cibercriminales y graves multas legales por incumplimiento a la protección de datos en e-commerce.
                </p>
              </div>

              {/* Justificación CVSS */}
              <div>
                <h3 className="text-2xl font-bold dark:text-cyan-400 mb-3 border-l-4 border-cyan-500 pl-3">Justificación de la Métrica CVSS v3.1 (9.8 Crítica)</h3>
                <ul className="list-none space-y-3 text-slate-700 dark:text-zinc-300 text-lg">
                  <li><strong className="text-cyan-600 dark:text-cyan-400">Vector de Ataque (AV: Network):</strong> La falla es explotable de forma remota a través de internet.</li>
                  <li><strong className="text-cyan-600 dark:text-cyan-400">Complejidad (AC: Low):</strong> El payload es estándar, trivial de ejecutar y existen herramientas automatizadas (como SQLmap) que lo explotan sin conocimiento especializado.</li>
                  <li><strong className="text-cyan-600 dark:text-cyan-400">Privilegios (PR: None):</strong> El atacante no requiere estar autenticado en la plataforma para realizar la inyección en el formulario público.</li>
                  <li><strong className="text-cyan-600 dark:text-cyan-400">Interacción (UI: None):</strong> Se ejecuta directamente contra el servidor sin depender de la interacción de ninguna víctima.</li>
                  <li><strong className="text-cyan-600 dark:text-cyan-400">Impacto CIA (C: High, I: High, A: High):</strong> Colapso total; el atacante puede leer todos los datos (Confidencialidad), modificarlos o borrarlos (Integridad), y eliminar las tablas (Disponibilidad).</li>
                </ul>
              </div>

              {/* Políticas y Controles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-slate-100 dark:bg-zinc-800/50 p-6 rounded-lg border-t-4 border-emerald-500 shadow-sm">
                  <h4 className="text-xl font-bold dark:text-emerald-400 mb-3">Políticas de Prevención (SSDLC)</h4>
                  <ul className="list-disc pl-5 space-y-2 dark:text-zinc-300 text-base">
                    <li><strong>Consultas Parametrizadas (Prepared Statements):</strong> Prohibición absoluta de la concatenación dinámica. Separación estructural entre el código y los datos de entrada para que el motor SQL lo lea solo como valor literal.</li>
                    <li><strong>Uso de ORM:</strong> Implementación de Mapeadores Objeto-Relacionales en el backend.</li>
                    <li><strong>Validación de Tipos Estricta:</strong> Forzar validación en backend (ej. `parseInt` para identificadores numéricos).</li>
                  </ul>
                </div>
                <div className="bg-slate-100 dark:bg-zinc-800/50 p-6 rounded-lg border-t-4 border-blue-500 shadow-sm">
                  <h4 className="text-xl font-bold dark:text-blue-400 mb-3">Controles de Mitigación (Infraestructura)</h4>
                  <ul className="list-disc pl-5 space-y-2 dark:text-zinc-300 text-base">
                    <li><strong>Despliegue WAF Perimetral (OWASP):</strong> Implementación de Firewall de Capa 7 configurado con el OWASP Core Rule Set para interceptar firmas `OR 1=1` antes de llegar al código web.</li>
                    <li><strong>Principio PoLP (NIST SP 800-53):</strong> Configuración del usuario de BD con permisos mínimos (Solo DML: SELECT, INSERT), bloqueando permisos DDL (DROP, ALTER).</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comandos OS */}
        {activeModule === 'comandos' && (
          <div className="animate-fade-in space-y-8">
            <div className="border-b-4 border-red-600 pb-4">
              <h2 className="text-4xl font-black text-red-600 dark:text-red-500 uppercase tracking-tighter drop-shadow-md">2. Inyección de Comandos OS</h2>
              <p className="text-xl text-slate-500 dark:text-zinc-400 font-mono mt-2">Nivel de Severidad: 🔴 CRÍTICA (CVSS: 9.8)</p>
            </div>

            <div className="dark:bg-zinc-900/40 bg-white p-8 rounded-xl border border-slate-200 dark:border-zinc-800/80 shadow-lg space-y-8">

              {/* Payload Block */}
              <div>
                <h3 className="text-2xl font-bold dark:text-fuchsia-400 mb-4 flex items-center gap-2"><span className="text-xl">⚙️</span> Vector de Ataque Explotado (RCE)</h3>
                <div className="bg-black text-fuchsia-400 font-mono p-5 rounded-lg border border-fuchsia-900/50 shadow-[0_0_20px_rgba(217,70,239,0.15)] overflow-x-auto relative group">
                  <div className="absolute top-2 right-3 text-[10px] text-fuchsia-700 tracking-widest">PAYLOAD RCE TERMINAL</div>
                  <pre className="text-lg"><code>127.0.0.1; cat /etc/passwd</code></pre>
                </div>
              </div>

              {/* Imágenes Evidencia */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-slate-200 dark:border-zinc-800 rounded-lg p-3 dark:bg-[#020202] shadow-inner">
                  <p className="text-xs font-mono mb-3 text-center text-slate-500 dark:text-zinc-500 border-b dark:border-zinc-800 pb-2">INPUT: docs_barmic/img_barmic/command-injection_barmic.png</p>
                  <img src="/docs_barmic/img_barmic/command-injection_barmic.png" alt="Evidencia Payload Comandos" className="w-full rounded border dark:border-zinc-800" />
                </div>
                <div className="border border-slate-200 dark:border-zinc-800 rounded-lg p-3 dark:bg-[#020202] shadow-inner">
                  <p className="text-xs font-mono mb-3 text-center text-slate-500 dark:text-zinc-500 border-b dark:border-zinc-800 pb-2">OUTPUT: docs_barmic/img_barmic/p-command-injection_barmic.png</p>
                  <img src="/docs_barmic/img_barmic/p-command-injection_barmic.png" alt="Evidencia Resultado Ejecución" className="w-full rounded border dark:border-zinc-800" />
                </div>
              </div>

              {/* Análisis Técnico */}
              <div>
                <h3 className="text-2xl font-bold dark:text-fuchsia-400 mb-3 border-l-4 border-fuchsia-500 pl-3">Análisis Técnico y Mecanismo de Falla</h3>
                <p className="text-slate-700 dark:text-zinc-300 leading-relaxed mb-4 text-lg">
                  La Inyección de Comandos OS ocurre cuando el código de la aplicación transfiere parámetros suministrados por el usuario directamente a la shell del sistema operativo (por ejemplo, funciones como <code>system()</code> o <code>exec()</code>) sin sanitización. En DVWA, un campo diseñado para hacer `ping` a una IP no filtra caracteres especiales.
                </p>
                <p className="text-slate-700 dark:text-zinc-300 leading-relaxed text-lg">
                  El operador punto y coma (<code className="text-fuchsia-400 bg-zinc-900 px-2 py-1 rounded">;</code>) actúa como un delimitador de comandos en sistemas basados en Linux. Al inyectar <code>127.0.0.1; cat /etc/passwd</code>, la terminal ejecuta primero el ping al localhost, y luego ejecuta secuencialmente el comando inyectado, permitiendo la lectura del archivo de configuración de usuarios del sistema operativo, resultando en Ejecución Remota de Código (RCE).
                </p>
              </div>

              {/* Impacto */}
              <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-lg border border-red-200 dark:border-red-900/30">
                <h3 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-3">Impacto en MercadoSur</h3>
                <p className="text-slate-700 dark:text-zinc-300 leading-relaxed text-lg">
                  Esta vulnerabilidad supone un impacto crítico sobre el <strong>Activo 3 (Servidor Web Host) y, por consecuencia, la destrucción de TODOS los activos</strong>. Al obtener Ejecución Remota de Código, el atacante toma control del intérprete de comandos del SO. Desde ahí, puede apagar los servidores comerciales de MercadoSur, acceder al código fuente (Activo 5) para desviar la pasarela de pagos, o extraer credenciales hardcodeadas para exfiltrar la base de datos completa.
                </p>
              </div>

              {/* Justificación CVSS */}
              <div>
                <h3 className="text-2xl font-bold dark:text-fuchsia-400 mb-3 border-l-4 border-fuchsia-500 pl-3">Justificación de la Métrica CVSS v3.1 (9.8 Crítica)</h3>
                <ul className="list-none space-y-3 text-slate-700 dark:text-zinc-300 text-lg">
                  <li><strong className="text-fuchsia-600 dark:text-fuchsia-400">Vector de Ataque (AV: Network):</strong> La falla de RCE se invoca desde la web pública.</li>
                  <li><strong className="text-fuchsia-600 dark:text-fuchsia-400">Complejidad (AC: Low):</strong> Requiere el simple conocimiento de delimitadores Unix (`;`, `&&`, `|`).</li>
                  <li><strong className="text-fuchsia-600 dark:text-fuchsia-400">Privilegios e Interacción (PR: None, UI: None):</strong> No necesita cuentas privilegiadas ni que otro usuario del e-commerce interactúe.</li>
                  <li><strong className="text-fuchsia-600 dark:text-fuchsia-400">Impacto CIA (C: High, I: High, A: High):</strong> El atacante se convierte efectivamente en el administrador del sistema operativo del servidor.</li>
                </ul>
              </div>

              {/* Políticas y Controles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-slate-100 dark:bg-zinc-800/50 p-6 rounded-lg border-t-4 border-emerald-500 shadow-sm">
                  <h4 className="text-xl font-bold dark:text-emerald-400 mb-3">Políticas de Prevención (SSDLC)</h4>
                  <ul className="list-disc pl-5 space-y-2 dark:text-zinc-300 text-base">
                    <li><strong>Prohibición de Invocación del Shell:</strong> Bloqueo estricto de funciones nativas que interactúen con la terminal de Linux. Utilizar APIs del lenguaje de programación.</li>
                    <li><strong>Listas Blancas (Whitelisting):</strong> Si se requiere entrada del usuario para interactuar indirectamente con el sistema, validar contra RegEx permitiendo solo caracteres alfanuméricos, denegando todo carácter especial (`;`, `|`, `&`).</li>
                  </ul>
                </div>
                <div className="bg-slate-100 dark:bg-zinc-800/50 p-6 rounded-lg border-t-4 border-blue-500 shadow-sm">
                  <h4 className="text-xl font-bold dark:text-blue-400 mb-3">Controles de Mitigación (Infraestructura)</h4>
                  <ul className="list-disc pl-5 space-y-2 dark:text-zinc-300 text-base">
                    <li><strong>Aislamiento Sandboxing (CIS Controls v8):</strong> Ejecutar la aplicación de MercadoSur exclusivamente dentro de un contenedor Docker efímero con sistema de archivos solo-lectura (Read-Only Root Filesystem).</li>
                    <li><strong>Hardening de SO (NIST SP 800-123):</strong> Ejecutar el servidor web (Nginx/Apache) bajo un usuario fuertemente restringido (ej. `www-data`), sin permisos de acceso a herramientas de red del host.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* XSS Reflejado */}
        {activeModule === 'xss' && (
          <div className="animate-fade-in space-y-8">
            <div className="border-b-4 border-orange-500 pb-4">
              <h2 className="text-4xl font-black text-orange-500 dark:text-orange-500 uppercase tracking-tighter drop-shadow-md">3. Cross-Site Scripting (XSS Reflejado)</h2>
              <p className="text-xl text-slate-500 dark:text-zinc-400 font-mono mt-2">Nivel de Severidad: 🟠 MEDIA (CVSS: 6.1)</p>
            </div>

            <div className="dark:bg-zinc-900/40 bg-white p-8 rounded-xl border border-slate-200 dark:border-zinc-800/80 shadow-lg space-y-8">

              {/* Payload Block */}
              <div>
                <h3 className="text-2xl font-bold dark:text-amber-400 mb-4 flex items-center gap-2"><span className="text-xl">🎣</span> Vector de Ataque Explotado</h3>
                <div className="bg-black text-amber-400 font-mono p-5 rounded-lg border border-amber-900/50 shadow-[0_0_20px_rgba(251,191,36,0.15)] overflow-x-auto relative group">
                  <div className="absolute top-2 right-3 text-[10px] text-amber-700 tracking-widest">PAYLOAD SCRIPT</div>
                  <pre className="text-lg"><code>{`<script>alert('auditoria_barmic')</script>`}</code></pre>
                </div>
              </div>

              {/* Imágenes Evidencia */}
              <div className="border border-slate-200 dark:border-zinc-800 rounded-lg p-3 dark:bg-[#020202] shadow-inner max-w-2xl mx-auto">
                <p className="text-xs font-mono mb-3 text-center text-slate-500 dark:text-zinc-500 border-b dark:border-zinc-800 pb-2">OUTPUT SCRIPT EXECUTED: docs_barmic/img_barmic/p-XSS_barmic.png</p>
                <img src="/docs_barmic/img_barmic/p-XSS_barmic.png" alt="Evidencia Ejecución XSS" className="w-full rounded border dark:border-zinc-800" />
              </div>

              {/* Análisis Técnico */}
              <div>
                <h3 className="text-2xl font-bold dark:text-amber-400 mb-3 border-l-4 border-amber-500 pl-3">Análisis Técnico y Mecanismo de Falla</h3>
                <p className="text-slate-700 dark:text-zinc-300 leading-relaxed mb-4 text-lg">
                  La vulnerabilidad XSS (Cross-Site Scripting) ocurre cuando la aplicación web recibe datos en una solicitud HTTP y los incluye de vuelta en la respuesta HTML sin realizar una codificación ni sanitización adecuada (Output Encoding). En este caso, de tipo <strong>Reflejado</strong>, el código malicioso no se guarda en la base de datos, sino que rebota desde el servidor hacia el cliente.
                </p>
                <p className="text-slate-700 dark:text-zinc-300 leading-relaxed text-lg">
                  Al enviar el payload <code className="text-amber-400 bg-zinc-900 px-2 py-1 rounded">&lt;script&gt;</code> a través de un parámetro de URL o formulario, el servidor devuelve el mismo bloque de texto renderizado. El navegador del cliente, al no distinguir entre el código legítimo de MercadoSur y la inyección externa, ejecuta el JavaScript malicioso en el contexto de confianza del dominio del e-commerce.
                </p>
              </div>

              {/* Impacto */}
              <div className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-lg border border-orange-200 dark:border-orange-900/30">
                <h3 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-3">Impacto en MercadoSur</h3>
                <p className="text-slate-700 dark:text-zinc-300 leading-relaxed text-lg">
                  Amenaza directamente el <strong>Activo 2 (Plataforma de Pagos) y Activo 6 (Reputación de Marca)</strong>. Utilizando ingeniería social (phishing), un atacante puede inducir a un cliente a hacer clic en un enlace malicioso de MercadoSur. Esto facilita el secuestro de la sesión (<em>Session Hijacking</em>), permitiendo robar cookies autenticadas e interceptar credenciales en plena pasarela de pago, destruyendo la confianza en la seguridad de la plataforma comercial.
                </p>
              </div>

              {/* Justificación CVSS */}
              <div>
                <h3 className="text-2xl font-bold dark:text-amber-400 mb-3 border-l-4 border-amber-500 pl-3">Justificación de la Métrica CVSS v3.1 (6.1 Media)</h3>
                <ul className="list-none space-y-3 text-slate-700 dark:text-zinc-300 text-lg">
                  <li><strong className="text-amber-600 dark:text-amber-400">Alcance (Scope: Changed - S:C):</strong> El impacto transita desde la aplicación web vulnerable hacia un componente diferente: el navegador web de la víctima.</li>
                  <li><strong className="text-amber-600 dark:text-amber-400">Interacción del Usuario (UI: Required):</strong> A diferencia de SQLi, XSS Reflejado exige obligatoriamente que el usuario legítimo haga clic en un enlace diseñado por el atacante (phishing).</li>
                  <li><strong className="text-amber-600 dark:text-amber-400">Impacto CIA (C: Low, I: Low, A: None):</strong> Afecta únicamente la sesión del cliente comprometido, pero no otorga control administrativo de los servidores ni tumba la disponibilidad de MercadoSur.</li>
                </ul>
              </div>

              {/* Políticas y Controles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-slate-100 dark:bg-zinc-800/50 p-6 rounded-lg border-t-4 border-emerald-500 shadow-sm">
                  <h4 className="text-xl font-bold dark:text-emerald-400 mb-3">Políticas de Prevención (SSDLC)</h4>
                  <ul className="list-disc pl-5 space-y-2 dark:text-zinc-300 text-base">
                    <li><strong>Codificación de Salida Sensible al Contexto (Output Encoding):</strong> Toda variable renderizada en el DOM debe ser convertida a sus entidades HTML (ej. de `&lt;` a `&amp;lt;`) antes de enviarse al navegador.</li>
                    <li>Uso de frameworks modernos (como React/Angular) que aplican auto-escaping por defecto, evitando métodos de inserción manual como `innerHTML`.</li>
                  </ul>
                </div>
                <div className="bg-slate-100 dark:bg-zinc-800/50 p-6 rounded-lg border-t-4 border-blue-500 shadow-sm">
                  <h4 className="text-xl font-bold dark:text-blue-400 mb-3">Controles de Mitigación (Infraestructura)</h4>
                  <ul className="list-disc pl-5 space-y-2 dark:text-zinc-300 text-base">
                    <li><strong>Content Security Policy (CSP - OWASP):</strong> Despliegue de cabeceras estrictas bloqueando ejecución de scripts en línea (`unsafe-inline`) limitando la carga solo a dominios seguros de MercadoSur.</li>
                    <li><strong>Banderas en Cookies (OWASP A05):</strong> Configuración forzosa de atributos `HttpOnly` (bloquea acceso desde JS) y `Secure` (solo transmite vía HTTPS) en los tokens de sesión de los clientes.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* === MÓDULO: ACTIVOS (DETALLE EXTENDIDO) === */}
        {activeModule === 'activos' && (
          <div className="animate-fade-in space-y-8">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight dark:text-white">Clasificación de <span className="text-cyan-500">Activos Críticos</span> de Información</h2>

            <div className="dark:bg-zinc-900/50 bg-white p-8 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 dark:text-cyan-400 border-b dark:border-zinc-700 pb-2">Contexto de la Industria (E-commerce)</h3>
              <p className="text-slate-700 dark:text-zinc-300 leading-relaxed text-lg">
                MercadoSur opera en el sector del comercio electrónico (E-commerce). En esta industria, la disponibilidad continua del servicio, la integridad de las transacciones financieras y la confidencialidad de los datos personales de los usuarios son los pilares del negocio. Cualquier brecha en estos pilares no solo genera pérdidas financieras directas, sino que destruye la confianza del consumidor y expone a la empresa a severas multas por infracción a las leyes de protección de datos personales.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  id: 1,
                  name: "Base de Datos de Clientes",
                  type: "Activo de Datos",
                  impact: "Confidencialidad Crítica",
                  desc: "Contiene Información de Identificación Personal (PII) crítica, como nombres completos, correos electrónicos, direcciones físicas, números de contacto y contraseñas cifradas. Pilar de la operación comercial."
                },
                {
                  id: 2,
                  name: "Plataforma y Pasarela de Pagos",
                  type: "Activo Financiero",
                  impact: "Integridad Crítica",
                  desc: "Módulos y tokens que procesan las transacciones con tarjetas de crédito/débito, validan los estados de compra y emiten la facturación electrónica hacia los sistemas contables."
                },
                {
                  id: 3,
                  name: "Servidor Web Host y SO",
                  type: "Activo de Infraestructura",
                  impact: "Disponibilidad Crítica",
                  desc: "Los clústeres Linux y los servicios web (ej. Apache/Nginx) que alojan y mantienen en línea el portal de MercadoSur visible para los consumidores 24/7."
                },
                {
                  id: 4,
                  name: "Historial y Gestión de Pedidos",
                  type: "Activo Operativo",
                  impact: "Integridad / Confidencialidad Alta",
                  desc: "Registros de compras históricas, direcciones exactas de despacho y coordinación del estado logístico de las entregas de última milla."
                },
                {
                  id: 5,
                  name: "Código Fuente de la Aplicación",
                  type: "Activo de Propiedad Intelectual",
                  impact: "Confidencialidad Crítica",
                  desc: "Repositorios del backend y frontend que contienen la lógica de negocio, algoritmos de precios y las credenciales (API Keys) de integraciones de MercadoSur."
                },
                {
                  id: 6,
                  name: "Reputación de Marca y Confianza",
                  type: "Activo Intangible",
                  impact: "Valor Estratégico",
                  desc: "La percepción de seguridad que tienen los usuarios al comprar en MercadoSur. Es un activo frágil, fundamental para la retención, fidelización y adquisición de clientes a largo plazo."
                },
              ].map(activo => (
                <div key={activo.id} className="p-8 rounded-xl border dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:dark:bg-zinc-800/70 transition-colors shadow-lg">
                  <div className="text-cyan-500 font-mono text-sm mb-2 border-b dark:border-zinc-700/50 pb-1 w-max">ACTIVO CRÍTICO 0{activo.id}</div>
                  <h3 className="text-2xl font-bold dark:text-zinc-100 mb-3">{activo.name}</h3>
                  <div className="flex flex-col gap-2 text-sm dark:text-zinc-400 mb-4 bg-slate-100 dark:bg-zinc-950 p-3 rounded">
                    <span><strong className="text-slate-800 dark:text-zinc-200">Clasificación:</strong> {activo.type}</span>
                    <span><strong className="text-slate-800 dark:text-zinc-200">Pilar Afectado:</strong> {activo.impact}</span>
                  </div>
                  <p className="text-slate-700 dark:text-zinc-300 leading-relaxed text-base">
                    {activo.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="dark:bg-zinc-900/50 bg-white p-8 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-lg mt-8">
              <h3 className="text-2xl font-bold mb-4 dark:text-red-400 border-b dark:border-zinc-700 pb-2">Asociación Directa Vulnerabilidades vs. Activos</h3>
              <p className="text-slate-700 dark:text-zinc-300 leading-relaxed text-lg mb-4">
                El mapa de riesgos detectado en la auditoría vincula a los activos de la siguiente manera:
              </p>
              <ul className="list-disc pl-6 text-slate-700 dark:text-zinc-300 space-y-4 text-lg">
                <li><strong>Inyección SQL (SQLi):</strong> Golpea directamente a los Activos 1, 4 y 6. Permite el robo masivo de la PII y la alteración de estados de pedidos, destruyendo la confianza pública inmediata.</li>
                <li><strong>XSS Reflejado:</strong> Amenaza los Activos 2 y 6. Permite el Session Hijacking, interceptando clientes durante el proceso de pago e inyectando formularios fraudulentos bajo el dominio legítimo de MercadoSur.</li>
                <li><strong>Inyección de Comandos (RCE):</strong> Compromete TODOS los activos (1 al 6). Otorga control absoluto del SO host (Activo 3). El atacante puede robar código fuente, borrar bases de datos y apagar completamente la operación comercial.</li>
              </ul>
            </div>
          </div>
        )}

        {/* === MÓDULO: CONTROLES DE MITIGACIÓN (EXTENDIDO) === */}
        {activeModule === 'controles' && (
          <div className="animate-fade-in space-y-8">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight dark:text-white">Controles de Mitigación <span className="text-fuchsia-500">Defensa en Profundidad</span></h2>
            <div className="dark:bg-zinc-900/50 bg-white p-8 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-lg mb-8">
              <h3 className="text-2xl font-bold mb-4 dark:text-cyan-400 border-b dark:border-zinc-700 pb-2">Enfoque de Mitigación de Arquitectura</h3>
              <p className="text-slate-700 dark:text-zinc-300 leading-relaxed text-lg">
                Mientras que las políticas de prevención (detalladas en cada vulnerabilidad) atacan la causa raíz a nivel de código fuente, los <strong>controles de mitigación</strong> se enfocan en la arquitectura y fortificación de infraestructura de MercadoSur. Estos controles asumen, bajo una filosofía Zero Trust, que las prevenciones a nivel de software podrían fallar o podría surgir una vulnerabilidad de Día Cero. Su misión es limitar drásticamente el impacto del ataque y la pivotación lateral.
              </p>
            </div>

            <div className="space-y-8">
              {/* Controles SQLi */}
              <div className="dark:bg-zinc-900/40 bg-white p-8 rounded-xl border-l-8 border-l-red-600 dark:border-zinc-800 shadow-xl">
                <h3 className="text-2xl font-bold dark:text-red-500 mb-6 border-b dark:border-zinc-700 pb-2">Controles Estructurales para Inyección SQL (Riesgo Extremo)</h3>
                <div className="space-y-6">
                  <div className="bg-slate-50 dark:bg-zinc-900/80 p-5 rounded-lg border border-slate-200 dark:border-zinc-700">
                    <h4 className="text-xl font-bold dark:text-cyan-400 mb-2">Control 1: Implementación de WAF Perimetral</h4>
                    <p className="text-slate-700 dark:text-zinc-300 mb-3"><strong>Descripción:</strong> Desplegar un Web Application Firewall (WAF) en la capa 7 (ej. AWS WAF, Cloudflare) en modo de inspección profunda y bloqueo. Analiza peticiones buscando tautologías (`OR 1=1`) antes de que toquen la lógica backend de MercadoSur.</p>
                    <p className="text-sm font-mono text-cyan-600 dark:text-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 p-2 rounded">Referencia: OWASP Top 10 (A03:2021-Injection) como control compensatorio robusto.</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-zinc-900/80 p-5 rounded-lg border border-slate-200 dark:border-zinc-700">
                    <h4 className="text-xl font-bold dark:text-cyan-400 mb-2">Control 2: Principio del Menor Privilegio (PoLP) en DB</h4>
                    <p className="text-slate-700 dark:text-zinc-300 mb-3"><strong>Descripción:</strong> Restringir la cuenta de servicio web que conecta a la base de datos a permisos mínimos estrictos (Solo DML). Bloquear absolutamente comandos DDL que permitan borrar o alterar tablas enteras si la aplicación se ve comprometida.</p>
                    <p className="text-sm font-mono text-cyan-600 dark:text-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 p-2 rounded">Referencia: NIST SP 800-53 (Control AC-6: Least Privilege).</p>
                  </div>
                </div>
              </div>

              {/* Controles RCE */}
              <div className="dark:bg-zinc-900/40 bg-white p-8 rounded-xl border-l-8 border-l-red-600 dark:border-zinc-800 shadow-xl">
                <h3 className="text-2xl font-bold dark:text-red-500 mb-6 border-b dark:border-zinc-700 pb-2">Controles Estructurales para Inyección de Comandos (Riesgo Extremo)</h3>
                <div className="space-y-6">
                  <div className="bg-slate-50 dark:bg-zinc-900/80 p-5 rounded-lg border border-slate-200 dark:border-zinc-700">
                    <h4 className="text-xl font-bold dark:text-fuchsia-400 mb-2">Control 1: Aislamiento mediante Sandboxing (Contenedores)</h4>
                    <p className="text-slate-700 dark:text-zinc-300 mb-3"><strong>Descripción:</strong> Ejecutar los servicios de MercadoSur en contenedores efímeros (Docker). Configurar Root Filesystem como de solo lectura. Evita que el atacante instale malware persistente en el SO subyacente.</p>
                    <p className="text-sm font-mono text-fuchsia-600 dark:text-fuchsia-500 bg-fuchsia-50 dark:bg-fuchsia-900/20 p-2 rounded">Referencia: CIS Controls v8 (Control 4: Compartimentación en internet).</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-zinc-900/80 p-5 rounded-lg border border-slate-200 dark:border-zinc-700">
                    <h4 className="text-xl font-bold dark:text-fuchsia-400 mb-2">Control 2: Hardening del Usuario de Servicio SO</h4>
                    <p className="text-slate-700 dark:text-zinc-300 mb-3"><strong>Descripción:</strong> El servidor web debe operar bajo un usuario sin privilegios en Linux. Bloquear acceso a archivos sensibles del host como <code>/etc/shadow</code> y restringir ejecución de binarios de red nativos (curl/wget) por parte de este usuario.</p>
                    <p className="text-sm font-mono text-fuchsia-600 dark:text-fuchsia-500 bg-fuchsia-50 dark:bg-fuchsia-900/20 p-2 rounded">Referencia: NIST SP 800-123 (Guide to General Server Security).</p>
                  </div>
                </div>
              </div>

              {/* Controles XSS */}
              <div className="dark:bg-zinc-900/40 bg-white p-8 rounded-xl border-l-8 border-l-orange-500 dark:border-zinc-800 shadow-xl">
                <h3 className="text-2xl font-bold dark:text-orange-500 mb-6 border-b dark:border-zinc-700 pb-2">Controles Estructurales para XSS Reflejado (Riesgo Alto)</h3>
                <div className="space-y-6">
                  <div className="bg-slate-50 dark:bg-zinc-900/80 p-5 rounded-lg border border-slate-200 dark:border-zinc-700">
                    <h4 className="text-xl font-bold dark:text-amber-400 mb-2">Control 1: Despliegue de CSP (Content Security Policy)</h4>
                    <p className="text-slate-700 dark:text-zinc-300 mb-3"><strong>Descripción:</strong> Emisión de cabeceras HTTP restrictivas que indican al navegador ejecutar únicamente scripts de dominios explícitamente autorizados por MercadoSur. Bloqueo severo de ejecución de <i>Inline Scripts</i> inyectados.</p>
                    <p className="text-sm font-mono text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-900/20 p-2 rounded">Referencia: OWASP Cheat Sheet Series (Content Security Policy).</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-zinc-900/80 p-5 rounded-lg border border-slate-200 dark:border-zinc-700">
                    <h4 className="text-xl font-bold dark:text-amber-400 mb-2">Control 2: Banderas de Seguridad en Cookies</h4>
                    <p className="text-slate-700 dark:text-zinc-300 mb-3"><strong>Descripción:</strong> Todo token de autenticación de MercadoSur debe poseer <code>HttpOnly</code> para que un payload XSS exitoso no pueda leer el objeto Document.Cookie de la pasarela, mitigando de raíz el Session Hijacking.</p>
                    <p className="text-sm font-mono text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-900/20 p-2 rounded">Referencia: OWASP Top 10 (A05:2021-Security Misconfiguration).</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* === MÓDULO: MATRIZ DE RIESGOS (INTERACTIVA) === */}
        {activeModule === 'matriz' && (
          <div className="animate-fade-in space-y-8 flex flex-col items-center w-full">
            <div className="text-center w-full max-w-4xl bg-zinc-900/40 p-8 rounded-xl border border-zinc-800 shadow-lg mb-4">
              <h2 className="text-4xl font-black uppercase text-red-600 dark:text-white dark:drop-shadow-[0_0_15px_rgba(239,68,68,0.5)] mb-4">
                Matriz IPER y Mapa de Calor
              </h2>
              <p className="text-slate-700 dark:text-zinc-300 leading-relaxed text-lg mb-6 text-left">
                Para evaluar las vulnerabilidades encontradas en el portal de MercadoSur, se emplea una metodología de evaluación de Riesgo Inherente basada en la fórmula <strong>Riesgo = Probabilidad × Impacto</strong>. Evaluado en escalas de 1 a 5, posicionando amenazas operativas comerciales.
              </p>
              <p className="dark:text-cyan-400 text-sm font-mono font-bold animate-pulse tracking-widest uppercase">
                HAZ CLIC EN LAS CELDAS RESALTADAS DE LA TABLA PARA DESPLEGAR EL ANÁLISIS IPER COMPLETO.
              </p>
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
                  <tr>
                    <td className="p-4 border dark:border-zinc-800 font-bold dark:bg-zinc-900/50 text-left">2. Menor</td>
                    <td className="p-4 border dark:border-zinc-800 bg-green-500 dark:bg-emerald-500/10 dark:text-emerald-600">2</td>
                    <td className="p-4 border dark:border-zinc-800 bg-green-500 dark:bg-emerald-500/10 dark:text-emerald-600">4</td>
                    <td className="p-4 border dark:border-zinc-800 bg-yellow-400 dark:bg-yellow-500/10 dark:text-yellow-600">6</td>
                    <td className="p-4 border dark:border-zinc-800 bg-yellow-400 dark:bg-yellow-500/10 dark:text-yellow-600">8</td>
                    <td className="p-4 border dark:border-zinc-800 bg-yellow-400 dark:bg-yellow-500/10 dark:text-yellow-600">10</td>
                  </tr>
                  <tr>
                    <td className="p-4 border dark:border-zinc-800 font-bold dark:bg-zinc-900/50 text-left">1. Insignificante</td>
                    <td className="p-4 border dark:border-zinc-800 bg-green-500 dark:bg-emerald-500/10 dark:text-emerald-600">1</td>
                    <td className="p-4 border dark:border-zinc-800 bg-green-500 dark:bg-emerald-500/10 dark:text-emerald-600">2</td>
                    <td className="p-4 border dark:border-zinc-800 bg-green-500 dark:bg-emerald-500/10 dark:text-emerald-600">3</td>
                    <td className="p-4 border dark:border-zinc-800 bg-green-500 dark:bg-emerald-500/10 dark:text-emerald-600">4</td>
                    <td className="p-4 border dark:border-zinc-800 bg-yellow-400 dark:bg-yellow-500/10 dark:text-yellow-600">5</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* CAJA DE COMENTARIOS / ANÁLISIS (Se despliega al hacer clic en las celdas) */}
            {activeVuln && (
              <div className="w-full max-w-4xl animate-fade-in mt-4">
                <div className="bg-slate-900 dark:bg-[#09090b] border border-slate-700 dark:border-zinc-800 rounded-xl p-8 shadow-2xl relative overflow-hidden">

                  {activeVuln === 'v1' && (
                    <>
                      <div className="absolute top-0 left-0 w-2 h-full bg-red-600 shadow-[0_0_20px_rgba(220,38,38,1)]"></div>
                      <h4 className="text-3xl font-black text-red-500 mb-4 ml-2">V1: Inyección SQL (Nivel 25 - Riesgo Extremo)</h4>
                      <p className="text-zinc-300 mb-4 text-lg ml-2">
                        <strong>Probabilidad (5 - Casi Certeza):</strong> El payload es trivial y no requiere conocimientos avanzados. Herramientas automatizadas escanean e-commerces constantemente sin interacción humana.
                      </p>
                      <p className="text-zinc-300 mb-6 text-lg ml-2">
                        <strong>Impacto (5 - Catastrófico):</strong> La extracción masiva de la base de datos destruye el núcleo del negocio de MercadoSur.
                      </p>
                      <div className="bg-red-950/40 p-4 rounded-lg ml-2 border border-red-900/50">
                        <p className="text-cyan-400 font-mono text-sm">→ PRIORIDAD 1 ESTRICTA. ACCIÓN: Detención de operaciones públicas hasta implementar Consultas Parametrizadas y type-juggling prevention.</p>
                      </div>
                    </>
                  )}
                  {activeVuln === 'v2' && (
                    <>
                      <div className="absolute top-0 left-0 w-2 h-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,1)]"></div>
                      <h4 className="text-3xl font-black text-red-500 mb-4 ml-2">V2: Inyección de Comandos (Nivel 20 - Riesgo Extremo)</h4>
                      <p className="text-zinc-300 mb-4 text-lg ml-2">
                        <strong>Probabilidad (4 - Probable):</strong> Explotación directa usando delimitador (;) pero con puntos de entrada marginalmente más oscurecidos que formularios de login.
                      </p>
                      <p className="text-zinc-300 mb-6 text-lg ml-2">
                        <strong>Impacto (5 - Catastrófico):</strong> Otorga RCE. Control absoluto del SO, permitiendo alterar el código transaccional de pagos o botar el servidor base.
                      </p>
                      <div className="bg-red-950/40 p-4 rounded-lg ml-2 border border-red-900/50">
                        <p className="text-cyan-400 font-mono text-sm">→ PRIORIDAD 2. ACCIÓN: Erradicación de invocaciones al shell, control por listas blancas y migrar el Host a Sandboxing (Contenedores).</p>
                      </div>
                    </>
                  )}
                  {activeVuln === 'v3' && (
                    <>
                      <div className="absolute top-0 left-0 w-2 h-full bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,1)]"></div>
                      <h4 className="text-3xl font-black text-orange-400 mb-4 ml-2">V3: XSS Reflejado (Nivel 12 - Riesgo Alto)</h4>
                      <p className="text-zinc-300 mb-4 text-lg ml-2">
                        <strong>Probabilidad (4 - Probable):</strong> Exige un vector extra de ingeniería social para persuadir a la víctima a interactuar con el enlace manipulado (phishing).
                      </p>
                      <p className="text-zinc-300 mb-6 text-lg ml-2">
                        <strong>Impacto (3 - Moderado):</strong> Compromete confidencialidad y sesiones individuales, afectando clientes focalizados, pero sin destruir la BD global de MercadoSur.
                      </p>
                      <div className="bg-orange-950/40 p-4 rounded-lg ml-2 border border-orange-900/50">
                        <p className="text-cyan-400 font-mono text-sm">→ PRIORIDAD 3. ACCIÓN: Implementar Codificación de Salida (Output Encoding) y forzar cabeceras CSP estrictas en el dominio.</p>
                      </div>
                    </>
                  )}
                  <button onClick={() => setActiveVuln(null)} className="absolute top-4 right-6 text-2xl text-zinc-500 hover:text-white transition-colors">✕</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* === MÓDULO: DRP (EXTENDIDO) === */}
        {activeModule === 'drp' && (
          <div className="animate-fade-in space-y-8">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Plan de Recuperación ante Desastres (DRP)</h2>
            <div className="dark:bg-zinc-900/40 bg-white p-8 rounded-xl border border-slate-200 dark:border-zinc-800/80 shadow-lg mb-8">
              <h3 className="text-2xl font-bold mb-4 dark:text-emerald-400 border-b dark:border-zinc-700 pb-2">Visión Estratégica de Continuidad E-commerce</h3>
              <p className="text-slate-700 dark:text-zinc-300 leading-relaxed text-lg">
                En MercadoSur, un minuto de inactividad o una brecha se traduce en pérdidas operativas graves. Este DRP establece la arquitectura de resiliencia obligatoria para absorber compromisos como RCE o exfiltraciones SQLi, estipulando segmentación de redes Zero Trust y virtualización inmutable como pilar fundacional previo a la crisis.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="dark:bg-zinc-900/50 bg-white p-8 rounded-xl border border-slate-200 dark:border-emerald-900/50 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 text-9xl pointer-events-none">⏱️</div>
                <h3 className="text-2xl font-bold mb-6 relative z-10 dark:text-white border-b border-emerald-900/50 pb-2 w-max">Métricas Objetivas</h3>
                <div className="space-y-8 relative z-10">
                  <div>
                    <span className="block text-6xl font-black dark:text-zinc-100 mb-1">15 Min</span>
                    <span className="text-emerald-600 dark:text-emerald-500 font-bold uppercase tracking-widest text-sm">RPO (Recovery Point Objective)</span>
                    <p className="dark:text-zinc-400 text-sm mt-2">Pérdida máxima de datos tolerable. MercadoSur no puede perder transacciones de clientes recientes.</p>
                  </div>
                  <div>
                    <span className="block text-6xl font-black dark:text-zinc-100 mb-1">2 Horas</span>
                    <span className="text-emerald-600 dark:text-emerald-500 font-bold uppercase tracking-widest text-sm">RTO (Recovery Time Objective)</span>
                    <p className="dark:text-zinc-400 text-sm mt-2">Tiempo máximo para restaurar funcionalidad de compras core operando en Hot Standby.</p>
                  </div>
                </div>
              </div>

              <div className="dark:bg-zinc-900/50 bg-white p-8 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 dark:text-white border-b dark:border-zinc-700 pb-2">Procedimiento Estructural (Las 4 Fases)</h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold dark:text-emerald-400 mb-1">Fase 1: Estrategia Backup 3-2-1</h4>
                    <p className="text-slate-700 dark:text-zinc-300 text-base">Tres copias de datos en dos soportes. Fundamental: Copia Off-site y copia WORM (Inmutable/Offline) validada criptográficamente contra ransomware y secuestros.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold dark:text-emerald-400 mb-1">Fase 2: Protocolo de Restauración</h4>
                    <p className="text-slate-700 dark:text-zinc-300 text-base">Aislamiento de red (Failover) a instancia secundaria. Inyección de backups en zona limpia antes de reconducir DNS de clientes.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold dark:text-emerald-400 mb-1">Fase 3: Comité RACI y Notificación</h4>
                    <p className="text-slate-700 dark:text-zinc-300 text-base">Roles inmutables en crisis. <strong>CISO:</strong> Decide aislación. <strong>DevSecOps:</strong> Ejecuta parche y restore. <strong>Relaciones Públicas:</strong> Único portavoz público y regulatorio (72hrs legales).</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold dark:text-emerald-400 mb-1">Fase 4: Testing Post-Crisis</h4>
                    <p className="text-slate-700 dark:text-zinc-300 text-base">Retrospectivas <i>blameless</i> y simulacros. Tabletop teóricos semestrales y Failover real (apagón de madrugada programado) anual.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* === MÓDULO: BITÁCORA IA === */}
        {activeModule === 'bitacora' && (
          <div className="animate-fade-in space-y-8 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black uppercase text-fuchsia-600 dark:text-fuchsia-500 flex items-center gap-3 tracking-tight">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5h2v2H9v-2zm0-6h2v4H9V5z" /></svg>
              Bitácora de IA - Prompts
            </h2>
            <div className="dark:bg-[#0a0610] bg-fuchsia-50 p-8 rounded-xl border border-fuchsia-200 dark:border-fuchsia-900/30 shadow-lg">
              <p className="mb-8 text-lg dark:text-zinc-300 leading-relaxed border-b border-fuchsia-200 dark:border-fuchsia-900/50 pb-4">
                Registro fiel (<code>09_prompts_barmic.md</code>) utilizado para estructurar las secciones modulares de la auditoría y forzar el análisis de ciberseguridad sobre la infraestructura de MercadoSur.
              </p>

              <div className="space-y-8">
                <div className="dark:bg-zinc-900/80 bg-white p-6 rounded-lg border-l-4 border-l-fuchsia-500 shadow-sm relative">
                  <div className="absolute top-0 right-0 bg-fuchsia-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl uppercase">Inicialización</div>
                  <h4 className="font-bold text-slate-800 dark:text-fuchsia-400 mb-3 text-lg">Prompt 01: Configuración de Entorno</h4>
                  <p className="italic text-slate-600 dark:text-zinc-400 text-base leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-4 rounded border border-slate-100 dark:border-zinc-800">
                    "Actúa como un experto en DevSecOps. Estoy montando el entorno para una auditoría de seguridad web de un e-commerce ficticio llamado MercadoSur. El objetivo es construir una app que presente nuestros hallazgos de explotación (SQLi, XSS, OS Command Injection) sobre un entorno DVWA, utilizando React, Vite y TypeScript. Dame los comandos exactos de terminal para inicializar el proyecto, armar el repositorio y dejar listo el despliegue en Vercel. Regla del proyecto: la carpeta local, el repo de GitHub y el sitio en Vercel deben llamarse obligatoriamente auditoria_barmic. Dame el paso a paso directo de los comandos para la terminal."
                  </p>
                </div>

                <div className="dark:bg-zinc-900/80 bg-white p-6 rounded-lg border-l-4 border-l-fuchsia-500 shadow-sm relative">
                  <div className="absolute top-0 right-0 bg-fuchsia-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl uppercase">Vulnerabilidades</div>
                  <h4 className="font-bold text-slate-800 dark:text-fuchsia-400 mb-3 text-lg">Prompt 02: Informe Técnico de SQLi</h4>
                  <p className="italic text-slate-600 dark:text-zinc-400 text-base leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-4 rounded border border-slate-100 dark:border-zinc-800">
                    "Necesito redactar el archivo 02_sqli_barmic.md para evidenciar el ataque de Inyección SQL en el entorno DVWA utilizando el payload ' OR '1'='1. Todo el análisis debe estar aplicado a la empresa ficticia asignada, el e-commerce MercadoSur. Incluye la explicación técnica de por qué funciona el payload a nivel de base de datos, el impacto al negocio, las medidas de prevención enfocadas en la causa raíz y los controles de mitigación basados en OWASP. Además, entrégame la justificación profesional para cada vector de la calculadora CVSS v3.1 que resultó en un puntaje crítico de 9.8."
                  </p>
                </div>

                <div className="dark:bg-zinc-900/80 bg-white p-6 rounded-lg border-l-4 border-l-fuchsia-500 shadow-sm relative">
                  <div className="absolute top-0 right-0 bg-fuchsia-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl uppercase">Mitigación Corporativa</div>
                  <h4 className="font-bold text-slate-800 dark:text-fuchsia-400 mb-3 text-lg">Prompt 03: Matriz de Riesgos y Plan de Desastres</h4>
                  <p className="italic text-slate-600 dark:text-zinc-400 text-base leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-4 rounded border border-slate-100 dark:border-zinc-800">
                    "Siguiendo con la auditoría para MercadoSur, redacta el archivo 03_xss_barmic.md para la vulnerabilidad XSS Reflejado. El payload que inyecté en DVWA fue alert('auditoria_barmic'). Explica técnicamente cómo el servidor devuelve la entrada sin sanitizar para los clientes del e-commerce. Justifica por qué el puntaje CVSS v3.1 es de 6.1 en relación a la imagen que te envie de los parametros para el calculo."
                  </p>
                </div>

                <div className="dark:bg-zinc-900/80 bg-white p-6 rounded-lg border-l-4 border-l-fuchsia-500 shadow-sm relative">
                  <div className="absolute top-0 right-0 bg-fuchsia-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl uppercase">Vulnerabilidades</div>
                  <h4 className="font-bold text-slate-800 dark:text-fuchsia-400 mb-3 text-lg">Prompt 04: Informe Técnico de SQLi</h4>
                  <p className="italic text-slate-600 dark:text-zinc-400 text-base leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-4 rounded border border-slate-100 dark:border-zinc-800">
                    "Arma el documento 04_comandos_barmic.md para la Inyección de Comandos. El payload ejecutado en DVWA fue 127.0.0.1; cat /etc/passwd. Relaciona este hallazgo de Ejecución de Código con el colapso total de la confidencialidad, integridad y disponibilidad en el servidor de MercadoSur. Justifica el CVSS de 9.8 y entrega prevención de código seguro, como evitar el uso de la terminal y aplicar listas blancas, junto con  el principio del minimo privilegio."
                  </p>
                </div>

                <div className="dark:bg-zinc-900/80 bg-white p-6 rounded-lg border-l-4 border-l-fuchsia-500 shadow-sm relative">
                  <div className="absolute top-0 right-0 bg-fuchsia-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl uppercase">Vulnerabilidades</div>
                  <h4 className="font-bold text-slate-800 dark:text-fuchsia-400 mb-3 text-lg">Prompt 05: Informe Técnico de SQLi</h4>
                  <p className="italic text-slate-600 dark:text-zinc-400 text-base leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-4 rounded border border-slate-100 dark:border-zinc-800">
                    "ya, tengo listo los ataques y sus puntuaciones, ahora necesito seguir con la parte de activos de este informe de auditoria y tambien necesito que veas esta rubrica nuevamente obtener el maximo puntaje posible y adaptarla en caso de necesitar ajustes."
                  </p>
                </div>


                <div className="dark:bg-zinc-900/80 bg-white p-6 rounded-lg border-l-4 border-l-fuchsia-500 shadow-sm relative">
                  <div className="absolute top-0 right-0 bg-fuchsia-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl uppercase">Vulnerabilidades</div>
                  <h4 className="font-bold text-slate-800 dark:text-fuchsia-400 mb-3 text-lg">Prompt 06: Informe Técnico de SQLi</h4>
                  <p className="italic text-slate-600 dark:text-zinc-400 text-base leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-4 rounded border border-slate-100 dark:border-zinc-800">
                    "Redacta el archivo 01_resumen_barmic.md para el Informe A de la auditoría. Debe incluir una presentación de la empresa asignada, MercadoSur, describiendo su contexto crítico como plataforma de e-commerce. Además, y para cumplir estrictamente con el indicador 3.1.1 de la rúbrica en nivel Destacado, construye una tabla unificada que consolide las tres vulnerabilidades explotadas en el entorno DVWA (Inyección SQL, XSS Reflejado e Inyección de Comandos) indicando claramente su respectivo puntaje CVSS v3.1 y nivel de severidad."
                  </p>
                </div>

                <div className="dark:bg-zinc-900/80 bg-white p-6 rounded-lg border-l-4 border-l-fuchsia-500 shadow-sm relative">
                  <div className="absolute top-0 right-0 bg-fuchsia-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl uppercase">Vulnerabilidades</div>
                  <h4 className="font-bold text-slate-800 dark:text-fuchsia-400 mb-3 text-lg">Prompt 07: Informe Técnico de SQLi</h4>
                  <p className="italic text-slate-600 dark:text-zinc-400 text-base leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-4 rounded border border-slate-100 dark:border-zinc-800">
                    "redacta el archivo 05_activos_barmic.md para la sección de Activos de Información y Riesgos del Informe B, aplicando el análisis a MercadoSur. Para alcanzar el nivel destacado en la rúbrica, identifica y clasifica un mínimo de 6 activos críticos de este rubro (como bases de datos de clientes, sistema de pago, servidores, etc). Luego, asocia las vulnerabilidades que encontramos en la fase anterior, como ponen en riesgo específico a cada uno de estos activos, justificando detalladamente el impacto en el e-commers. Además, desarrolla un conjuntode políticas de prevención específicas para estos riesgos que ataquen directamente. Finalmente, explayate en el diseño de mejoras tecnológicas y crea un Plan de Recuperación ante Desastres (DRP) completo, que incluya protocolos de respaldo, restauración y notificación de incidentes, adaptado estrictamente a los estándares de la industria del comercio electrónico."
                  </p>
                </div>

                <div className="dark:bg-zinc-900/80 bg-white p-6 rounded-lg border-l-4 border-l-fuchsia-500 shadow-sm relative">
                  <div className="absolute top-0 right-0 bg-fuchsia-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl uppercase">Vulnerabilidades</div>
                  <h4 className="font-bold text-slate-800 dark:text-fuchsia-400 mb-3 text-lg">Prompt 08: Informe Técnico de SQLi</h4>
                  <p className="italic text-slate-600 dark:text-zinc-400 text-base leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-4 rounded border border-slate-100 dark:border-zinc-800">
                    "redacta el archivo 06_matriz_barmic.md. El objetivo es construir una Matriz de Riesgos de Probabilidad x Impacto (escala 5x5) con un mapa de calor visual para MercadoSur. Debes evaluar y ubicar las tres vulnerabilidades descubiertas (Inyección SQL, Inyección de Comandos y XSS Reflejado). Dando una justificación técnica y de negocio profunda para la ubicación de cada vulnerabilidad en la matriz. Finalmente, establece una priorización entre el cruce de Nivel de Riesgo Inherente obtenido en la matriz con el puntaje CVSS v3.1 calculado para cada caso."
                  </p>
                </div>


                <div className="dark:bg-zinc-900/80 bg-white p-6 rounded-lg border-l-4 border-l-fuchsia-500 shadow-sm relative">
                  <div className="absolute top-0 right-0 bg-fuchsia-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl uppercase">Vulnerabilidades</div>
                  <h4 className="font-bold text-slate-800 dark:text-fuchsia-400 mb-3 text-lg">Prompt 09: Informe Técnico de SQLi</h4>
                  <p className="italic text-slate-600 dark:text-zinc-400 text-base leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-4 rounded border border-slate-100 dark:border-zinc-800">
                    "veo que falta la siguiente información importante en el Markdown de matriz, asi que formula políticas de prevención específicas para cada uno de los riesgos priorizados en la matriz (Inyección SQL, Inyección de Comandos y XSS Reflejado). Estas políticas deben estar conectadas con la causa raíz de los hallazgos descubiertos en la auditoría y adaptadas al desarrollo de MercadoSur."
                  </p>
                </div>

                <div className="dark:bg-zinc-900/80 bg-white p-6 rounded-lg border-l-4 border-l-fuchsia-500 shadow-sm relative">
                  <div className="absolute top-0 right-0 bg-fuchsia-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl uppercase">Vulnerabilidades</div>
                  <h4 className="font-bold text-slate-800 dark:text-fuchsia-400 mb-3 text-lg">Prompt 10: Informe Técnico de SQLi</h4>
                  <p className="italic text-slate-600 dark:text-zinc-400 text-base leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-4 rounded border border-slate-100 dark:border-zinc-800">
                    "Ahora en relación a los controles (Propone controles de mitigación concretos y viables por vulnerabilidad, distintos de la prevención, y referencia un marco (OWASP, CIS o NIST). ), para cumplir con el nivel destacado de la rúbrica, propón controles de mitigación concretos y viables para las tres vulnerabilidades evaluadas."
                  </p>
                </div>

                <div className="dark:bg-zinc-900/80 bg-white p-6 rounded-lg border-l-4 border-l-fuchsia-500 shadow-sm relative">
                  <div className="absolute top-0 right-0 bg-fuchsia-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl uppercase">Vulnerabilidades</div>
                  <h4 className="font-bold text-slate-800 dark:text-fuchsia-400 mb-3 text-lg">Prompt 11: Informe Técnico de SQLi</h4>
                  <p className="italic text-slate-600 dark:text-zinc-400 text-base leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-4 rounded border border-slate-100 dark:border-zinc-800">
                    "05_activos_barmic.md identifica y clasifica por lo menos 6 activos de información que sean clave para el funcionamiento de un e-commerce como MercadoSur. Explica bien cómo las vulnerabilidades que encontramos en el lab (SQLi, XSS e Inyección de Comandos) ponen en riesgo a cada uno de esos activos. Además arma varias políticas de prevención por cada riesgo, atacando directamente la causa raíz del problema. Para cerrar, explayate en la parte de mejoras tecnológicas de infraestructura y arma un Plan de Recuperación ante Desastres (DRP) bien completo, detallando cómo serían los respaldos, la restauración y los avisos en caso de un incidente grave."
                  </p>
                </div>


                <div className="dark:bg-zinc-900/80 bg-white p-6 rounded-lg border-l-4 border-l-fuchsia-500 shadow-sm relative">
                  <div className="absolute top-0 right-0 bg-fuchsia-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl uppercase">Vulnerabilidades</div>
                  <h4 className="font-bold text-slate-800 dark:text-fuchsia-400 mb-3 text-lg">Prompt 12: Informe Técnico de SQLi</h4>
                  <p className="italic text-slate-600 dark:text-zinc-400 text-base leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-4 rounded border border-slate-100 dark:border-zinc-800">
                    "Existe algo que puedas agregar al Plan de recuperacion de desastres para que este quede aun mas completo para mi entrega?"
                  </p>
                </div>

                <div className="dark:bg-zinc-900/80 bg-white p-6 rounded-lg border-l-4 border-l-fuchsia-500 shadow-sm relative">
                  <div className="absolute top-0 right-0 bg-fuchsia-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl uppercase">Vulnerabilidades</div>
                  <h4 className="font-bold text-slate-800 dark:text-fuchsia-400 mb-3 text-lg">Prompt 13: Informe Técnico de SQLi</h4>
                  <p className="italic text-slate-600 dark:text-zinc-400 text-base leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-4 rounded border border-slate-100 dark:border-zinc-800">
                    "Finalizando la confeccion de mis docuemntos del proyecto, archivo 01_resumen_barmic.md para que ahora contenga todo el material que hemos confeccionado en los documentos, incluye la totalidad de informacion relevante para este documento."
                  </p>
                </div>


                <div className="dark:bg-zinc-900/80 bg-white p-6 rounded-lg border-l-4 border-l-fuchsia-500 shadow-sm relative">
                  <div className="absolute top-0 right-0 bg-fuchsia-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl uppercase">Vulnerabilidades</div>
                  <h4 className="font-bold text-slate-800 dark:text-fuchsia-400 mb-3 text-lg">Prompt 14: Informe Técnico de SQLi</h4>
                  <p className="italic text-slate-600 dark:text-zinc-400 text-base leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-4 rounded border border-slate-100 dark:border-zinc-800">
                    "Vamos con react, necesito que te explayes en el desarollo de la aplicacion, es completamente necesario que sea algo sumamente interactivo, con menus desplegables, con colores llamativos dignos de una empresa llamada MercadoSur, necesito que los parrafos contengan informacion relevante y la matriz de riesgos con efectos de luces, recueda que usaremos tailwind, recuerda poner mi firma en la parte inferior de la app con acceso a mi github https://github.com/Michprogram "
                  </p>
                </div>

                <div className="dark:bg-zinc-900/80 bg-white p-6 rounded-lg border-l-4 border-l-fuchsia-500 shadow-sm relative">
                  <div className="absolute top-0 right-0 bg-fuchsia-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl uppercase">Vulnerabilidades</div>
                  <h4 className="font-bold text-slate-800 dark:text-fuchsia-400 mb-3 text-lg">Prompt 15: Informe Técnico de SQLi</h4>
                  <p className="italic text-slate-600 dark:text-zinc-400 text-base leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-4 rounded border border-slate-100 dark:border-zinc-800">
                    "Con el código que me entregaste tuve un problema, al parecer Tailwind no esta funcionando como corresponde (inserte imagen de como se ve el proyecto levantado), por lo que mi proyecto se ve sin estilo. Es necesario que tomes en cuenta que cuando comence el proyecto instale las dependencias en los computadores de Inacap, y ahora clone mi repositorio de Github en mi Computador Personal, ayudame a corregir este error. "
                  </p>
                </div>

                <div className="dark:bg-zinc-900/80 bg-white p-6 rounded-lg border-l-4 border-l-fuchsia-500 shadow-sm relative">
                  <div className="absolute top-0 right-0 bg-fuchsia-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl uppercase">Vulnerabilidades</div>
                  <h4 className="font-bold text-slate-800 dark:text-fuchsia-400 mb-3 text-lg">Prompt 16: Informe Técnico de SQLi</h4>
                  <p className="italic text-slate-600 dark:text-zinc-400 text-base leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-4 rounded border border-slate-100 dark:border-zinc-800">
                    "Ahora si me funciona correctamente el diseño de la pagina, pero respecto a lo que es el contenido no se ajusta directamente a lo que busco, a continuación te daré directrices para mejorar exactamente lo que necesito:

                    - Modulariza cada uno de los docs en docs_barmic, cada uno de los archivos debe tener su propio apartado, siendo muy generoso en cuanto al contenido, ya que esto debe ser una auditoria completa para cliente.

                    - Haz un menu en cuadros, que al mostrar el home de este proyecto tenga TODOS los modulos a tratar y que al seleccionar cada uno de estos cuadros nos dirija a la seccion correspondiente, se creativo, necesito resaltar en esta evaluación.

                    - Utiliza estilo llamativo, ocupa neon para resaltar lo mas importante, por sobre todo el modulo de matriz de riesgos, es donde mas debes poner enfasis visual para lograr llegar al cliente y que comprenda la magnitud del riesgo.

                    - Utiliza directamente la informacion que se confecciono en cada Markdown en la carpeta docs_barmic.

                    - No separes tacitamente por Informe A y Informe B, este proyecto es un conjunto de 2 trabajos pero debe ser unificado para la entrega por lo que necesito que no hagas esa separacion explicita.

                    - Debe contener un boton aparte, donde tu consideres se vea mejor para agregar la Bitacora de AI con todos los prompts que utilizamos a lo largo de este proyecto, recuerda utilizar el documento 09_propts_barmic.md para realizar este apartado.

                    - Crea un boton para poner el modo oscuro segun comodidad de cada persona

                    - Para el modulo de vulnerabilidades ponle en un bloque de codigo el payload que usamos para cada uno de los 3 casos, para que este se vea mas profesional. Al mismo tiempo utiliza las imagenes guardadas en docs_barmic/img_barmic para mostrar evidencia real en el proyecto.

                    - Siempre es necesario mantener mi firma en el footer de la pagina, hazlo de una forma sumamente minimalista, como la imagen que te envie.  "
                  </p>
                </div>

                <div className="dark:bg-zinc-900/80 bg-white p-6 rounded-lg border-l-4 border-l-fuchsia-500 shadow-sm relative">
                  <div className="absolute top-0 right-0 bg-fuchsia-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl uppercase">Vulnerabilidades</div>
                  <h4 className="font-bold text-slate-800 dark:text-fuchsia-400 mb-3 text-lg">Prompt 17: Informe Técnico de SQLi</h4>
                  <p className="italic text-slate-600 dark:text-zinc-400 text-base leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-4 rounded border border-slate-100 dark:border-zinc-800">
                    "Acepto el estilo que le diste pero si te das cuenta los apartados no tiene informacion dentro de cada seccion, solo dice "La información de esta sección se extrae directamente de la carpeta docs_barmic. Contenido documentado durante la fase de auditoría.", es totalmente necesario que dentro de estas secciones crees el contenido, lo cual seria todo lo que esta dentro de los Markdown que confeccionamos, toda esa informacion debe estar reflejada dentro de las secciones. No quiero que las redirijas al documento, quiero que la informacion del documento este plasmada en cada seccion. Tambien cambia el color azul oscuro, es sumamente generico para los proyectos de este estilo, hazlo mucho mas atractivo visualmente. La seccion de matriz de riesgos tambien necesito que se mejore, mayor interactividad con la tabla, agrega despliegue de cajas de comentario para cada uno de los Ataques que se evaluaron .  "
                  </p>
                </div>

                <div className="dark:bg-zinc-900/80 bg-white p-6 rounded-lg border-l-4 border-l-fuchsia-500 shadow-sm relative">
                  <div className="absolute top-0 right-0 bg-fuchsia-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl uppercase">Vulnerabilidades</div>
                  <h4 className="font-bold text-slate-800 dark:text-fuchsia-400 mb-3 text-lg">Prompt 18: Informe Técnico de SQLi</h4>
                  <p className="italic text-slate-600 dark:text-zinc-400 text-base leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-4 rounded border border-slate-100 dark:border-zinc-800">
                    "Acepto completamente el cambio de estilo, no lo vuelvas a cambiar, me gusto totalmente, pero necesito que agregues mas información a cada sección, debe contener aun mas contenido, básate completamente en el contenido de los Markdown confeccionados, fíjate que cada uno de los ataques tenga su Análisis técnico, El mecanismo de Falla, Impacto en MercadoSur, Explicar y justificar la puntuación y severidad de la CVSS, políticas de prevención, controles de mitigación. Debes integrar toda la información existente en los markdown a cada sección, es necesario agregar *toda* la información confeccionada a cada sección, no quiero resúmenes, no quiero secciones cortas, quiero un proyecto completo con información relevante, bastante lectura y aplicación al caso, deja de realizar secciones con resúmenes y poca información, recuerda ser fiel al 100% con el estilo de diseño que utilizaste. tanto colores fuente y display.
                    "
                  </p>
                </div>

                <div className="dark:bg-zinc-900/80 bg-white p-6 rounded-lg border-l-4 border-l-fuchsia-500 shadow-sm relative">
                  <div className="absolute top-0 right-0 bg-fuchsia-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl uppercase">Vulnerabilidades</div>
                  <h4 className="font-bold text-slate-800 dark:text-fuchsia-400 mb-3 text-lg">Prompt 19: Informe Técnico de SQLi</h4>
                  <p className="italic text-slate-600 dark:text-zinc-400 text-base leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-4 rounded border border-slate-100 dark:border-zinc-800">
                    "Los prompts utilizados hasta el momento de manera oficial son los siguientes: (09_promts_barmic.md) a continuacion asignales un titulo y una etiqueta al igual que lo hiciste con los primeros dos promts que te envio en la imagen, incluye tambien este prompt a la lista siendo el numero 19."
                  </p>
                </div>

                <div className="dark:bg-zinc-900/80 bg-white p-6 rounded-lg border-l-4 border-l-fuchsia-500 shadow-sm relative">
                  <div className="absolute top-0 right-0 bg-fuchsia-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl uppercase">Vulnerabilidades</div>
                  <h4 className="font-bold text-slate-800 dark:text-fuchsia-400 mb-3 text-lg">Prompt 15: Informe Técnico de SQLi</h4>
                  <p className="italic text-slate-600 dark:text-zinc-400 text-base leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-4 rounded border border-slate-100 dark:border-zinc-800">
                    " "
                  </p>
                </div>






              </div>
            </div>
          </div>
        )}
      </main>

      {/* === FOOTER MINIMALISTA === */}
      <footer className="mt-auto py-6 bg-white dark:bg-[#030303] border-t border-slate-200 dark:border-zinc-900/80 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-4 justify-between items-center text-xs md:text-sm">
          <div className="text-slate-500 dark:text-zinc-600 font-mono tracking-widest uppercase flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-center md:text-left">
            <div>AGENTE: <span className="text-cyan-600 dark:text-cyan-500 font-bold ml-1">MICHELE BARRIGA</span></div>
            <div className="hidden md:block w-1 h-1 rounded-full bg-zinc-700"></div>
            <div className="text-[10px] md:text-xs text-zinc-500">Analista Programador, INACAP Valparaíso</div>
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