# Auditoría de Seguridad Web - MercadoSur
## Matriz de Riesgo, Mapa de Calor y Priorización

### 1. Metodología de Evaluación de Riesgos (TI)
Para evaluar las vulnerabilidades encontradas en el portal de MercadoSur, se emplea una metodología de evaluación de Riesgo Inherente basada en la fórmula **Riesgo = Probabilidad × Impacto**. 

Se utiliza una escala de 1 a 5 para ambos ejes:
* **Probabilidad (P):** 1 (Rara vez) a 5 (Casi Certeza/Fácilmente explotable de forma remota y automatizada).
* **Impacto (I):** 1 (Insignificante) a 5 (Catastrófico/Pérdida total de confidencialidad, integridad y disponibilidad del e-commerce).

**Escala de Colores (Mapa de Calor):**
* 🟩 **Bajo (1-4):** Riesgo aceptable con monitoreo.
* 🟨 **Medio (5-9):** Requiere mitigación a mediano plazo.
* 🟧 **Alto (10-16):** Requiere controles inmediatos.
* 🟥 **Extremo (17-25):** Riesgo crítico inaceptable; requiere detener operaciones hasta su corrección.

---

### 2. Mapa de Calor: Matriz Probabilidad × Impacto
Las vulnerabilidades detectadas en el entorno DVWA se han posicionado en la siguiente matriz según su viabilidad de explotación y su efecto sobre los activos críticos de MercadoSur.

| Impacto \ Probabilidad | 1. Rara vez | 2. Improbable | 3. Posible | 4. Probable | 5. Casi Certeza |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **5. Catastrófico** | 🟨 5 | 🟨 10 | 🟧 15 | 🟥 **20 (V2)** | 🟥 **25 (V1)** |
| **4. Mayor** | 🟩 4 | 🟨 8 | 🟧 12 | 🟧 16 | 🟥 20 |
| **3. Moderado** | 🟩 3 | 🟨 6 | 🟨 9 | 🟧 **12 (V3)** | 🟧 15 |
| **2. Menor** | 🟩 2 | 🟩 4 | 🟨 6 | 🟨 8 | 🟨 10 |
| **1. Insignificante** | 🟩 1 | 🟩 2 | 🟩 3 | 🟩 4 | 🟨 5 |

**Leyenda de Vulnerabilidades:**
* **V1:** Inyección SQL (SQLi)
* **V2:** Inyección de Comandos (OS Command Injection)
* **V3:** Cross-Site Scripting Reflejado (XSS)

---

### 3. Justificación de Ubicación en la Matriz (Contexto E-commerce)
La posición de cada amenaza en el mapa de calor responde a la realidad operativa de MercadoSur:

#### V1: Inyección SQL (Riesgo: 25 - Extremo 🟥)
* **Probabilidad (5 - Casi Certeza):** El payload (`' OR '1'='1`) es trivial. Existen miles de bots en internet escaneando y explotando automáticamente formularios web vulnerables 24/7 sin requerir interacción humana.
* **Impacto (5 - Catastrófico):** Un e-commerce no existe sin su base de datos. La extracción masiva de PII de clientes y datos de facturación destruye el activo principal de la empresa, desencadenando demandas, multas regulatorias y pérdida total de reputación.

#### V2: Inyección de Comandos (Riesgo: 20 - Extremo 🟥)
* **Probabilidad (4 - Probable):** Aunque la explotación es igual de sencilla que SQLi (usando el separador `;`), las funciones que interactúan directamente con el sistema operativo (como conversores de imágenes o pings de red) suelen estar en secciones menos expuestas o paneles administrativos, reduciendo marginalmente la superficie de exposición pública en comparación a un buscador general.
* **Impacto (5 - Catastrófico):** El RCE (Ejecución Remota de Código) otorga el control absoluto del servidor host. El atacante puede robar la base de datos, alterar el código de la pasarela de pagos e incluso utilizar el servidor de MercadoSur para atacar a terceros.

#### V3: XSS Reflejado (Riesgo: 12 - Alto 🟧)
* **Probabilidad (4 - Probable):** Para tener éxito, requiere un vector adicional de ingeniería social (lograr que el cliente legítimo haga clic en un enlace fraudulento distribuido por phishing o redes sociales). No es una explotación 100% directa al servidor.
* **Impacto (3 - Moderado):** El ataque compromete sesiones individuales (*Session Hijacking*), no la infraestructura central. Aunque es grave para el cliente afectado (posible robo de cuenta), no destruye la base de datos global de MercadoSur ni tumba los servidores.

---

### 4. Priorización de Atención y Remediación
Cruzando el Nivel de Riesgo obtenido en la matriz con las puntuaciones del estándar técnico CVSS v3.1, se establece el siguiente orden estricto de remediación:

1. **Prioridad 1: Inyección SQL (SQLi)**
   * **Riesgo:** 25 (Extremo) | **CVSS:** 9.8 (Crítica)
   * **Justificación:** Es la vulnerabilidad más crítica y con mayor probabilidad de ser explotada de forma masiva y automatizada. Su resolución mediante *Prepared Statements* bloquea la mayor amenaza de exfiltración de datos.
2. **Prioridad 2: Inyección de Comandos (OS Command Injection)**
   * **Riesgo:** 20 (Extremo) | **CVSS:** 9.8 (Crítica)
   * **Justificación:** Comparte el mismo puntaje técnico CVSS que SQLi (9.8), pero su probabilidad de descubrimiento a nivel público es ligeramente menor. Su remediación evitará el control total de la infraestructura subyacente.
3. **Prioridad 3: Cross-Site Scripting (XSS Reflejado)**
   * **Riesgo:** 12 (Alto) | **CVSS:** 6.1 (Media)
   * **Justificación:** Aunque requiere interacción de la víctima, su severidad es suficiente para dañar clientes específicos. Se abordará una vez que los riesgos a nivel de servidor (SQLi y Comandos) hayan sido neutralizados, aplicando *Output Encoding* y políticas CSP.