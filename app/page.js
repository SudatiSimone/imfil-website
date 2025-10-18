export default function Home() {
  return (
    <main className="min-h-screen grid place-items-center bg-gray-50">
      <div className="p-8 rounded-2xl bg-white shadow text-center">
        <h1 className="text-3xl font-bold">Ciao Tailwind 👋</h1>
        <p className="mt-2 text-gray-600">
          Se vedi sfondo grigio + card con ombra, Tailwind funziona.
        </p>
        <div className="mx-auto mt-4 h-6 w-6 bg-blue-500 rounded" />
        <a
          href="#"
          className="inline-flex items-center justify-center mt-4 px-5 py-2.5 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition shadow-sm"
        >
          Bottone di prova
        </a>
      </div>
    </main>
  );
}
