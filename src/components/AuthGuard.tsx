"use client";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const PUBLIC_PATHS = ['/', '/login', '/signup', '/about', '/contact'];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('civicmind_current_user');
      const isPublicPath = PUBLIC_PATHS.includes(pathname);

      if (!user && !isPublicPath) {
        setAuthorized(false);
        router.push('/login');
      } else {
        setAuthorized(true);
      }

      // Redirect logged in users away from login/signup to dashboard
      if (user && (pathname === '/login' || pathname === '/signup')) {
        router.push('/dashboard');
      }
    };

    checkAuth();

    // Listen for storage changes (e.g., logout in another tab)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [pathname, router]);

  // Show loading state while checking authorization for protected routes
  if (!authorized && !PUBLIC_PATHS.includes(pathname)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-blue-500 font-medium animate-pulse">Authenticating...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
