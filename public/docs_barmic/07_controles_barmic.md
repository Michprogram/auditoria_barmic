# Auditoría de Seguridad Web - MercadoSur
## Controles de Mitigación de Riesgos (Defensa en Profundidad)

### 1. Enfoque de Mitigación
Mientras que las políticas de prevención atacan la causa raíz a nivel de código fuente (SSDLC), los **controles de mitigación** se enfocan en la arquitectura e infraestructura de MercadoSur. Estos controles asumen que las políticas de prevención podrían fallar (o que podría surgir una vulnerabilidad de Día Cero) y buscan limitar drásticamente el impacto del ataque.

A continuación, se detallan los controles viables y concretos para los riesgos priorizados, referenciados según los estándares de la industria (OWASP, NIST y CIS).

---

### 2. Controles para Inyección SQL (Riesgo Extremo)

Si un atacante logra evadir las validaciones y lanzar un payload de SQLi en el buscador o panel de login de MercadoSur, la infraestructura debe estar preparada para contenerlo.

* **Control de Mitigación 1: Implementación de WAF Perimetral**
    * **Descripción:** Desplegar un Web Application Firewall (WAF) en la capa 7 (como AWS WAF o Cloudflare) configurado en modo bloqueo. El WAF analizará el tráfico HTTP en tiempo real y detendrá peticiones que contengan firmas de bases de datos o tautologías (ej. `OR '1'='1`) antes de que toquen el servidor de MercadoSur.
    * **Referencia al Marco:** **OWASP Top 10 (A03:2021-Injection)** recomienda el uso de WAFs modernos como control compensatorio robusto para detectar y mitigar inyecciones a nivel de red.
* **Control de Mitigación 2: Principio del Menor Privilegio (PoLP) en Motor de Base de Datos**
    * **Descripción:** Restringir los permisos de la cuenta de servicio que usa la aplicación web para conectarse al motor SQL. Esta cuenta solo tendrá privilegios de DML (`SELECT`, `INSERT`, `UPDATE`) sobre tablas específicas de clientes y pedidos, bloqueando permisos DDL (`DROP`, `ALTER`) para impedir que el atacante borre la base de datos o acceda a tablas de configuración del sistema.
    * **Referencia al Marco:** **NIST SP 800-53 (Control AC-6: Least Privilege)**, que exige que los sistemas de información proporcionen solo los privilegios mínimos necesarios para las tareas asignadas.

---

### 3. Controles para Inyección de Comandos (Riesgo Extremo)

Si el sistema recibe el delimitador `;` y logra invocar el shell, el entorno de ejecución debe impedir que el atacante escale privilegios o afecte el host real.

* **Control de Mitigación 1: Aislamiento mediante Contenedores (Sandboxing)**
    * **Descripción:** Ejecutar la aplicación web de MercadoSur exclusivamente dentro de un contenedor efímero y aislado (ej. Docker). Si el atacante inyecta `cat /etc/passwd`, solo leerá un archivo del sistema de archivos virtual del contenedor, protegiendo el sistema operativo subyacente del servidor real y bloqueando la pivotación hacia la red interna.
    * **Referencia al Marco:** **CIS Controls v8 (Control 4: Secure Configuration of Enterprise Assets and Software)**, que estipula el uso de máquinas virtuales o contenedores aislados para compartimentar aplicaciones expuestas a internet.
* **Control de Mitigación 2: Hardening del Usuario de Servicio SO**
    * **Descripción:** El servicio del servidor web (ej. Nginx o Apache) debe ejecutarse bajo un usuario sin privilegios en Linux (como `www-data` o un usuario dedicado `mercadosur_app`). Este usuario no tendrá permisos de lectura sobre `/etc/shadow` ni de ejecución sobre herramientas de red instaladas en el servidor host.
    * **Referencia al Marco:** **NIST SP 800-123 (Guide to General Server Security)**, enfocado en el endurecimiento (*hardening*) del sistema operativo host.

---

### 4. Controles para XSS Reflejado (Riesgo Alto)

Si el desarrollador olvida escapar la salida en una nueva vista de la tienda y el payload de JavaScript malicioso (`<script>`) llega al navegador del cliente, los siguientes controles mitigarán el secuestro de la sesión.

* **Control de Mitigación 1: Despliegue de Content Security Policy (CSP)**
    * **Descripción:** Configurar el servidor de MercadoSur para que emita cabeceras HTTP `Content-Security-Policy`. Esta directiva indicará al navegador de la víctima que solo tiene permitido ejecutar scripts alojados en el dominio oficial de MercadoSur, bloqueando la ejecución de cualquier script inyectado en línea (Inline Scripts) por el atacante.
    * **Referencia al Marco:** **OWASP Cheat Sheet Series (Content Security Policy)**, que define la CSP como una capa de seguridad adicional crucial que ayuda a detectar y mitigar ataques XSS y de inyección de datos.
* **Control de Mitigación 2: Banderas de Seguridad en Cookies de Sesión**
    * **Descripción:** Configurar los tokens de sesión de los usuarios del e-commerce (las cookies que los mantienen logueados) con las banderas `HttpOnly` y `Secure`. Esto hace que, aunque el script malicioso logre ejecutarse, le sea técnicamente imposible acceder al objeto `document.cookie` para robar la sesión, requiriendo además que la cookie viaje siempre por un canal cifrado (HTTPS).
    * **Referencia al Marco:** **OWASP Top 10 (A05:2021-Security Misconfiguration)**, que exige la correcta configuración de directivas de seguridad en encabezados HTTP y cookies para mitigar el compromiso del usuario.