import { useState } from 'react';

export const FALLBACK_IMAGE = '/products/fallback.svg';

export default function ProductImage({ src, alt, className = '', ...rest }) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      src={failed ? FALLBACK_IMAGE : src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
