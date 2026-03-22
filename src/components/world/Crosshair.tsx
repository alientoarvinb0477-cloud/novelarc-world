export default function Crosshair() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      {/* Outer Ring */}
      <div className="w-6 h-6 border border-white/20 rounded-full flex items-center justify-center">
        {/* Center Dot */}
        <div className="w-1 h-1 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
      </div>
    </div>
  );
}
