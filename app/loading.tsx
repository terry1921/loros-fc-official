export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4" role="status" aria-live="polite">
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-700" aria-hidden="true" />
        <p className="font-bold text-emerald-950">Cargando contenido de Loros FC...</p>
      </div>
    </div>
  );
}
