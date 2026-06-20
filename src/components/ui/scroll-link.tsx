'use client';

import React from 'react';

interface ScrollLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function ScrollLink({ href, children, className }: ScrollLinkProps) {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // Only target internal hash links
    if (href.startsWith('#')) {
      e.preventDefault();
      
      const targetId = href.replace('#', '');
      const elem = document.getElementById(targetId);
      
      if (elem) {
        elem.scrollIntoView({
          behavior: 'smooth', // Smooth animation
          block: 'center',    // Centers the element vertically
        });
        
        // Optional: Update the URL hash without triggering a jump
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <a href={href} onClick={handleScroll} className={className}>
      {children}
    </a>
  );
}
