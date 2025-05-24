export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Disclaimer</h1>

        <p className="mb-6 text-gray-300">
          PlayLink is a real-time file-sharing platform that allows users to temporarily stream audio and video files directly from their devices. No files are stored on our servers.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Content Responsibility</h2>
          <p className="mb-4 text-gray-300">
            All content streamed through PlayLink:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-300">
            <li>Is uploaded and hosted by the user locally.</li>
            <li>Is available only during the active session.</li>
            <li>Is removed permanently once the session ends (no backups or archives).</li>
            <li>Must be shared with the user’s consent and legal rights to distribute.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Legal Compliance</h2>
          <p className="mb-4 text-gray-300">
            PlayLink complies with the Information Technology Act, 2000 (India), as an intermediary platform. We do not host, store, or moderate any content.
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-300">
            <li>We act as a neutral medium — all content is user-generated and user-hosted.</li>
            <li>You must ensure the content you share does not infringe any laws or rights of others.</li>
            <li>If illegal or unauthorized content is reported, we will remove access immediately.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">No Liability</h2>
          <p className="mb-4 text-gray-300">
            Since files are hosted locally and deleted after use, we assume no responsibility for:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-300">
            <li>The content being shared (audio/video).</li>
            <li>Any misuse or redistribution by third parties.</li>
            <li>Data loss or issues arising from browser limitations.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">ℹ️ Contact Us</h2>
          <p className="text-gray-300 mb-2">
            For legal notices, abuse reports, or takedown requests, please contact us at:
          </p>
          <p className="text-orange-400 underline mt-2">
            <a href="mailto:legal@playlink.in">sonu-hansda@morningdesk.in</a>
          </p>
        </section>
      </div>
    </div>
  );
}