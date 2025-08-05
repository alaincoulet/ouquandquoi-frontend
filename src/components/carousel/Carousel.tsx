// src/components/carousel/Carousel.tsx
// Carousel horizontal avec drag souris/tactile, responsive, portions de cards visibles (style Netflix)
// Compatible avec ProductCard largeur fixe

import React, { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, idx: number) => React.ReactNode;
  cardWidth?: number;    // Largeur d'une card (px)
  cardGap?: number;      // Espace entre les cards (px)
  className?: string;
}

export default function Carousel<T>({
  items,
  renderItem,
  cardWidth = 288,
  cardGap = 50,
  className = "",
}: CarouselProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Gestion du drag souris
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    scrollRef.current.classList.add("cursor-grabbing");
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault(); // Empêche la sélection de texte
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current); // Mouvement du drag
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.classList.remove("cursor-grabbing");
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.classList.remove("cursor-grabbing");
  };

  // Fonction pour scroller d'une card à gauche/droite (flèches)
  const scrollByCard = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const delta = direction === "left" ? -1 : 1;
    scrollRef.current.scrollBy({
      left: delta * (cardWidth + cardGap),
      behavior: "smooth",
    });
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Flèche gauche */}
      <button
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 p-2 rounded-full bg-white shadow hover:bg-gray-200 transition"
        onClick={() => scrollByCard("left")}
        aria-label="Précédent"
        type="button"
        style={{ marginLeft: "-1.5rem" }}
      >
        <ChevronLeftIcon className="w-6 h-6 text-gray-500" />
      </button>
      {/* Flèche droite */}
      <button
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 p-2 rounded-full bg-white shadow hover:bg-gray-200 transition"
        onClick={() => scrollByCard("right")}
        aria-label="Suivant"
        type="button"
        style={{ marginRight: "-1.5rem" }}
      >
        <ChevronRightIcon className="w-6 h-6 text-gray-500" />
      </button>
      {/* Zone scrollable */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar px-10 cursor-grab select-none"
        style={{
          gap: `${cardGap}px`,
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch", // Bonus iOS smooth scroll
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            style={{
              width: cardWidth,
              minWidth: cardWidth,
              scrollSnapAlign: "start",
              flexShrink: 0,
            }}
          >
            {renderItem(item, idx)}
          </div>
        ))}
      </div>
    </div>
  );
}

