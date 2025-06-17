'use client'
import { Locale } from '@/i18n/locales'
import Script from 'next/script'

interface RecaptchaScriptProps {
  lang: Locale
}

export default function RecaptchaScript({ lang }: RecaptchaScriptProps) {
  return (
    <Script
      src={`https://www.google.com/recaptcha/api.js?hl=${lang}`}
      strategy="beforeInteractive"
    />
  )
}
