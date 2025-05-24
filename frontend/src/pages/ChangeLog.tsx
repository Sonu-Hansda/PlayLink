export default function Changelog() {
  return (
    <div className="min-h-screen font-mono bg-gray-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">📦 Changelog</h1>
        <p className="text-gray-400 mb-12 text-center max-w-2xl mx-auto">
          Here's what I've built so far.
        </p>

        {/* Version 1.0 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">v1.0 – Initial Release</h2>
          <ul className="space-y-3 text-gray-300 ml-5 list-disc">
            <li>File upload with drag & drop support</li>
            <li>Audio/video type selection</li>
            <li>Upload validation: up to 5 audio files or 1 video file (max 800MB)</li>
            <li>Responsive design for mobile & desktop</li>
          </ul>
        </section>

        {/* What's Next */}
        <section className="mt-16 p-6 bg-gray-800 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">What's Coming Next?</h2>
          <ul className="space-y-3 text-gray-300 ml-5 list-disc">
            <li>UI Improvements</li>
            <li>Expiring links (temporary sharing)</li>
            <li>Shuffle & repeat functionality</li>
            <li>Mobile optimizations (better touch controls)</li>
          </ul>
        </section>
      </div>
    </div>
  );
}