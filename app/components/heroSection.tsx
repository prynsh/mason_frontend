'use client'
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
    const router = useRouter();
  return (
    <section className="pt-5 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Transform Your Notes with
          <span className="text-purple-600"> AI-Powered </span>
          Summaries
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Write naturally. Let AI organize your thoughts. Get clear, concise summaries of your notes instantly.
        </p>
        <button
          onClick={() => router.push("/signup")}
          className="inline-flex items-center px-6 py-3 text-lg font-medium rounded-lg shadow-lg text-white bg-purple-600 hover:bg-purple-700"
        >
          Create an Account
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
