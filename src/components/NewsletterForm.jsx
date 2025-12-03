"use client";

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Placeholder: send to API or mailing service
    setStatus('Thanks — you are subscribed!');
    setEmail('');
    setTimeout(() => setStatus(''), 4000);
  };

  return (
    <form className="mt-3 sm:mt-0 flex gap-2" onSubmit={handleSubmit}>
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        placeholder="you@domain.com"
        className="border border-[--divider] px-4 py-2 rounded-md bg-transparent text-[--foreground]"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn btn-primary px-4 py-2 rounded-md" type="submit">Subscribe</button>

      {status && (
        <div className="ml-3 text-sm text-green-600">{status}</div>
      )}
    </form>
  );
}
