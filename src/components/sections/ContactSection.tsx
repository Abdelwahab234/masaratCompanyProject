'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { TranslationData } from '@/data';
import styles from './ContactSection.module.css';

interface Props {
  t: TranslationData;
}

export default function ContactSection({ t }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    details: ''
  });
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'email' | ''>('');
  const [methodError, setMethodError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactMethod) {
      setMethodError(true);
      return;
    }
    
    setMethodError(false);

    if (contactMethod === 'whatsapp') {
      const message = `*${t.formTitle}*\n\n*${t.fields[0]}:* ${formData.name}\n*${t.fields[2]}:* ${formData.service || '-'}\n*${t.fields[3]}:*\n${formData.details}`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/966559119974?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
    } else {
      const subject = encodeURIComponent(t.formTitle);
      const body = encodeURIComponent(`${t.fields[0]}: ${formData.name}\n${t.fields[2]}: ${formData.service || '-'}\n${t.fields[3]}:\n${formData.details}`);
      window.location.href = `mailto:info@ms-ksa.com?subject=${subject}&body=${body}`;
    }
  };
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.info} data-aos="fade-right">
          <p className={styles.kicker}>{t.contactKicker}</p>
          <h2 className={styles.title}>{t.contactTitle}</h2>
          <p className={styles.text}>{t.contactText}</p>

          <div className={styles.contacts}>
            <a href="https://wa.me/966559119974" target="_blank" rel="noopener noreferrer" className={styles.contactItem} dir="ltr">
              <Phone className={styles.contactIcon} size={20} />
              +966 55 911 9974
            </a>
         
            <a href="mailto:info@ms-ksa.com" className={styles.contactItem} dir="ltr">
              <Mail className={styles.contactIcon} size={20} />
              info@ms-ksa.com
            </a>
            <div className={styles.contactItem}>
              <MapPin className={styles.contactIcon} size={20} />
              {t.address}
            </div>
          </div>
        </div>

        <div className={styles.formBox} data-aos="fade-left" data-aos-delay="200">
          <h3 className={styles.formTitle}>{t.formTitle}</h3>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              className={styles.input}
              placeholder={t.fields[0]}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity((t.dir as string) === 'ltr' ? 'Please fill out this field.' : 'يرجى تعبئة هذا الحقل.')}
              onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
            />
            <select 
              className={styles.input}
              value={formData.service}
              onChange={(e) => setFormData({...formData, service: e.target.value})}
              required
              onInvalid={(e) => (e.target as HTMLSelectElement).setCustomValidity((t.dir as string) === 'ltr' ? 'Please select a service.' : 'يرجى اختيار خدمة.')}
              onInput={(e) => (e.target as HTMLSelectElement).setCustomValidity('')}
            >
              <option value="">{t.fields[2]}</option>
              {t.formOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <textarea
              rows={5}
              className={styles.textarea}
              placeholder={t.fields[3]}
              value={formData.details}
              onChange={(e) => setFormData({...formData, details: e.target.value})}
              required
              onInvalid={(e) => (e.target as HTMLTextAreaElement).setCustomValidity((t.dir as string) === 'ltr' ? 'Please fill out this field.' : 'يرجى تعبئة هذا الحقل.')}
              onInput={(e) => (e.target as HTMLTextAreaElement).setCustomValidity('')}
            />
            
            <div className={styles.methodLabelContainer}>
              <p className={styles.methodLabel}>
                {(t.dir as string) === 'ltr' ? 'Choose Contact Method:' : 'اختر طريقة التواصل:'}
              </p>
              {methodError && (
                <span className={styles.errorText}>
                  {(t.dir as string) === 'ltr' ? '* Please select a method' : '* يرجى اختيار طريقة'}
                </span>
              )}
            </div>
            <div className={styles.methodSelector}>
              <button 
                type="button" 
                className={`${styles.methodBtn} ${contactMethod === 'whatsapp' ? styles.methodBtnActive : ''}`}
                onClick={() => { setContactMethod('whatsapp'); setMethodError(false); }}
              >
                <span className={styles.methodEmoji}>💬</span>
                <span>{(t.dir as string) === 'ltr' ? 'WhatsApp' : 'واتساب'}</span>
              </button>
              <button 
                type="button" 
                className={`${styles.methodBtn} ${contactMethod === 'email' ? styles.methodBtnActive : ''}`}
                onClick={() => { setContactMethod('email'); setMethodError(false); }}
              >
                <span className={styles.methodEmoji}>✉️</span>
                <span>{(t.dir as string) === 'ltr' ? 'Email' : 'إيميل'}</span>
              </button>
            </div>

            <button type="submit" className={styles.submitBtn}>
              {t.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
