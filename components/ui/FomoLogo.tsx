// FOMO logo with per-letter colors matching the brand logo:
// F=pink, O=orange, M=teal, O=purple
export function FomoLogo({ className = "text-2xl" }: { className?: string }) {
  return (
    <span className={`font-serif font-bold tracking-tight ${className}`}>
      <span className="text-pink-500">F</span>
      <span className="text-orange-400">O</span>
      <span className="text-teal-400">M</span>
      <span className="text-purple-500">O</span>
    </span>
  );
}
