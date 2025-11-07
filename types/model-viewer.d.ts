// Minimal JSX type for the <model-viewer> custom element
import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}
export {};
