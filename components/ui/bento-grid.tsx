"use client";

import { cn } from "@/lib/utils";
import {
  MusicNote,
  Bolt,
  MyLocation,
  Palette,
  Description,
  Diamond,
} from "@mui/icons-material";

export interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
}

interface BentoGridProps {
  items?: BentoItem[];
}

const itemsSample: BentoItem[] = [
  {
    title: "Generación Ilimitada",
    meta: "∞ canciones",
    description: "Crea toda la música que quieras sin restricciones ni límites mensuales",
    icon: <MusicNote className="w-4 h-4 text-purple-500" />,
    status: "Active",
    tags: ["IA", "Sin límites"],
    colSpan: 2,
    hasPersistentHover: true,
  },
  {
    title: "Ultra Rápido",
    meta: "< 2 min",
    description: "Obtén tus pistas en menos de 2 minutos con nuestra IA optimizada",
    icon: <Bolt className="w-4 h-4 text-pink-500" />,
    status: "Live",
    tags: ["Velocidad", "Optimizado"],
  },
  {
    title: "Doble Versión",
    meta: "2x canciones",
    description: "Recibe 2 versiones únicas de cada canción para elegir tu favorita",
    icon: <MyLocation className="w-4 h-4 text-purple-400" />,
    tags: ["Variedad", "Opciones"],
    colSpan: 2,
  },
  {
    title: "Estilos Infinitos",
    meta: "10+ estilos",
    description: "Trap, Reggaetón, Rock, Pop, Jazz y más. Personaliza cada detalle",
    icon: <Palette className="w-4 h-4 text-pink-400" />,
    status: "Updated",
    tags: ["Géneros", "Personalización"],
  },
  {
    title: "Letras Personalizadas",
    meta: "Con/sin letra",
    description: "Añade tus propias letras o deja que la IA cree por ti",
    icon: <Description className="w-4 h-4 text-purple-500" />,
    tags: ["Creatividad", "IA"],
  },
  {
    title: "Calidad Premium",
    meta: "HD Audio",
    description: "Audio de alta calidad listo para usar en tus proyectos",
    icon: <Diamond className="w-4 h-4 text-pink-500" />,
    status: "Pro",
    tags: ["Studio", "Profesional"],
  },
];

function BentoGrid({ items = itemsSample }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 max-w-7xl mx-auto">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "group relative p-6 rounded-2xl overflow-hidden transition-all duration-300",
            "border border-purple-500/20 bg-gray-800/60 backdrop-blur-xl",
            "hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)] hover:border-purple-500/40",
            "hover:-translate-y-1 will-change-transform",
            item.colSpan || "col-span-1",
            item.colSpan === 2 ? "md:col-span-2" : "",
            {
              "shadow-[0_8px_30px_rgba(168,85,247,0.15)] -translate-y-1":
                item.hasPersistentHover,
            }
          )}
        >
          {/* Background Pattern */}
          <div
            className={`absolute inset-0 ${
              item.hasPersistentHover
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            } transition-opacity duration-300`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05)_1px,transparent_1px)] bg-[length:6px_6px]" />
          </div>

          {/* Content */}
          <div className="relative flex flex-col space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-600/20 to-pink-600/20 group-hover:from-purple-600/30 group-hover:to-pink-600/30 transition-all duration-300">
                {item.icon}
              </div>
              <span
                className={cn(
                  "text-xs font-medium px-3 py-1 rounded-lg backdrop-blur-sm",
                  "bg-purple-500/20 text-purple-300 border border-purple-500/30",
                  "transition-colors duration-300 group-hover:bg-purple-500/30 group-hover:border-purple-500/50"
                )}
              >
                {item.status || "Active"}
              </span>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h3 className="font-semibold text-white tracking-tight text-lg">
                {item.title}
                <span className="ml-2 text-sm text-purple-400 font-normal">
                  {item.meta}
                </span>
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                {item.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm transition-all duration-200 hover:bg-purple-500/20 hover:border-purple-500/30"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <span className="text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.cta || "Explorar →"}
              </span>
            </div>
          </div>

          {/* Gradient Border */}
          <div
            className={`absolute inset-0 -z-10 rounded-2xl p-px bg-gradient-to-br from-transparent via-purple-500/20 to-transparent ${
              item.hasPersistentHover
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            } transition-opacity duration-300`}
          />
        </div>
      ))}
    </div>
  );
}

export { BentoGrid };
