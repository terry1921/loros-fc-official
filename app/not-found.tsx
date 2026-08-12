import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] bg-gray-50 px-4 py-20">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-sm md:p-12">
        <p className="mb-2 text-sm font-black uppercase tracking-widest text-yellow-600">Error 404</p>
        <h1 className="text-4xl font-black text-emerald-950">Página no encontrada</h1>
        <p className="mt-4 text-gray-600">
          La ruta que buscas no existe o ya no está disponible. Puedes volver al inicio o revisar las últimas noticias del club.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-lg bg-emerald-800 px-5 py-3 font-bold text-white transition-colors hover:bg-emerald-900">
            Ir al inicio
          </Link>
          <Link href="/news" className="rounded-lg border border-emerald-200 px-5 py-3 font-bold text-emerald-800 transition-colors hover:bg-emerald-50">
            Ver noticias
          </Link>
          <Link href="/contact" className="rounded-lg border border-emerald-200 px-5 py-3 font-bold text-emerald-800 transition-colors hover:bg-emerald-50">
            Contacto
          </Link>
        </div>
      </div>
    </div>
  );
}
