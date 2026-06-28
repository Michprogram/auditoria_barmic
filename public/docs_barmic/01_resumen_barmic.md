# Auditoría de Seguridad Web - Resumen Ejecutivo
## Empresa Auditada: MercadoSur (E-commerce)

### 1. Contexto del Negocio
El presente informe detalla los hallazgos de la auditoría de ciberseguridad realizada al portal de clientes de **MercadoSur**, una empresa del rubro de comercio electrónico (E-commerce). Como plataforma de ventas online, el portal gestiona diariamente información crítica: datos de identificación personal (PII), direcciones de despacho, historiales de compra y la integración con pasarelas de pago electrónico. La resiliencia de esta plataforma no solo sostiene la operatividad financiera, sino también la reputación de la marca y la confianza de sus usuarios.

### 2. Alcance de la Auditoría
Las pruebas de penetración se realizaron en un ambiente controlado (entorno DVWA) autorizado para esta actividad, simulando el nivel de seguridad actual ("Low") del portal web de MercadoSur. El objetivo fue identificar brechas en la validación de los datos de entrada que pudieran comprometer la confidencialidad, integridad o disponibilidad (Tríada CIA) de los activos de la empresa.

### 3. Consolidado de Vulnerabilidades y Severidad (CVSS v3.1)
Se lograron demostrar y explotar con éxito tres vectores de ataque críticos. A continuación, se presenta la tabla unificada con la clasificación de severidad utilizando el estándar *Common Vulnerability Scoring System* (CVSS v3.1), demostrando el riesgo inminente para la infraestructura técnica y lógica de MercadoSur:

| Vulnerabilidad (Hallazgo Técnico) | Vector de Ataque CVSS v3.1 | Puntaje Base | Severidad Escala (0-10) |
| :--- | :--- | :---: | :--- |
| **Inyección SQL (SQLi)** | AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H | **9.8** | 🔴 **Crítica** |
| **Inyección de Comandos OS** | AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H | **9.8** | 🔴 **Crítica** |
| **Cross-Site Scripting (XSS Reflejado)** | AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N | **6.1** | 🟠 **Media** |

### 4. Evaluación de Riesgos y Priorización Operativa
Aplicando una metodología de evaluación de Riesgo Inherente (Probabilidad × Impacto) adaptada a la industria comercial, se definió el siguiente orden de remediación:
* **Prioridad 1:** Inyección SQL (Riesgo Extremo - Nivel 25).
* **Prioridad 2:** Inyección de Comandos (Riesgo Extremo - Nivel 20).
* **Prioridad 3:** XSS Reflejado (Riesgo Alto - Nivel 12).

### 5. Estrategia de Defensa en Profundidad
Para neutralizar estos riesgos, se diseñó un modelo de seguridad de múltiples capas:
* **Políticas de Prevención (Código Seguro):** Implementación obligatoria de Consultas Parametrizadas (Prepared Statements), codificación de salida estricta (Output Encoding) y validación por listas blancas, erradicando la invocación directa a la terminal del sistema.
* **Controles de Mitigación (Infraestructura):** Despliegue de un Web Application Firewall (WAF) perimetral, aislamiento de procesos mediante contenedores (Sandboxing), aplicación del Principio del Menor Privilegio (PoLP) en motores de bases de datos y emisión de políticas CSP.

### 6. Continuidad de Negocio y Recuperación (DRP)
Se estableció un Plan de Recuperación ante Desastres estructurado para garantizar la resiliencia operativa:
* **Métricas Críticas:** RPO (Pérdida de datos tolerable) de 15 minutos y RTO (Tiempo de inactividad) máximo de 2 horas.
* **Respaldo Criptográfico:** Adopción de la regla 3-2-1 con copias inmutables (WORM) *off-site* para prevenir el secuestro o destrucción de la base de datos.
* **Gestión de Crisis:** Establecimiento de un Comité de Emergencia (RACI), protocolos de escalamiento legal y comunicación a clientes, complementado con un programa continuo de simulacros técnicos y análisis post-incidente.