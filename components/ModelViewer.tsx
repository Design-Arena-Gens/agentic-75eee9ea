"use client";

import { useEffect, useMemo, useRef } from 'react';

export type ModelSource = {
  glbUrl?: string;
  usdzUrl?: string;
  posterUrl?: string;
  title?: string;
};

export default function ModelViewer({ source }: { source: ModelSource }) {
  const ref = useRef<any>(null);

  const { glbUrl, usdzUrl, posterUrl, title } = source;

  useEffect(() => {
    // Ensure the custom element is defined (when SSR hydrates)
    if (typeof window !== 'undefined' && !customElements.get('model-viewer')) {
      // The script tag in layout loads it; this is a fallback no-op
    }
  }, []);

  const arModes = useMemo(() => 'scene-viewer webxr quick-look', []);

  return (
    <div className="viewer">
      {/* @ts-ignore - custom element */}
      <model-viewer
        ref={ref}
        src={glbUrl}
        ios-src={usdzUrl}
        ar
        ar-modes={arModes}
        ar-scale="auto"
        camera-controls
        touch-action="pan-y"
        interaction-prompt="auto"
        autoplay
        exposure="1"
        environment-image="neutral"
        shadow-intensity="1"
        poster={posterUrl}
        style={{ width: '100%', height: '100%' }}
      >
        {/* @ts-ignore */}
        <div slot="poster" style={{ color: 'white', padding: 12 }}>{title || 'Loading model...'}</div>
        {/* @ts-ignore */}
        <button slot="ar-button" className="badge" style={{ position: 'absolute', left: 12, bottom: 12 }}>View in AR</button>
      </model-viewer>
    </div>
  );
}
