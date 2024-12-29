'use client';

import { Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SignOutButton from "@/components/auth/signout-button";

export default function NavBar() {
  const router = useRouter();

  return (
    <div className="fixed top-0 right-0 p-4 flex items-center gap-4">
      <button
        onClick={() => router.push('/settings')}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Settings"
      >
        <Settings className="h-6 w-6 text-gray-600" />
      </button>
      <SignOutButton />
    </div>
  );
}
