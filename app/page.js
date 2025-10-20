'use client'

// app/page.js – Versione JavaScript (no TypeScript) per evitare l'errore
// Titolo NON copre la foto del salone. Header sopra, hero con sola immagine.

import React, { useEffect, useRef, useState } from 'react';

// Dati demo – sostituisci con i tuoi
const HOURS = [
  { day: 'Lunedì', time: 'Chiuso' },
  { day: 'Martedì', time: '09:00 – 18:30' },
  { day: 'Mercoledì', time: '09:00 – 18:30' },
  { day: 'Giovedì', time: '09:00 – 18:30' },
  { day: 'Venerdì', time: '09:00 – 18:30' },
  { day: 'Sabato', time: '09:00 – 17:00' },
  { day: 'Domenica', time: 'Chiuso' },
];

const SERVICES = [
  { name: 'Taglio donna', price: 'da €25' },
  { name: 'Colore', price: 'da €40' },
  { name: 'Piega', price: '€18' },
  { name: 'Balayage', price: 'da €80' },
  { name: 'Trattamenti specifici', price: 'su richiesta' },
];

// Inserisci qui URL foto lavori (o lasciale così per test). Sostituibili con feed Instagram.
const WORKS = [
  '/capelli1.jpg',
  '/capelli2.jpg',
  '/capelli3.jpg',
  '/capelli4.jpg',
  '/capelli5.jpg',
  '/capelli6.jpg',
  '/capelli7.jpg',
];

const REVIEWS = [
  { name: 'Giulia', text: 'Professionalità e gentilezza, super consigliato!', stars: 5 },
  { name: 'Marco', text: 'Ottimo taglio, ambiente curato.', stars: 5 },
  { name: 'Sara', text: 'Colore perfetto e piega duratura.', stars: 5 },
];

function StarRow({ n }) {
  return (
    <div className="flex gap-1" aria-label={`${n} stelle`}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className="text-yellow-500">★</span>
      ))}
    </div>
  );
}

export default function Page() {
  // Carousel auto-scroll: mostra 3 foto alla volta su desktop, 1–2 su mobile
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % Math.ceil(WORKS.length));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('.work-card');
    if (!card) return;
    const perView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    const step = card.offsetWidth + 16; // + gap-4
    const maxIndex = Math.max(0, WORKS.length - perView);
    const clamped = Math.min(index, maxIndex);
    el.scrollTo({ left: clamped * step, behavior: 'smooth' });
  }, [index]);

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Header: titolo fuori dall'immagine per NON coprire il salone */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-semibold tracking-wide">Feel Hair</div>
          <nav className="hidden sm:flex gap-6 text-sm">
            <a href="#orari" className="hover:opacity-70">Orari</a>
            <a href="#lavori" className="hover:opacity-70">Lavori</a>
            <a href="#formazione" className="hover:opacity-70">Formazione</a>
            <a href="#servizi" className="hover:opacity-70">Servizi</a>
            <a href="#recensioni" className="hover:opacity-70">Recensioni</a>
            <a href="#contatti" className="hover:opacity-70">Contatti</a>
          </nav>
          <a href="#contatti" className="rounded-xl px-4 py-2 bg-neutral-900 text-white text-sm hover:bg-neutral-800">Prenota</a>
        </div>
      </header>

      {/* Hero: immagine a piena larghezza, SENZA overlay testo sopra */}
      <section aria-label="Il salone" className="relative">
        <img
          src="/salone.jpeg"
          alt="Interno del salone Feel Hair"
          className="w-full h-[60vh] sm:h-[70vh] object-cover"
        />
      </section>

      {/* Orari */}
      <section id="orari" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Orari di apertura</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {HOURS.map((h) => (
            <div key={h.day} className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="font-medium">{h.day}</div>
              <div className="text-neutral-600">{h.time}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Lavori – carosello 3 a 3 auto-scroll */}
      <section id="lavori" className="bg-white/70 border-y border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-2xl md:text-3xl font-semibold">I nostri lavori</h2>
            <a href="#" className="text-sm underline underline-offset-4 hover:opacity-70">Apri Instagram</a>
          </div>
          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
          >
            {WORKS.map((src, i) => (
              <div key={i} className="work-card min-w-[85%] sm:min-w-[60%] lg:min-w-[45%] snap-start">
                <div className="rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow">
                  {/* aspect ratio più verticale */}
                  <img src={src} alt={`Lavoro ${i + 1}`} className="w-full aspect-[2/3] object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formazione */}
      <section id="formazione" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Percorso di formazione</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="text-sm text-neutral-500">Dal 2015</div>
            <div className="mt-1 font-medium">Accademia base e avanzata</div>
            <p className="mt-2 text-neutral-600">Taglio, colore, tecniche di styling.</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="text-sm text-neutral-500">2018–2022</div>
            <div className="mt-1 font-medium">Masterclass colore & balayage</div>
            <p className="mt-2 text-neutral-600">Aggiornamenti continui con brand internazionali.</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="text-sm text-neutral-500">Oggi</div>
            <div className="mt-1 font-medium">Ricerca & formazione continua</div>
            <p className="mt-2 text-neutral-600">Workshop su trattamenti, cura cute e capelli.</p>
          </div>
        </div>
      </section>

      {/* Servizi e listino */}
      <section id="servizi" className="bg-white/70 border-y border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Servizi & listino indicativo</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="rounded-2xl border border-neutral-200 bg-white divide-y">
              {SERVICES.map((s) => (
                <li key={s.name} className="flex items-center justify-between p-4">
                  <span>{s.name}</span>
                  <span className="text-neutral-600">{s.price}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="font-medium">Note</h3>
              <p className="mt-2 text-sm text-neutral-600">
                I prezzi possono variare in base alla lunghezza e alle esigenze del capello. Preventivo gratuito in salone.
              </p>
              <a href="#contatti" className="mt-4 inline-block rounded-xl px-4 py-2 bg-neutral-900 text-white text-sm hover:bg-neutral-800">Richiedi preventivo</a>
            </div>
          </div>
        </div>
      </section>

      {/* Recensioni Google */}
      <section id="recensioni" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Recensioni</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <figure key={i} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <StarRow n={r.stars} />
              <blockquote className="mt-3 text-neutral-700">“{r.text}”</blockquote>
              <figcaption className="mt-4 text-sm text-neutral-500">— {r.name}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-6 text-sm text-neutral-500">Integrazione dinamica con Google Reviews pronta: basta aggiungere l'ID luogo.</p>
      </section>

      {/* Contatti */}
      <section id="contatti" className="bg-white/70 border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Contatti & dove siamo</h2>
            <div className="mt-4 space-y-2 text-neutral-700">
              <div><strong>Telefono:</strong> <a href="tel:+39000000000" className="underline underline-offset-4">+39 000 000 000</a></div>
              <div><strong>WhatsApp:</strong> <a href="https://wa.me/39000000000" className="underline underline-offset-4">Scrivici</a></div>
              <div><strong>Indirizzo:</strong> Via Esempio 1, Città</div>
              <div className="text-sm text-neutral-500">Orari soggetti a variazioni festive.</div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-sm">
            <iframe
              title="Mappa"
              className="w-full h-72"
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11547.3508!2d9.19!3d45.46!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDUuNDYgOS4xOQ!5e0!3m2!1sit!2sit!4v00000000000"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} Feel Hair</div>
          <div className="flex gap-4">
            <a href="#" className="hover:opacity-70">Instagram</a>
            <a href="#" className="hover:opacity-70">Google</a>
            <a href="#" className="hover:opacity-70">Privacy</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
