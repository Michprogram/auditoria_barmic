# Auditoría de Seguridad Web - MercadoSur
## Activos de Información, Políticas de Prevención y Plan de Recuperación (DRP)

### 1. Clasificación de Activos Críticos de la Industria (E-commerce)
Para el contexto operativo de la tienda virtual **MercadoSur**, se han identificado y clasificado **6 activos de información** fundamentales. La caída o compromiso de cualquiera de estos activos paraliza la cadena de valor del negocio:

1. **Base de Datos de Clientes (Activo de Datos - Confidencialidad):** Contiene Información de Identificación Personal (PII) crítica, como nombres completos, correos electrónicos, direcciones físicas y contraseñas cifradas.
2. **Pasarela de Pagos y Facturación (Activo Financiero - Integridad):** Módulos que procesan transacciones con tarjetas, validan tokens bancarios y emiten documentos tributarios electrónicos.
3. **Servidores Web y Sistema Operativo (Activo de Infraestructura - Disponibilidad):** Los clústeres Linux y servidores web que mantienen la tienda online visible y accesible para los consumidores 24/7.
4. **Historial Logístico y de Despachos (Activo Operativo - Integridad):** Registros de compras, tracking de envíos y coordinación con proveedores logísticos de última milla.
5. **Código Fuente de la Aplicación (Activo de Propiedad Intelectual - Confidencialidad):** Repositorios que contienen la lógica de negocio, algoritmos de precios y credenciales de APIs internas de MercadoSur.
6. **Reputación de Marca y Confianza (Activo Intangible - Valor Estratégico):** La percepción de seguridad del cliente; un activo frágil que determina la fidelización y las ventas futuras.

---

### 2. Asociación de Riesgos: Vulnerabilidades vs. Activos
Cada hallazgo técnico detectado en la fase de laboratorio supone una amenaza directa a los activos listados:

* **Inyección SQL (SQLi):** Pone en riesgo crítico los activos **(1) Base de Datos**, **(4) Historial Logístico** y **(6) Reputación**. Permite el robo masivo de la PII y la alteración de estados de pedidos, lo que desencadena una crisis de confianza pública inmediata.
* **XSS Reflejado:** Amenaza los activos **(2) Pasarela de Pagos** y **(6) Reputación**. Facilita el secuestro de sesiones (*Session Hijacking*), permitiendo a los atacantes interceptar a los clientes durante el proceso de pago e inyectar formularios fraudulentos para clonar tarjetas bajo el dominio legítimo de MercadoSur.
* **Inyección de Comandos (OS Command Injection):** Compromete **TODOS los activos (1 al 6)**. Al otorgar Ejecución Remota de Código (RCE) en el activo **(3) Servidores Web**, el atacante obtiene control total de la infraestructura, pudiendo robar el activo **(5) Código Fuente**, borrar las bases de datos y apagar completamente la operación comercial.

---

### 3. Políticas de Prevención Multicapa
Para abordar los riesgos priorizados desde la raíz, el equipo de desarrollo de MercadoSur adoptará las siguientes políticas específicas:

**Para Inyección SQL:**
* **Uso Obligatorio de ORM y Prepared Statements:** Se prohíbe la concatenación manual de consultas SQL. Todas las interacciones con la base de datos deben pasar por consultas parametrizadas o un Mapeador Objeto-Relacional (ORM) que separe estructuralmente el código de los datos del usuario.
* **Validación de Tipos (Type Juggling Prevention):** Implementar validación estricta de variables en el backend (ej. forzar que los identificadores de productos sean procesados estrictamente como *Integers*).

**Para Cross-Site Scripting (XSS):**
* **Codificación de Salida Sensible al Contexto (Context-Aware Output Encoding):** Toda variable renderizada en el DOM debe ser escapada según su ubicación (HTML, JavaScript, CSS o URL) antes de enviarse al navegador del cliente.
* **Políticas de CSP Estrictas:** Despliegue de cabeceras *Content-Security-Policy* que prohíban la ejecución de scripts en línea (`unsafe-inline`) y restrinjan la carga de recursos a dominios explícitamente autorizados por MercadoSur.

**Para Inyección de Comandos:**
* **Prohibición de Invocación del Shell:** Bloqueo de funciones nativas que interactúen con la terminal (ej. `system()`, `exec()`). Las operaciones del sistema deben realizarse a través de APIs del lenguaje de programación.
* **Listas Blancas (Whitelisting) Estrictas:** Si una entrada requiere interactuar con el sistema operativo, debe validarse contra una expresión regular (RegEx) que solo permita caracteres alfanuméricos predefinidos, denegando por defecto cualquier carácter especial (`;`, `|`, `&`).

---

### 4. Mejoras Tecnológicas y Plan de Recuperación ante Desastres (DRP)
Para garantizar la resiliencia operativa y cumplir con los estándares de la industria del E-commerce, se diseñará la siguiente arquitectura de recuperación:

#### A. Mejoras Tecnológicas Estructurales
* **Implementación de WAF perimetral:** Despliegue de un *Web Application Firewall* (ej. Cloudflare WAF o AWS WAF) configurado con reglas gestionadas de OWASP Core Rule Set para bloquear intentos de SQLi y XSS antes de que alcancen el servidor.
* **Segmentación de Red (Zero Trust):** Separación física y lógica de la infraestructura. El servidor web se ubicará en una DMZ pública, mientras que la base de datos (Activo 1) residirá en una subred privada aislada, accesible únicamente por el puerto específico del servidor de aplicaciones, mitigando el impacto de un RCE.

#### B. Plan de Recuperación ante Desastres (DRP)
En caso de un compromiso exitoso (ej. inyección de comandos destructiva), MercadoSur ejecutará el siguiente plan de continuidad:

1. **Protocolo de Respaldo (Backup):**
   * Estrategia 3-2-1: Tres copias de los datos (BD y código fuente), en dos soportes distintos, con una copia inmutable almacenada *Off-site* (en otra región geográfica de la nube).
   * Respaldos incrementales cada 15 minutos (para minimizar la pérdida de transacciones de E-commerce) y completos diarios.
2. **Protocolo de Restauración (Restore):**
   * Definición de RTO (Objetivo de Tiempo de Recuperación) de 2 horas máximo para levantar instancias de contingencia (*Hot Standby*) pre-configuradas mediante Infraestructura como Código (Terraform).
   * Verificación criptográfica de la integridad de los respaldos antes de su despliegue en el entorno de producción limpio.
3. **Protocolo de Notificación:**
   * **Interna:** Activación inmediata del CSIRT (Computer Security Incident Response Team) de MercadoSur.
   * **Legal/Externa:** Notificación a las autoridades reguladoras de protección de datos en un plazo menor a 72 horas si el activo (1) fue comprometido.
   * **Clientes:** Comunicación transparente mediante correo electrónico a los usuarios afectados, forzando un reseteo preventivo de contraseñas y entregando directrices de seguridad.