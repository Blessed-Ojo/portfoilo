"use client";
import Link from "next/link";
import { ArrowLeft, Terminal, Code } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-green-500/5 dark:to-blue-500/5" />
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 dark:bg-green-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      
      <div className="text-center max-w-2xl mx-auto px-6 relative z-10">
        {/* Error Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 dark:from-red-400/20 dark:to-orange-400/20 rounded-full blur-2xl animate-pulse" />
          <div className="relative bg-white dark:bg-slate-800 rounded-full p-6 w-24 h-24 mx-auto border border-gray-200 dark:border-slate-700 shadow-2xl">
            <Terminal className="w-12 h-12 text-red-500 dark:text-red-400 mx-auto" />
          </div>
        </div>

        {/* Error Code */}
        <div className="mb-6">
          <h1 className="text-8xl font-black bg-gradient-to-r from-red-600 via-orange-500 to-red-600 dark:from-red-400 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent mb-2 tracking-tighter">
            404
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm font-mono text-gray-600 dark:text-slate-400">
            <Code className="w-4 h-4" />
            <span>ERROR_PAGE_NOT_FOUND</span>
          </div>
        </div>

        {/* Ninja Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-slate-100">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
              Code Ninja
            </span>{" "}
            says: You&apos;re not supposed to be here!
          </h2>
          <p className="text-lg text-gray-700 dark:text-slate-300 mb-4 leading-relaxed">
            The page you&apos;re looking for has vanished into the digital shadows. 
            Even the best ninjas sometimes take a wrong turn.
          </p>
          {/* TODO: Check your URL or return to base camp */}
          <p className="text-sm text-gray-600 dark:text-slate-400 font-mono">
            Check your URL or return to base camp
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <Link
            href="/"
            className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-green-500 dark:to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 dark:from-green-600 dark:to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <ArrowLeft className="mr-3 h-5 w-5 relative z-10 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="relative z-10">Back to Home</span>
          </Link>
        </div>

        {/* Code Snippet */}
        <div className="mt-12 max-w-md mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-500 dark:text-slate-400 ml-2 font-mono">ninja.js</span>
            </div>
            <pre className="text-sm font-mono text-gray-800 dark:text-slate-200">
              <code>{`if (page.exists()) {
  render(page);
} else {
  throw new Error('404');
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}