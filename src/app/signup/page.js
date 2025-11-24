import SignupForm from '@/components/SignupForm';
import { ToastProvider } from '@/components/ui/ToastProvider';
import Image from 'next/image';

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Brand / marketing */}
        <section className="hidden md:flex flex-col items-start justify-center p-12">
          <h1 className="text-4xl font-extrabold mb-4">Create your account</h1>
          <p className="text-lg text-gray-600 mb-6">Join us to save your favorites, track orders, and checkout faster.</p>
          <div className="w-full max-w-lg rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
              alt="Join us"
              width={800}
              height={520}
              className="object-cover"
            />
          </div>
        </section>

        {/* Right: Signup form */}
        <section className="flex items-center justify-center p-8">
          <ToastProvider>
            <div className="w-full max-w-md">
              <SignupForm />
            </div>
          </ToastProvider>
        </section>
      </div>
    </main>
  );
}
