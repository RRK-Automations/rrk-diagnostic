'use client';

import { useState, useEffect } from 'react';
import { getDefaultSiteContent } from '@/config/defaultCmsContent';

let cachedContent: any = null;

export function useCmsContent() {
  const [content, setContent] = useState<any>(cachedContent || getDefaultSiteContent());
  const [loading, setLoading] = useState(!cachedContent);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const res = await fetch('/api/cms', { cache: 'no-store' });
        const json = await res.json();
        if (isMounted && json.success && json.content) {
          cachedContent = json.content;
          setContent(json.content);
        }
      } catch (err) {
        console.warn('[useCmsContent] Using static fallback config:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { content, loading };
}
