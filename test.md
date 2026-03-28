# Sonikia - Test Plan

## Configuración de Testsprite

Este archivo contiene las pruebas E2E para la aplicación Sonikia.

---

## Setup Inicial

```bash
# Instalar Testsprite
npm install -D @testsprite/cli

# Crear archivo de configuración
npx testsprite init
```

---

## Flujos de Prueba Principales

### 1. Registro e Inicio de Sesión

#### Test: Registro de nuevo usuario
- **Url:** `/auth`
- **Pasos:**
  1. Navegar a `/auth`
  2. Hacer clic en "Crear cuenta"
  3. Ingresar email: `test@sonikia.com`
  4. Ingresar contraseña: `Test123456`
  5. Hacer clic en "Registrarse"
  6. **Expected:** Redirección a `/app` o verificación de email

#### Test: Inicio de sesión
- **Url:** `/auth`
- **Pasos:**
  1. Navegar a `/auth`
  2. Ingresar email: `info@azokia.com`
  3. Ingresar contraseña: `Hola1234`
  4. Hacer clic en "Iniciar sesión"
  5. **Expected:** Redirección a `/app`

---

### 2. Generación de Música

#### Test: Generar música simple
- **Url:** `/app`
- **Pasos:**
  1. Iniciar sesión
  2. Esperar carga completa
  3. Seleccionar preset musical (ej: "Lofi Chill")
  4. Escribir prompt: "Un beat relajante con piano"
  5. Hacer clic en "Generar Música"
  6. **Expected:**
     - Spinner de carga aparece
     - Barra de progreso avanza
     - Después de ~2 min, aparece reproductor de audio

#### Test: Generar música con opciones avanzadas
- **Url:** `/app`
- **Pasos:**
  1. Activar "Solo Vocal"
  2. Seleccionar género: "Masculino"
  3. Agregar letra: "Canción de prueba con letras"
  4. Seleccionar estilo: "Trap"
  5. Escribir prompt: "Beat trap pesado"
  6. Generar música
  7. **Expected:** Música generada con las opciones aplicadas

---

### 3. Historial de Músicas

#### Test: Ver historial vacío
- **Url:** `/history`
- **Pasos:**
  1. Iniciar sesión con usuario sin músicas
  2. Navegar a `/history`
  3. **Expected:** Mensaje "Aún no has creado ninguna música"

#### Test: Ver historial con músicas
- **Url:** `/history`
- **Pasos:**
  1. Usuario con músicas previas
  2. Navegar a `/history`
  3. **Expected:**
     - Lista de músicas creadas
     - Cada tarjeta muestra: prompt, estilo, fecha
     - Reproductores de audio funcionales
     - Botón de descarga funciona

#### Test: Eliminar música del historial
- **Url:** `/history`
- **Pasos:**
  1. Hacer clic en botón de eliminar de una música
  2. Confirmar diálogo
  3. **Expected:** Música eliminada de la lista

---

### 4. Landing Page

#### Test: Navegación desde landing
- **Url:** `/`
- **Pasos:**
  1. Hacer clic en "Comenzar" en hero
  2. **Expected:** Redirección a `/auth` (si no autenticado) o `/app`

#### Test: Ver features
- **Url:** `/`
- **Pasos:**
  1. Scroll a sección de features
  2. **Expected:** BentoGrid con 6 cards visibles
  3. Hover effects funcionan

#### Test: Ver testimonials
- **Url:** `/`
- **Pasos:**
  1. Scroll a sección de testimonials
  2. **Expected:** 3 columnas con scroll automático
  3. Tarjetas con avatares y estrellas

---

### 5. Responsive Design

#### Test: Mobile (375px)
- **Pasos:**
  1. Abrir app en viewport móvil
  2. **Expected:** Todos los elementos son visibles y usables
  3. Dropdowns funcionan correctamente
  4. Botones son touch-friendly

#### Test: Tablet (768px)
- **Pasos:**
  1. Abrir app en viewport tablet
  2. **Expected:** Layout optimizado para tablet
  3. Grid de historial muestra 2 columnas

#### Test: Desktop (1920px)
- **Pasos:**
  1. Abrir app en viewport desktop
  2. **Expected:** Layout completo con 3 columnas en historial

---

## Tests de Performance

### Test: Tiempo de carga inicial
- **Expected:** < 3 segundos para página completa

### Test: Tiempo de generación
- **Expected:** Progreso actualiza cada 5 segundos
- **Expected:** Completación en < 2 minutos

---

## Tests de Accesibilidad

### Test: Navegación por teclado
- **Pasos:**
  1. Usar Tab para navegar
  2. **Expected:** Todos los elementos interactivos son focusables
  3. Enter activa botones y dropdowns

### Test: Contraste de colores
- **Expected:** Ratio de contraste WCAG AA cumplido
- **Expected:** Textos legibles en fondo oscuro

---

## Tests de Storage

### Test: Cierre de sesión persistente
- **Pasos:**
  1. Iniciar sesión
  2. Cerrar navegador
  3. Reabrir `/app`
  4. **Expected:** Usuario aún autenticado

### Test: Cerrar sesión
- **Pasos:**
  1. Hacer clic en "Cerrar sesión" en navbar
  2. **Expected:** Redirección a `/auth`
  3. **Expected:** Token eliminado

---

## Casos de Error

### Test: Generación fallida
- **Pasos:**
  1. Simular error de API
  2. **Expected:** Mensaje de error amigable mostrado
  3. **Expected:** Botón "Reintentar" disponible

### Test: Prompt vacío
- **Pasos:**
  1. Dejar campo de prompt vacío
  2. Hacer clic en "Generar Música"
  3. **Expected:** Validación previene envío
  4. **Expected:** Botón deshabilitado

### Test: Música muy larga
- **Pasos:**
  1. Escribir prompt de > 280 caracteres
  2. **Expected:** Contador muestra caracteres restantes
  3. **Expected:** Previne escribir más del límite

---

## Comandos Testsprite

```bash
# Ejecutar todos los tests
npx testsprite test

# Ejecutar test específico
npx testsprite test --filter "registro"

# Ejecutar en modo watch
npx testsprite test --watch

# Generar reporte
npx testsprite test --reporter json > report.json

# Ejecutar con screenshots
npx testsprite test --screenshots
```

---

## Configuración Recomendada

Crear `.testsprite.config.ts`:

```typescript
export default {
  baseUrl: 'http://localhost:3000',
  viewport: { width: 1920, height: 1080 },
  screenshotDir: './screenshots',
  videoDir: './videos',
  retries: 2,
  timeout: 30000,
  reporters: ['cli', 'json'],
};
```

---

## Notas

- Los tests requieren servidor corriendo: `npm run dev`
- Usar usuario de prueba real o crear mock de API
- Limpiar datos de prueba después de cada test
- Considerar usar database de prueba
