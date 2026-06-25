# Auditoría de Seguridad Web - MercadoSur
## Mejoras Tecnológicas y Plan de Recuperación ante Desastres (DRP)

### 1. Visión Estratégica de Continuidad
En la industria del e-commerce, un minuto de inactividad o una brecha de datos se traduce en pérdidas financieras directas y un daño irreversible a la reputación. Este documento establece la arquitectura de resiliencia de **MercadoSur** para absorber, mitigar y recuperarse de incidentes críticos (como una explotación de RCE o un secuestro masivo de base de datos) garantizando la continuidad del negocio.

---

### 2. Mejoras Tecnológicas Estructurales
Para elevar la postura de seguridad y reducir la probabilidad de éxito de los ciberataques evaluados, se implementarán las siguientes mejoras en la arquitectura de red:

* **Despliegue de WAF Híbrido (Web Application Firewall):** Implementación de una solución WAF en la nube (ej. Cloudflare o AWS WAF) con inspección profunda de paquetes (DPI). El WAF estará configurado con *Rate Limiting* para mitigar denegaciones de servicio (DDoS) y firmas actualizadas del OWASP Core Rule Set para bloquear intentos de SQLi y XSS en el perímetro, antes de que el tráfico alcance la infraestructura interna.
* **Segmentación de Red (Arquitectura Zero Trust):** Abandono del modelo de red plana. Se implementará una arquitectura de micro-segmentación:
  * **Zona Pública (DMZ):** Alojará únicamente los balanceadores de carga y los servidores web front-end.
  * **Zona Privada:** Alojará la lógica de negocio (APIs) y la pasarela de pagos.
  * **Zona Crítica (Aislada):** Alojará el motor de base de datos de clientes, sin acceso a internet de salida, comunicándose exclusivamente a través de puertos específicos con la Zona Privada.
* **Virtualización y Contenedores Inmutables:** Transición del código monolítico a contenedores Docker orquestados (Kubernetes). Los contenedores se desplegarán en modo "solo lectura" (Read-Only Root Filesystem) mitigando el impacto de una inyección de comandos, ya que el atacante no podrá descargar malware ni modificar archivos del sistema host.

---

### 3. Plan de Recuperación ante Desastres (DRP)
Si los controles preventivos y de mitigación fallan, MercadoSur activará este protocolo estructurado para recuperar la operabilidad en tiempos predefinidos.

#### A. Métricas de Recuperación Objetivo
Para un e-commerce transaccional, se establecen métricas agresivas:
* **RPO (Recovery Point Object - Pérdida de datos máxima tolerable):** 15 minutos. El sistema no puede permitirse perder transacciones de compras recientes.
* **RTO (Recovery Time Object - Tiempo de inactividad máximo tolerable):** 2 horas para restaurar la funcionalidad central de compras.

#### B. Fase 1: Protocolo de Respaldo (Backup Strategy)
Se implementará el estándar de oro de la industria, la **Regla de Respaldo 3-2-1-1-0**:
* **3 Copias de los datos:** Los datos de producción (1) y dos copias de seguridad (2 y 3).
* **2 Soportes de almacenamiento distintos:** Almacenamiento en bloque y almacenamiento de objetos (ej. Amazon S3).
* **1 Copia Off-site:** Una copia almacenada en una región geográfica físicamente distinta para prevenir desastres naturales.
* **1 Copia Offline/Inmutable:** Un respaldo en formato WORM (Write Once, Read Many), bloqueado criptográficamente para que ni siquiera un atacante con acceso "root" pueda borrarlo o encriptarlo (mitigación contra Ransomware).
* **0 Errores:** Pruebas de restauración automatizadas diarias en entornos de *sandbox* para verificar la integridad de los datos.

#### C. Fase 2: Protocolo de Restauración (Restore Procedure)
Ante un compromiso crítico (ej. borrado de tablas por SQLi o corrupción por RCE):
1. **Contención:** Aislamiento inmediato a nivel de red del servidor comprometido (sacándolo del balanceador de carga) para preservar evidencia forense.
2. **Failover (Conmutación por error):** Activación automática de la infraestructura *Hot Standby* (servidores de contingencia pre-configurados) en una zona de disponibilidad secundaria.
3. **Restauración de Datos:** Inyección de los datos desde el último respaldo inmutable (cumpliendo el RPO de 15 minutos) a las nuevas instancias de base de datos.
4. **Validación:** Ejecución de scripts automatizados de integridad para confirmar que las pasarelas de pago y las sesiones de usuario operan sin anomalías antes de redirigir el tráfico DNS de los clientes al nuevo entorno.

#### D. Fase 3: Protocolo de Notificación de Incidentes y Escalamiento
La gestión de la crisis y la comunicación transparente son vitales para proteger la Reputación de Marca.

1. **Nivel 1 (Interno - T0 a T+30 min):**
   * El sistema de monitoreo (SIEM) genera la alerta.
   * Activación inmediata del CSIRT (Computer Security Incident Response Team) de MercadoSur.
   * Notificación al CISO y al Gerente General con la evaluación de impacto inicial.
2. **Nivel 2 (Legal y Regulatorio - T+2 a T+24 horas):**
   * Si se confirma la exfiltración de PII (datos personales) o datos financieros, el equipo legal notificará a las autoridades competentes (ej. CMF o Agencia de Protección de Datos) dentro del marco legal vigente, cumpliendo con los estándares de notificación de brechas.
3. **Nivel 3 (Público y Clientes - T+24 a T+48 horas):**
   * Despliegue de un comunicado oficial en el portal web y redes sociales.
   * Envío de correos electrónicos a los clientes afectados detallando qué datos fueron comprometidos, qué datos están a salvo (aclarando que los tokens de tarjetas de crédito no fueron expuestos si la pasarela estaba segmentada), y forzando un reseteo preventivo de contraseñas de forma automática.
   * Habilitación de una línea de soporte técnico prioritaria para resolución de dudas.