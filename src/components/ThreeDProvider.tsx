'use client';

import React, { useEffect } from 'react';

export default function ThreeDProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Scroll Progress Bar
    const progressBar = document.getElementById('scroll-progress');
    const handleScroll = () => {
      if (!progressBar) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 2. 3D Tilt and Specular Glare Physics
    const handleMouseMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('.tilt') as HTMLElement;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -9; // Max 9 deg
      const rotateY = ((x - centerX) / centerX) * 9;

      target.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      target.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
      target.style.setProperty('--my', `${(y / rect.height) * 100}%`);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('.tilt') as HTMLElement;
      if (!target) return;
      target.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseout', handleMouseLeave, { passive: true });

    // 3. Scroll-Triggered 3D Reveals
    const revealElements = document.querySelectorAll('.reveal3d');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Trigger number counter if present inside
            const counters = entry.target.querySelectorAll('[data-count]');
            counters.forEach((counter) => {
              const el = counter as HTMLElement;
              if (el.dataset.animated === 'true') return;
              el.dataset.animated = 'true';

              const target = parseFloat(el.getAttribute('data-count') || '0');
              const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
              const duration = 1600;
              const startTime = performance.now();

              const updateCount = (now: number) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out expo
                const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                const current = target * easeProgress;

                el.textContent = current.toFixed(decimals);

                if (progress < 1) {
                  requestAnimationFrame(updateCount);
                } else {
                  el.textContent = target.toFixed(decimals);
                }
              };

              requestAnimationFrame(updateCount);
            });
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseout', handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
}
