import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Bloggr',
  description: 'Read the privacy policy for the Bloggr platform.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="flex-grow container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-slate-800 rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Privacy Policy
        </h1>
        <div className="prose prose-invert max-w-none text-slate-300">
          <p>
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use Bloggr.
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account, create posts, or otherwise communicate with us. This may include your email address, username, and any content you post.
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">How We Use Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services, including to authenticate users, process transactions, and personalize content.
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Information Sharing</h2>
          <p>
              We do not share your personal information with third parties except as necessary to provide our services or as required by law.
          </p>
        </div>
      </div>
    </main>
  );
} 