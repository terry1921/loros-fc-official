import { MockData } from '../types';

export const MOCK_DATA: MockData = {
  nextMatch: {
    opponent: "Halcones Dorados",
    date: "25 Nov, 2023",
    time: "20:00",
    stadium: "Estadio La Selva",
    home: true
  },
  lastMatch: {
    opponent: "Tiburones Rojos",
    score: "2 - 1",
    result: "W", // Win, Loss, Draw
    scorer: "M. Martínez (88')"
  },
  players: [
    { id: 1, name: "Carlos 'El Tanque' Ruiz", number: 9, position: "Delantero", img: "bg-emerald-200" },
    { id: 2, name: "Javi López", number: 10, position: "Mediocampista", img: "bg-yellow-200" },
    { id: 3, name: "Roberto Silva", number: 4, position: "Defensa", img: "bg-red-200" },
    { id: 4, name: "Memo Ochoa Jr.", number: 1, position: "Portero", img: "bg-gray-200" },
  ],
  news: [
    { id: 1, title: "¡Victoria agónica en el clásico!", date: "20 Nov", category: "Primer Equipo", summary: "Un gol en el último minuto nos dio los 3 puntos." },
    { id: 2, title: "Lanzamiento del nuevo jersey 2024", date: "18 Nov", category: "Club", summary: "Inspirado en las plumas del loro real. Ya disponible." },
    { id: 3, title: "Visorías abiertas para Sub-17", date: "15 Nov", category: "Fuerzas Básicas", summary: "Buscamos al nuevo talento local este fin de semana." },
  ]
};
