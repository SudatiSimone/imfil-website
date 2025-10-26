'use client'

// app/page.js – Versione JavaScript (no TypeScript) per evitare l'errore
// Titolo NON copre la foto del salone. Header sopra, hero con sola immagine.

import React, { useEffect, useRef, useState } from 'react';

// Dati demo – sostituisci con i tuoi
const HOURS = [
  { day: 'Lunedì', time: 'Chiuso' },
  { day: 'Martedì', time: 'Chiuso' },
  { day: 'Mercoledì', time: 'Chiuso' },
  { day: 'Giovedì', time: '08:30 – 20:00' },
  { day: 'Venerdì', time: '08:30 – 19:00' },
  { day: 'Sabato', time: '08:00 – 17:30' },
  { day: 'Domenica', time: 'Chiuso' },
];

const SERVICES = [
  { name: 'Taglio donna' },
  { name: 'Taglio uomo e barba' },
  { name: 'Colore' },
  { name: 'Piega'},
  { name: 'Balayage' },
  { name: 'Trattamenti specifici', price: 'su richiesta' },
];

const PREVENTIVO_MSG =
  "Ciao! Vorrei richiedere una consulenza.\n" +
  "Nome: ____\n" +
  "Servizio richiesto: ____\n" +
  "Lunghezza capelli: ____\n" +
  "Preferenza giorno/orario: ____";

const PRENOTAZIONE_MSG =
  "Ciao! Vorrei richiedere una prenotazione.\n" +
  "Nome: ____\n" +
  "Servizio richiesto: ____\n" +
  "Preferenza giorno/orario: ____" + 
  "In alternativa quali sarebbero le disponibilità a seconda delle mie esigenze che sono _____ ?";

const WHATSAPP_NUMBER = '393347712249';

