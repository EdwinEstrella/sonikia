# CSS Animation Properties Fix

## Issue Description

React lanza una advertencia cuando se mezclan propiedades CSS shorthand con propiedades específicas en el mismo elemento.

**Error:**
```
Updating a style property during rerender (animation) when a conflicting property is set (animationDelay) can lead to styling bugs.
```

## Root Cause

El problema ocurre cuando se usa:
```jsx
<div
  className="animate-equalizer"  // ← Contiene 'animation' shorthand
  style={{
    animationDelay: `${delay}s`,  // ← Propiedad específica
  }}
>
```

Las clases CSS como `animate-equalizer` incluyen la propiedad shorthand `animation`, y luego intentamos sobrescribir `animationDelay` con estilo inline, lo cual causa conflictos.

## Solution

Separar todas las propiedades de animación en lugar de usar shorthand:

### ❌ Before (Incorrect)
```jsx
<div
  className="animate-equalizer"
  style={{
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  }}
>
```

### ✅ After (Correct)
```jsx
<div
  style={{
    animationName: 'equalizer',
    animationDuration: `${duration}s`,
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
    animationDelay: `${delay}s`,
  }}
>
```

## Files Fixed

1. **app/page.tsx**
   - Waveform backgrounds
   - Floating particles

2. **components/generating-state.tsx**
   - Equalizer bars

3. **components/music-header.tsx**
   - Sound wave indicators

## CSS Animation Properties Reference

En lugar de usar:
```css
animation: name duration timing-function delay iteration-count direction;
```

Usar propiedades separadas:
```css
animation-name: name;
animation-duration: time;
animation-timing-function: timing;
animation-delay: time;
animation-iteration-count: count | infinite;
animation-direction: normal | reverse | alternate | etc.;
```

## Benefits

✅ Evita conflictos de propiedades CSS
✅ Mejor control individual de cada propiedad
✅ Código más explícito y mantenible
✅ Sin advertencias de React
✅ Comportamiento consistente entre navegadores

## Testing

Después de aplicar estos cambios:
- ✅ ESLint: Sin errores ni warnings
- ✅ Build: Compilación exitosa
- ✅ Runtime: Sin errores en consola
- ✅ Animaciones: Funcionan correctamente

## Best Practices

1. **Evitar mezclar shorthand con propiedades específicas**
   - Usa solo shorthand o solo propiedades específicas
   - Nunca mezcles ambos en el mismo elemento

2. **Preferir propiedades específicas en React**
   - Más control granular
   - Fácil de modificar dinámicamente
   - Evita conflictos de sobrescritura

3. **Mantener animaciones en CSS cuando sea posible**
   - Usa clases CSS para animaciones estáticas
   - Usa estilos inline solo para valores dinámicos
   - Sepola preocupaciones (CSS vs JS)
