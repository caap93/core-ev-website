import type { Metadata } from 'next';
import { Eyebrow } from '@/components/Button';
import { Icon, type IconName } from '@/components/Icon';
import { CONTACT } from '@/lib/content';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = { title: 'Contact' };

const ITEMS: { icon: IconName; label: string; value: string; href?: string }[] = [
  { icon: 'mail', label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: 'phone', label: 'Phone', value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, '')}` },
  { icon: 'mapPin', label: 'Location', value: CONTACT.location, href: 'https://www.google.com/maps/search/?api=1&query=Corneel+Heymanslaan+10+9000+Gent' },
  { icon: 'clock', label: 'Hours', value: CONTACT.hours },
];

export default function ContactPage() {
  return (
    <section className="tile s-light">
      <div className="container split-contact" style={{ maxWidth: 1100, alignItems: 'start' }}>
        <div>
          <Eyebrow text="Contact" />
          <h1 className="display" style={{ fontSize: 'clamp(36px, 4.5vw, 44px)', lineHeight: 1.07, margin: '0 0 24px' }}>Let&apos;s discuss your research.</h1>
          <p className="body" style={{ marginBottom: 44 }}>
            Whether submitting a sample for analysis, requesting a method consultation, or exploring training options — we&apos;re here to help.
          </p>
          {ITEMS.map((item) => (
            <div key={item.label} className="contact-item">
              <div className="icon-circle"><Icon name={item.icon} size={16} color="var(--blue)" /></div>
              <div>
                <div className="contact-label">{item.label}</div>
                <div className="contact-value">
                  {item.href
                    ? <a href={item.href} {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{item.value}</a>
                    : item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
