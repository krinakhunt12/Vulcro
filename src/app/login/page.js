export const metadata = {
  title: 'Login — VULCRO',
  description: 'Login or create an account for VULCRO — Surat’s traditional kurti atelier.',
};

import LoginForm from '@/components/LoginForm';
import { ToastProvider } from '@/components/ui/ToastProvider';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-screen py-12">
        {/* Left: Marketing / Heading */}
        <aside className="hidden md:flex flex-col items-start justify-center p-12">
          <h1 className="text-4xl font-extrabold mb-4">Welcome back</h1>
          <p className="text-lg text-gray-600 mb-6">Sign in to continue to VULCRO — Surat’s Finest Traditional Kurtis.</p>

          <div className="w-full max-w-lg rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/placeholders/kurti-800x1200.jpg"
              alt="Kurti photoshoot"
              width={800}
              height={520}
              className="object-cover w-full h-[520px] rounded-lg"
            />
          </div>
        </aside>

        {/* Right: Auth form */}
        <section className="flex items-center justify-center p-8">
          <ToastProvider>
            <div className="w-full max-w-md">
              <LoginForm />
            </div>
          </ToastProvider>
        </section>
      </div>
    </main>
  );
}
