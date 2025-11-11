<template>
  <Header/>
  <section class="py-16 px-5 text-white bg-black min-h-screen">
    <div class="py-16 px-5 container mx-auto max-w-4xl">
      <h1 class="text-4xl font-bold text-gold mb-6">Privacy Policy</h1>
      <p class="mb-4">Last updated: March 2025</p>
      <p class="mb-4">
        This Privacy Policy describes how we handle your information when you use our website.
      </p>
      <h2 class="text-2xl font-semibold text-gold mt-6">1. Information We Collect</h2>
      <p class="mb-4">We do not collect personal data unless you choose to contact us through the contact form.</p>
      <h2 class="text-2xl font-semibold text-gold mt-6">2. How We Use Your Information</h2>
      <p class="mb-4">Your email is only used to respond to your inquiries. We do not store or share your data.</p>
      <h2 class="text-2xl font-semibold text-gold mt-6">3. Cookies</h2>
      <p class="mb-4">We may use cookies for site functionality, but we do not track personal data.</p>
      <h2 class="text-2xl font-semibold text-gold mt-6">4. Contact</h2>
      <p class="mb-4">For any questions, please contact us at <a href="mailto:bourgeois.precilia.34@gmail.com" class="underline text-gold">bourgeois.precilia.34@gmail.com</a>.</p>
    </div>
  </section>
  <Footer />
</template>

<script setup>
import { useHead } from '#app'
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
useHead({
  title: 'Privacy Policy | FA&Design',
  meta: [
    { name: 'description', content: 'Read the privacy policy for FA&Design, detailing how we handle your information, cookies, and data protection.' },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: 'Privacy Policy | FA&Design' },
    { property: 'og:description', content: 'Read the privacy policy for FA&Design, detailing how we handle your information, cookies, and data protection.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content:"https://www.preciliabourgeois.com/" },
    { property: 'og:image', content: '/path-to-your-image.jpg' }, // Optionnel : image pour l'OG
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Privacy Policy | FA&Design' },
    { name: 'twitter:description', content: 'Read the privacy policy for FA&Design, detailing how we handle your information, cookies, and data protection.' },
    { name: 'twitter:image', content: '/path-to-your-image.jpg' } // Optionnel : image pour Twitter
  ]
})
</script>
