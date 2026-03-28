# Sonikia - Premium AI Music Generation

A sophisticated web application that generates unique music using artificial intelligence through the MusicGPT API.

## ✨ Features

- **Advanced AI Music Generation**: Create professional-quality tracks from text descriptions
- **Premium Dark UI**: Modern, elegant interface with immersive dark theme
- **Real-time Visualization**: Animated equalizer and progress indicators
- **High-Quality Audio**: Built-in audio player with native controls
- **Instant Downloads**: Save your creations as MP3 files
- **Smart Error Handling**: Helpful troubleshooting tips and solutions
- **Smooth Animations**: Fluid transitions and micro-interactions
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Glass Morphism Design**: Modern frosted glass effects
- **Gradient Backgrounds**: Dynamic purple and pink themes
- **React Best Practices**: Component composition, custom hooks, memoization
- **Performance Optimized**: Efficient rendering and state management

## 🎨 Design Philosophy

Sonikia features a premium, music-inspired aesthetic with:
- Dark purple/pink gradient themes
- Animated audio waveforms and particles
- Professional glass-morphism cards
- Smooth hover effects and transitions
- Premium typography and spacing
- Immersive visual experience

## 📋 Requisitos Previos

- Node.js 20+ instalado
- Una API key de MusicGPT (obténla en [https://api.musicgpt.com/](https://api.musicgpt.com/))

## 🛠️ Instalación

1. **Clona el repositorio** (o navega al directorio del proyecto):
   ```bash
   cd sonikia
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**:

   Crea un archivo `.env.local` en la raíz del proyecto con tu API key:
   ```env
   MUSICGPT_API_KEY=tu_api_key_aqui
   MUSICGPT_BASE_URL=https://api.musicgpt.com/api/public
   ```

   Nota: Ya existe un archivo `.env.local` con una plantilla de configuración.

## 🎬 Cómo Ejecutar

### Modo Desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Modo Producción
```bash
npm run build
npm start
```

## 📖 Uso

1. **Describe tu música**: En el área de texto, describe el tipo de música que deseas generar (ej: "lofi chill beat con piano y lluvia")

2. **Genera**: Haz clic en el botón "Generar Música"

3. **Espera**: El sistema mostrará una barra de progreso mientras se genera tu música

4. **Disfruta**: Cuando esté completa, podrás reproducir la música directamente en el navegador o descargarla como MP3

## 🎬 How to Run

### Development Mode
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Mode
```bash
npm run build
npm start
```

## 📖 Usage

1. **Describe Your Music**: Enter a detailed description of the music you want to create (e.g., "lo-fi chill beat with soft piano and rain sounds")

2. **Generate**: Click the "Generate Music" button

3. **Wait**: The system will show a progress bar with real-time updates

4. **Enjoy**: When complete, play the music directly in the browser or download it as MP3

## 🏗️ Project Structure

```
sonikia/
├── app/
│   ├── api/
│   │   └── music/
│   │       ├── route.ts          # POST: Start generation
│   │       └── [taskId]/
│   │           └── route.ts      # GET: Check status
│   ├── page.tsx                  # Main page
│   ├── layout.tsx                # App layout
│   └── globals.css               # Global styles & animations
├── components/
│   └── music-generator.tsx       # Main component
├── types/
│   └── musicgpt.ts               # TypeScript types
├── .env.local                    # Environment variables
├── PLAN.md                       # Implementation plan
└── package.json                  # Dependencies
```

## 🔧 Tech Stack

- **Next.js 16.2.1** - React framework
- **React 19.2.4** - UI library
- **TypeScript 5** - Static typing
- **Tailwind CSS 4** - Styling
- **MusicGPT API** - AI music generation

## 📝 Important Notes

- Music generation time varies based on prompt complexity
- Status polling occurs every 5 seconds
- Maximum timeout is 10 minutes
- Keep your API key secure and never share it publicly

## 🐛 Troubleshooting

### Error: "MusicGPT API key is not configured"
- Ensure you've created the `.env.local` file with your API key
- Restart the development server after creating the file

### Error: "Failed to generate music"
- Verify your API key is valid
- Ensure you have sufficient credits in your MusicGPT account
- Check that your prompt is not empty

### Music is taking too long to generate
- This is normal depending on prompt complexity
- Estimated time is displayed during generation

## 🎨 Design Features

- **Immersive Dark Theme**: Easy on the eyes, professional appearance
- **Animated Equalizers**: Visual feedback during music generation
- **Gradient Effects**: Purple and pink color scheme
- **Glass Morphism**: Modern frosted glass UI elements
- **Smooth Transitions**: Polished animations throughout
- **Responsive Layout**: Works perfectly on all devices

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Credits

Designed and developed by Edwin Estrella

## 🤝 Contributing

Contributions are welcome. Please open an issue or pull request for any improvements or bug fixes.
