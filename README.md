# 🛍️ MercadoSur - Portal de Auditoría DevSecOps

<div align="center">
  <h3>Evaluación Sumativa 3 - INACAP</h3>
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Gemini_AI-%238E75B2.svg?style=for-the-badge&logo=googlegemini&logoColor=white" alt="Gemini AI" />
</div>

---

## 📋 Contexto Académico
* **Institución:** INACAP Valparaíso
* **Asignatura:** Fundamentos de Seguridad de la Información
* **Docente:** Ruben Alejandro Schnettler Lucero
* **Estudiante:** Michele Andrea Barriga Carrasco (Analista Programador)
* **Fecha de Entrega:** Martes 7 de junio

---

## 🏢 Sobre el Proyecto: Caso MercadoSur

**MercadoSur** es una empresa ficticia líder en el rubro del comercio electrónico (E-commerce). Debido a la naturaleza de su negocio, la plataforma gestiona diariamente bases de datos con Información de Identificación Personal (PII) crítica, historiales logísticos y transacciones financieras a través de diversas pasarelas de pago.

Este proyecto web funciona como un **Dashboard Ejecutivo y Técnico** que presenta los resultados de una auditoría de ciberseguridad simulada (ejecutada en un entorno controlado DVWA). El objetivo principal es exponer las brechas en la validación de datos (SQLi, OS Command Injection, XSS), cuantificar el riesgo para la organización y establecer un Plan de Recuperación ante Desastres (DRP) alineado con los estándares de la industria.

---

## 🚀 Características y Módulos de la Aplicación

La aplicación está diseñada como una Single Page Application (SPA) interactiva, con diseño responsivo, soporte de "Dark Mode" nativo y navegación secuencial, e incluye:

1. **Dashboard de Inicio:** Gráficos interactivos SVG y métricas CVSS v3.1.
2. **Resumen Ejecutivo:** Presentación de alto nivel sobre la postura de seguridad.
3. **Módulos Forenses (Vulnerabilidades):** Evidencia documentada de ataques de Inyección SQL, Inyección de Comandos y XSS Reflejado.
4. **Matriz IPER Interactiva:** Mapa de calor de evaluación de riesgos (Probabilidad × Impacto).
5. **Mitigación y Continuidad (DRP):** Estrategias de defensa Zero Trust, WAF, segmentación y métricas RTO/RPO de recuperación.
6. **Bitácora IA:** Registro de los Prompts utilizados mediante la asistencia de Google Gemini para estructurar la auditoría.

---

## 🔐 Credenciales de Acceso

La plataforma cuenta con un portal de autenticación corporativo restringido. Para acceder a los resultados de la auditoría en el entorno local o de producción, utilice las siguientes credenciales de administrador:

* **Correo:** `admin@mercadosur.cl`
* **Contraseña:** `RubenProfeGoat`

---

## ⚙️ Instrucciones de Instalación y Ejecución

Para clonar y correr este proyecto en tu máquina local, asegúrate de tener instalado [Node.js](https://nodejs.org/) y [Git](https://git-scm.com/). Sigue estos pasos en tu terminal:

**1. Clonar el repositorio**
```bash
git clone [https://github.com/Michprogram/auditoria_barmic.git](https://github.com/Michprogram/auditoria_barmic.git)

```

**2. Navegar al directorio del proyecto**

```bash
cd auditoria_barmic

```

**3. Instalar las dependencias**

```bash
npm install

```

**4. Levantar el servidor de desarrollo**

```bash
npm run dev

```

> El proyecto estará disponible por defecto en `http://localhost:5173/`

**5. Generar compilación para producción (Test previo a Vercel)**

```bash
npm run build

```

---

## 🛠️ Stack Tecnológico Utilizado

* **Frontend:** React.js 18
* **Tooling:** Vite
* **Lenguaje:** TypeScript
* **Estilos:** Tailwind CSS 3 (Configuración Dark Mode con clases)
* **Iconografía:** SVGs nativos optimizados.
* **Despliegue (Deploy):** Vercel
* **Asistente de IA:** Google Gemini (Generación de contenido, estructuración de Markdown, Debugging y UI/UX).

---