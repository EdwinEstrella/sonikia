# Plan de Implementación - Sonikia (Generador de Música con MusicGPT)

## 📋 Arquitectura General

### Estructura de Componentes
```
app/
├── page.tsx              # Página principal con el generador de música
├── globals.css           # Estilos globales de Tailwind
└── layout.tsx            # Layout de la aplicación

components/
└── music-generator.tsx   # Componente principal del generador
    ├── PromptInputForm    # Formulario para ingresar el prompt
    ├── LoadingState       # Indicador de carga con animación
    ├── AudioPlayer        # Reproductor de audio con controles
    └── ErrorMessage       # Componente para mostrar errores
```

### API Routes (Next.js)
```
app/api/
└── music/
    ├── route.ts          # POST: Iniciar generación de música
    └── [taskId]/route.ts # GET: Consultar estado de conversión
```

## 🔄 Flujo de Datos

1. **Usuario ingresa prompt** → PromptInputForm
2. **POST /api/music** → Llama a MusicGPT API (POST /v1/MusicAI)
3. **Retorna task_id** → Inicia polling
4. **Polling cada 5 segundos** → GET /api/music/[taskId] → MusicGPT API (GET /v1/byId)
5. **Cuando status = 'complete'** → Muestra AudioPlayer con audio_url

## 🎨 Diseño UI/UX

### Pantalla Inicial
- **Título**: "Sonikia - Generador de Música con IA"
- **Input**: Textarea grande con placeholder "Describe la música que deseas..."
- **Botón**: "Generar Música" con estilo destacado
- **Paleta**: Colores oscuros con acentos morados/azules (tema musical)

### Estado de Carga
- **Animación**: Spinner o equalizer animado
- **Texto**: "Generando tu música..." + ETA estimado
- **Barra de progreso**: Indicador visual del tiempo estimado

### Reproductor de Audio
- **HTML5 Audio element**: Con controles nativos
- **Botón adicional**: "Descargar MP3"
- **Info**: Título, estilo musical, duración

### Manejo de Errores
- **Mensaje en rojo**: Descripción del error
- **Botón**: "Intentar de nuevo"

## 🛠️ Detalles Técnicos

### Variables de Entorno
```env
MUSICGPT_API_KEY=tu_api_key_aqui
MUSICGPT_BASE_URL=https://api.musicgpt.com/api/public
```

### Integración API
- **Autenticación**: Bearer token en header `Authorization`
- **POST /v1/MusicAI**:
  ```typescript
  {
    prompt: string,
    music_style?: string,
    output_length?: number,
    make_instrumental?: boolean
  }
  ```
- **GET /v1/byId**:
  ```typescript
  ?conversionType=MUSIC_AI&task_id={taskId}
  ```

### Estrategia de Polling
- Intervalo: 5 segundos
- Timeout máximo: 10 minutos
- Reintentos: 3 en caso de error de red
- Cancelable: El usuario puede cancelar la generación

### Estado de la Aplicación (React State)
```typescript
type AppState = {
  status: 'idle' | 'generating' | 'complete' | 'error'
  prompt: string
  taskId: string | null
  audioUrl: string | null
  error: string | null
  eta: number | null
  progress: number
}
```

## 📦 Dependencias Necesarias
- Ya instaladas: Next.js, React, Tailwind CSS
- Opcionales: framer-motion (animaciones), react-icons (iconos)

## ✅ Plan de Implementación (Orden)

1. **Configuración inicial**
   - ✅ Crear archivo .env.local con API key
   - Configurar types de TypeScript para respuestas API

2. **API Routes**
   - Crear endpoint POST /api/music
   - Crear endpoint GET /api/music/[taskId]

3. **Componente MusicGenerator**
   - PromptInputForm con validación
   - LoadingState con animación
   - AudioPlayer con descarga
   - ErrorMessage

4. **Página Principal**
   - Integrar MusicGenerator
   - Estilizar con Tailwind CSS

5. **Testing**
   - Probar flujo completo
   - Verificar manejo de errores
   - Probar diferentes prompts

## 📚 Referencias de API

### MusicGPT API Documentation
- **Base URL**: https://api.musicgpt.com/api/public
- **Auth**: Bearer token en header `Authorization`
- **Endpoints**:
  - POST /v1/MusicAI - Generar música
  - GET /v1/byId - Consultar estado de conversión

### POST /v1/MusicAI
**Request Body:**
```typescript
{
  prompt: string              // Required: Descripción de la música
  music_style?: string        // Optional: Estilo musical
  lyrics?: string             // Optional: Letra de la canción
  make_instrumental?: boolean // Optional: Solo instrumental
  vocal_only?: boolean        // Optional: Solo voces
  gender?: string             // Optional: género de voz
  voice_id?: string           // Optional: ID de voz específica
  output_length?: number      // Optional: Duración en segundos
  webhook_url?: string        // Optional: URL para webhook
}
```

**Response:**
```typescript
{
  success: boolean
  message: string
  task_id: string
  conversion_id_1: string
  conversion_id_2: string
  eta: number                // Tiempo estimado en segundos
}
```

### GET /v1/byId
**Query Parameters:**
```
conversionType=MUSIC_AI
task_id={task_id}  // o conversion_id
```

**Response:**
```typescript
{
  success: boolean
  conversion: {
    task_id: string
    conversion_id: string
    status: string           // 'processing', 'complete', 'failed'
    status_msg: string
    audio_url?: string       // Disponible cuando status='complete'
    conversion_cost: number
    title: string
    lyrics: string
    music_style: string
    createdAt: string
    updatedAt: string
  }
}
```
