"use client";

import { useEffect } from 'react';

export default function Body({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Remove problematic attributes added by browser extensions
    if (typeof document !== 'undefined') {
      document.body.removeAttribute('cz-shortcut-listen');
      document.body.removeAttribute('data-new-gr-c-s-check-loaded');
      document.body.removeAttribute('data-gr-ext-installed');
    }
  }, []);

  return <>{children}</>;
}
