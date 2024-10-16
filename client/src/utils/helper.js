export function style(isActive) {
  return (
    (isActive ? "bg-primary text-white" : "bg-gray-200") +
    " flex items-center gap-1 py-2 px-6 rounded-full"
  );
}
