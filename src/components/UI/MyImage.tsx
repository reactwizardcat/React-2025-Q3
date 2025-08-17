import { useState } from 'react';
import { cn } from '../../utils/cn';

export default function MyImage({
  src,
  alt,
  className,
  imageClassName,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div
      className={cn(
        'mx-auto mt-2.5 h-96 max-w-2xs overflow-hidden bg-gray-300',
        { 'animate-pulse': !isLoaded },
        className
      )}
    >
      <img
        className={cn(
          'h-full w-full object-cover transition-all duration-500 hover:scale-105',
          isLoaded ? 'opacity-100' : 'opacity-0',
          imageClassName
        )}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
