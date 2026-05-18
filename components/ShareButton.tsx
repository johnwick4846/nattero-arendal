"use client";

export default function ShareButton() {
  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: "Nattero Arendal", url: "https://natteroarendal.no" });
    } else {
      navigator.clipboard.writeText("https://natteroarendal.no");
      alert("Lenke kopiert!");
    }
  }

  return (
    <button
      onClick={handleShare}
      className="group border border-gray-200 rounded-xl p-6 hover:border-gray-400 transition text-left w-full"
    >
      <p className="font-semibold mb-1 group-hover:text-gray-700">📲 Del med en venn</p>
      <p className="text-sm text-gray-500">Spre ordet om Nattero Arendal.</p>
    </button>
  );
}
