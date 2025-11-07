"use client";

import { useMemo, useRef, useState } from 'react';
import ModelViewer, { type ModelSource } from '../components/ModelViewer';

const SAMPLES: Array<{ key: string; name: string; glbUrl: string; usdzUrl: string; poster?: string; }> = [
  {
    key: 'astronaut',
    name: 'Astronaut',
    glbUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    usdzUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz',
    poster: 'https://modelviewer.dev/shared-assets/models/posters/Astronaut.webp',
  },
  {
    key: 'robot',
    name: 'Robot Expressive',
    glbUrl: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
    usdzUrl: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.usdz',
    poster: 'https://modelviewer.dev/shared-assets/models/posters/RobotExpressive.webp',
  },
];

export default function Page() {
  const [glbUrl, setGlbUrl] = useState<string>(SAMPLES[0].glbUrl);
  const [usdzUrl, setUsdzUrl] = useState<string>(SAMPLES[0].usdzUrl);
  const [posterUrl, setPosterUrl] = useState<string | undefined>(SAMPLES[0].poster);
  const [title, setTitle] = useState<string>(SAMPLES[0].name);

  const glbInputRef = useRef<HTMLInputElement>(null);
  const usdzInputRef = useRef<HTMLInputElement>(null);

  const source: ModelSource = useMemo(() => ({ glbUrl, usdzUrl, posterUrl, title }), [glbUrl, usdzUrl, posterUrl, title]);

  const onPickSample = (key: string) => {
    const s = SAMPLES.find(x => x.key === key) ?? SAMPLES[0];
    setGlbUrl(s.glbUrl);
    setUsdzUrl(s.usdzUrl);
    setPosterUrl(s.poster);
    setTitle(s.name);
  };

  const onPickGlb = (file?: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setGlbUrl(url);
    setTitle(file.name);
    setPosterUrl(undefined);
  };

  const onPickUsdz = (file?: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUsdzUrl(url);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>AR Viewer</h1>
        <span className="badge">GLB + USDZ</span>
      </div>

      <div className="card">
        <ModelViewer source={source} />

        <div className="controls">
          <div>
            <div className="label">Sample models</div>
            <select defaultValue={SAMPLES[0].key} onChange={(e) => onPickSample(e.target.value)}>
              {SAMPLES.map(s => (
                <option value={s.key} key={s.key}>{s.name}</option>
              ))}
            </select>
            <div className="helper">Preloaded examples hosted by modelviewer.dev</div>
          </div>

          <div>
            <div className="label">GLB URL</div>
            <input className="input" value={glbUrl} onChange={(e) => setGlbUrl(e.target.value)} placeholder="https://.../model.glb" />
            <div className="helper">For in-page 3D and AR on Android/Desktop</div>
          </div>

          <div>
            <div className="label">USDZ URL (iOS Quick Look)</div>
            <input className="input" value={usdzUrl} onChange={(e) => setUsdzUrl(e.target.value)} placeholder="https://.../model.usdz" />
            <div className="helper">Used for AR on iOS (Quick Look)</div>
          </div>

          <div>
            <div className="label">Upload GLB</div>
            <input ref={glbInputRef} type="file" accept=".glb,model/gltf-binary,model/gltf+json" onChange={(e) => onPickGlb(e.target.files?.[0] || undefined)} />
            <div className="helper">Creates a temporary local preview URL</div>
          </div>

          <div>
            <div className="label">Upload USDZ</div>
            <input ref={usdzInputRef} type="file" accept=".usdz,model/vnd.usdz+zip" onChange={(e) => onPickUsdz(e.target.files?.[0] || undefined)} />
            <div className="helper">For iOS AR; local blob URLs may not work in Quick Look</div>
          </div>
        </div>

        <div className="footer">
          Tip: On iOS, tap ?View in AR? to open Quick Look. On Android, use Scene Viewer/WebXR.
        </div>
      </div>
    </div>
  );
}
