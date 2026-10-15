import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

function cls(variant: Variant, size: Size, onDark?: boolean, extra?: string) {
  return ['btn', `btn-${variant}`, `btn-${size}`, onDark && variant === 'ghost' && 'on-dark', extra].filter(Boolean).join(' ');
}

type Common = { variant?: Variant; size?: Size; onDark?: boolean; className?: string; children: ReactNode };

export function Button({ variant = 'primary', size = 'md', onDark, className, children, type = 'button', ...rest }: Common & ComponentProps<'button'>) {
  return <button type={type} className={cls(variant, size, onDark, className)} {...rest}>{children}</button>;
}

export function ButtonLink({ variant = 'primary', size = 'md', onDark, className, children, href, external, ...rest }: Common & { href: string; external?: boolean } & Omit<ComponentProps<'a'>, 'href'>) {
  const c = cls(variant, size, onDark, className);
  if (external) return <a href={href} className={c} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>;
  return <Link href={href} className={c} {...rest}>{children}</Link>;
}

export function Eyebrow({ text, dark }: { text: string; dark?: boolean }) {
  return <div className={`eyebrow${dark ? ' on-dark' : ''}`}>{text}</div>;
}
