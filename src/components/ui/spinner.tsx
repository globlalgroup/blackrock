export default function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-4">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-t-transparent border-blue-600"
        role="status"
        aria-label="Cargando"
      />
      <span className="text-sm text-gray-700 dark:text-gray-200">
        Cargando NFTs...
      </span>
    </div>
  );
}