// Inserisci qui URL foto lavori (o lasciale così per test). Sostituibili con feed Instagram.
const WORKS = [
  '/capelli1.jpg',
  '/capelli2.jpg',
  '/capelli3.jpg',
  '/capelli4.jpg',
  '/capelli5.jpg',
  '/capelli6.jpg',
  '/capelli7.jpg',
  '/capelli8.jpg',
  '/capelli9.jpg',
  '/capelli10.jpg',
  '/capelli11.jpg',
  '/capelli12.jpg',
  '/capelli13.jpg',
  '/capelli14.jpg',
  '/capelli15.jpg',
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
  // --- NEW: stato per hamburger menu ---
  const [menuOpen, setMenuOpen] = useState(false);

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

  // --- NEW: chiudi menu con ESC ---
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Header: titolo fuori dall'immagine per NON coprire il salone */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          {/* Brand */}
          <div className="text-2xl font-semibold tracking-wide">Feel Hair Studio</div>

          {/* Bottone hamburger (mostrato solo su mobile) */}
          <button
            type="button"
            className="sm:hidden inline-flex items-center justify-center rounded-xl p-2 border border-neutral-300 hover:bg-neutral-100"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
            <span className="sr-only">Apri/chiudi menu</span>
          </button>

          {/* Nav desktop */}
          <nav className="hidden sm:flex gap-6 text-sm">
            <a href="#orari" className="hover:opacity-70">Orari</a>
            <a href="#lavori" className="hover:opacity-70">Lavori</a>
            <a href="#formazione" className="hover:opacity-70">Formazione</a>
            <a href="#servizi" className="hover:opacity-70">Servizi</a>
            <a href="#recensioni" className="hover:opacity-70">Recensioni</a>
            <a href="#contatti" className="hover:opacity-70">Contatti</a>
          </nav>

          {/* CTA desktop (nascosta su mobile per lasciare spazio all'hamburger) */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PRENOTAZIONE_MSG)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block rounded-xl px-4 py-2 bg-neutral-900 text-white text-sm hover:bg-neutral-800"
          >
            Prenota
            </a>
        </div>

        {/* --- NEW: pannello mobile a scomparsa --- */}
        <div
          id="mobile-menu"
          className={`sm:hidden overflow-hidden transition-[max-height] duration-300 ${menuOpen ? 'max-h-96' : 'max-h-0'}`}
        >
          <nav className="px-4 pb-3 pt-2 border-t border-neutral-200 bg-white">
            <ul className="flex flex-col gap-1 text-sm">
              {[
                ['#orari','Orari'],
                ['#lavori','Lavori'],
                ['#formazione','Formazione'],
                ['#servizi','Servizi'],
                ['#recensioni','Recensioni'],
                ['#contatti','Contatti'],
              ].map(([href,label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="block rounded-lg px-3 py-2 hover:bg-neutral-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="pt-1">
                <a
                  href="#contatti"
                  className="block text-center rounded-xl px-4 py-2 bg-neutral-900 text-white hover:bg-neutral-800"
                  onClick={() => setMenuOpen(false)}
                >
                  Prenota
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero: immagine a piena larghezza, SENZA overlay testo sopra */}
      <section aria-label="Il salone" className="relative">
        <img
          src="/salone.jpeg"
          alt="Interno del salone Feel Hair"
          className="w-full h-[42vh] sm:h-[55vh] lg:h-[70vh] object-cover object-center"
        />
      </section>

      {/* Orari */}
      <section id="orari" className="mx-auto max-w-6xl px-3 py-8 md:px-4 md:py-12">

        <div className="mb-4 md:mb-6">
          <h2 className="text-xl md:text-3xl font-semibold">Orari d&apos;apertura</h2>
          <p className="text-sm md:text-base text-neutral-500">
            <span className="block">Prenotazione solo su appuntamento.</span>
            <span className="block">Gli orari possono essere soggetti a variazioni nei giorni festivi.</span>
          </p>
        </div>

        {/* Mobile: 2 colonne compatte — Desktop/Tablet: identico a prima */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          {HOURS.map((h) => (
            <div
              key={h.day}
              className="rounded-xl md:rounded-2xl border border-neutral-200 bg-white p-2 md:p-4 shadow-sm"
            >
              {/* Mobile: giorno a sx, orario a dx su una riga — da md in su torna a colonna */}
              <div className="flex items-center justify-between gap-2 md:block">
                <div className="text-sm md:text-base font-medium">{h.day}</div>
                <div className="text-xs md:text-sm text-neutral-600 md:mt-1 whitespace-nowrap">
                  {h.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lavori – GRIGLIA 4x, card uguali più compatte */}
      <section id="lavori" className="bg-white/70 border-y border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-2xl md:text-3xl font-semibold">I nostri lavori</h2>
            <a href="https://www.instagram.com/feelhair_?igsh=OG91eDhicnRlYzBi" className="text-sm underline underline-offset-4 hover:opacity-70">Apri Instagram</a>
          </div>

          <div
            ref={trackRef}
            className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {/* nasconde la scrollbar su iOS/Android */}
            <style jsx>{`
              div::-webkit-scrollbar { display: none; }
            `}</style>

            {WORKS.map((src, i) => (
              <div
                key={i}
                className="work-card snap-start min-w-[48%] sm:min-w-[32%] lg:min-w-[24%]"
                aria-label={`Lavoro ${i + 1}`}
              >
                <div className="rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-sm">
                  <img src={src} alt={`Lavoro ${i + 1}`} className="w-full aspect-[2/3] object-cover" loading="lazy" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

            {/* Chi sono / In salone */}
      <section id="chi-sono" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-sm">
            <img
              src="/lavoro.jpg"     
              alt="Al lavoro in salone"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Chi sono</h2>
            <p className="mt-3 text-neutral-700">
              Credo fortemente nella personalizzazione di ogni servizio. Un taglio sartoriale che valorizzi i lineamenti del tuo viso. Un colore autentico che tenga conto non solo di esaltare la bellezza individuale, la forma del viso e la stagione cromatica di appartenenza,ma anche i desideri della cliente. La consulenza è senza dubbio il cuore di ogni servizio attraverso la quale non si tratta solo di ascoltare per rispondere ma di ascoltare per comprendere.
            </p>
            <div className="mt-5 flex gap-3">
              <a href="#servizi" className="rounded-xl px-4 py-2 bg-neutral-900 text-white text-sm hover:bg-neutral-800">
                Scopri i servizi
              </a>
              <a href="#lavori" className="rounded-xl px-4 py-2 border border-neutral-300 text-sm hover:bg-neutral-100">
                Guarda i lavori
              </a>
            </div>
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
            <p className="mt-2 text-neutral-600">Workshop su trattamenti per il benessere della cute e dei capelli.</p>
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
                I prezzi possono variare in base alla lunghezza e alle esigenze del capello. 
                Per creare una personalizzazione accurata del servizio è necessario una consulenza che può avvenire gratuitamente in salone, via whatsapp o DM su instagram.
              </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREVENTIVO_MSG)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block rounded-xl px-4 py-2 bg-neutral-900 text-white text-sm hover:bg-neutral-800"
                >
                Richiedi consulenza
                </a>
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
        <p className="mt-6 text-sm text-neutral-500">Integrazione dinamica con Google Reviews pronta: basta aggiungere l&aposID luogo.</p>
      </section>

      {/* Contatti */}
      <section id="contatti" className="bg-white/70 border-t border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Contatti & dove siamo</h2>
            <div className="mt-4 space-y-2 text-neutral-700">
              <div><strong>Telefono:</strong> <a href="tel:+393347712249" className="underline underline-offset-4">+39 3347712249</a></div>
              <div><strong>WhatsApp:</strong> <a href="https://wa.me/393347712249" className="underline underline-offset-4">Scrivici</a></div>
              <div><strong>Indirizzo:</strong> Via Loghetto, Cortenuova (BG)</div>
              <div className="text-sm text-neutral-500">Orari soggetti a variazioni festive.</div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-sm">
            <iframe
              title="Mappa"
              className="w-full h-72"
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2794.543683234045!2d9.7898102!3d45.5393875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478141b5f43b0397%3A0x36e923a7c90847cc!2sFeel%20Hair%20Studio!5e0!3m2!1sit!2sit!4v1761485822671!5m2!1sit!2sit"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} Feel Hair</div>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/feelhair_?igsh=OG91eDhicnRlYzBi" className="hover:opacity-70">Instagram</a>
            <a href="#" className="hover:opacity-70">Google</a>
            <a href="#" className="hover:opacity-70">Privacy</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
