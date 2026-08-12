'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  console.error(error);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4" role="alert">
      <div className="max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="mb-2 text-sm font-black uppercase tracking-widest text-yellow-600">Algo salió mal</p>
        <h1 className="text-3xl font-black text-emerald-950">No pudimos cargar esta página</h1>
        <p className="mt-4 text-gray-600">
          Intenta nuevamente en unos segundos. Si el problema continúa, escríbenos a lorosfcqro@gmail.com.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-lg bg-emerald-800 px-5 py-3 font-bold text-white transition-colors hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
