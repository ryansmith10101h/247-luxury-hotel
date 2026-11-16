'use client';

import { useState, FormEvent } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import { HOTEL_INFO } from '@/lib/data';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    service: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to send message. Please try again.');
      }

      setFormStatus('success');
      setFormData({ name: '', phone: '', email: '', subject: '', service: '', message: '' });
    } catch (err) {
      setFormStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: HOTEL_INFO.contact.phonePrimary,
      href: `tel:${HOTEL_INFO.contact.phonePrimaryRaw}`,
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: HOTEL_INFO.contact.phonePrimary,
      href: HOTEL_INFO.contact.whatsappUrl,
    },
    {
      icon: Mail,
      label: 'Email',
      value: HOTEL_INFO.contact.emailReservations,
      href: `mailto:${HOTEL_INFO.contact.emailReservations}`,
    },
    {
      icon: MapPin,
      label: 'Address',
      value: HOTEL_INFO.address.full,
      href: HOTEL_INFO.address.googleMapsUrl,
    },
    {
      icon: Clock,
      label: 'Hours',
      value: '24/7 — Always Open',
      href: undefined,
    },
  ];

  return (
    <PageLayout>
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out anytime — we're available 24/7."
        image="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1920&q=80"
      />

      <Section>
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <p className="text-gold-500 uppercase tracking-widest text-sm mb-3">Get In Touch</p>
              <h2 className="text-3xl font-bold text-white mb-4">Contact Information</h2>
              <p className="text-hotel-300 leading-relaxed">
                Have questions or need assistance? Our team is ready to help you around the clock.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <p className="text-hotel-400 text-sm mb-1">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-white font-medium hover:text-gold-500 transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white font-medium">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-hotel-800/50 rounded-2xl p-8 border border-hotel-700/50">
              <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>

              {formStatus === 'success' && (
                <div className="flex items-center gap-3 p-4 mb-6 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400">
                  <CheckCircle className="w-6 h-6 flex-shrink-0" />
                  <p>Your message has been sent successfully! We&apos;ll get back to you shortly.</p>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="flex items-center gap-3 p-4 mb-6 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
                  <AlertCircle className="w-6 h-6 flex-shrink-0" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-hotel-300 text-sm mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-3 bg-hotel-900/50 border border-hotel-700/50 rounded-lg text-white placeholder:text-hotel-500 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-hotel-300 text-sm mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Your phone number"
                      className="w-full px-4 py-3 bg-hotel-900/50 border border-hotel-700/50 rounded-lg text-white placeholder:text-hotel-500 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-hotel-300 text-sm mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-hotel-900/50 border border-hotel-700/50 rounded-lg text-white placeholder:text-hotel-500 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="subject" className="block text-hotel-300 text-sm mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Subject of your message"
                      className="w-full px-4 py-3 bg-hotel-900/50 border border-hotel-700/50 rounded-lg text-white placeholder:text-hotel-500 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-hotel-300 text-sm mb-2">
                      Service Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-hotel-900/50 border border-hotel-700/50 rounded-lg text-white focus:outline-none focus:border-gold-500 transition-colors appearance-none"
                    >
                      <option value="">Select a service</option>
                      <option value="hotel_room">Hotel Room Booking</option>
                      <option value="apartment">Apartment Booking</option>
                      <option value="restaurant">Restaurant Reservation</option>
                      <option value="spa">Spa Treatment</option>
                      <option value="event">Event/Conference</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-hotel-300 text-sm mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-3 bg-hotel-900/50 border border-hotel-700/50 rounded-lg text-white placeholder:text-hotel-500 focus:outline-none focus:border-gold-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full px-8 py-4 bg-gold-500 text-hotel-950 font-semibold rounded-lg hover:bg-gold-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {formStatus === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
