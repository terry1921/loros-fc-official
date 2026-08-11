import React from 'react';

interface DataStateProps {
  loading: boolean;
  error?: string;
  empty: boolean;
  loadingLabel: string;
  emptyTitle: string;
  emptyMessage?: string;
  onRetry?: () => void;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
  children: React.ReactNode;
}

function Skeleton({count = 3}: {count?: number}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3" aria-hidden="true">
      {Array.from({length: count}, (_, index) => (
        <div key={index} className="animate-pulse overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="h-40 bg-emerald-100" />
          <div className="space-y-3 p-5">
            <div className="h-3 w-1/3 rounded bg-gray-200" />
            <div className="h-5 w-4/5 rounded bg-gray-200" />
            <div className="h-3 w-full rounded bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

export const DataState: React.FC<DataStateProps> = ({
  loading,
  error,
  empty,
  loadingLabel,
  emptyTitle,
  emptyMessage,
  onRetry,
  emptyActionLabel,
  onEmptyAction,
  children,
}) => {
  if (loading) {
    return (
      <div aria-busy="true">
        <Skeleton />
        <p className="mt-4 text-center text-sm text-gray-500" role="status">{loadingLabel}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 p-8 text-center" role="alert">
        <h3 className="text-lg font-bold text-red-900">No pudimos cargar la información</h3>
        <p className="mt-2 text-red-700">{error}</p>
        {onRetry && (
          <button type="button" onClick={onRetry} className="mt-5 rounded-lg bg-red-700 px-4 py-2 font-bold text-white hover:bg-red-800">
            Intentar de nuevo
          </button>
        )}
      </div>
    );
  }

  if (empty) {
    return (
      <div className="rounded-xl border border-emerald-100 bg-white p-8 text-center shadow-sm">
        <h3 className="text-lg font-bold text-emerald-900">{emptyTitle}</h3>
        {emptyMessage && <p className="mt-2 text-gray-600">{emptyMessage}</p>}
        {emptyActionLabel && onEmptyAction && (
          <button type="button" onClick={onEmptyAction} className="mt-5 rounded-lg bg-emerald-700 px-4 py-2 font-bold text-white hover:bg-emerald-800">
            {emptyActionLabel}
          </button>
        )}
      </div>
    );
  }

  return <>{children}</>;
};
