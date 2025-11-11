<template>
  <Header/>
  <section class="py-16 px-5 text-white bg-black min-h-screen">
    <div class="py-16 px-5 container mx-auto max-w-4xl">
      <h1 class="text-4xl font-bold text-gold mb-6">Terms of Service</h1>
      <p class="mb-4">Last updated: March 2025</p>
      
      <h2 class="text-2xl font-semibold text-gold mt-6">1. Acceptance of Terms</h2>
      <p class="mb-4">By using our website, you agree to these terms.</p>
      
      <h2 class="text-2xl font-semibold text-gold mt-6">2. Use of Services</h2>
      <p class="mb-4">You agree to use our website only for lawful purposes.</p>
      
      <h2 class="text-2xl font-semibold text-gold mt-6">3. Intellectual Property</h2>
      <p class="mb-4">All content on this site is owned by us and cannot be reproduced without permission.</p>
      
      <h2 class="text-2xl font-semibold text-gold mt-6">4. Limitation of Liability</h2>
      <p class="mb-4">We are not responsible for any damages resulting from your use of the website.</p>
      
      <h2 class="text-2xl font-semibold text-gold mt-6">5. Changes to Terms</h2>
      <p class="mb-4">We may update these terms at any time. Please check back regularly.</p>
      
      <h2 class="text-2xl font-semibold text-gold mt-6">6. Contact</h2>
      <p class="mb-4">For any questions, contact us at <a href="mailto:bourgeois.precilia.34@gmail.com" class="underline text-gold">bourgeois.precilia.34@gmail.com</a>.</p>
    </div>
  </section>
  <Footer />
</template>

<script setup>
import { useHead } from '#app'
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
useHead({
  title: 'Terms of Service | FA&Design',
  meta: [
    { name: 'description', content: 'Read the terms of service for FA&Design, including our policies on use of services, intellectual property, and liability.' },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:title', content: 'Terms of Service | FA&Design' },
    { property: 'og:description', content: 'Read the terms of service for FA&Design, including our policies on use of services, intellectual property, and liability.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: "https://www.preciliabourgeois.com/" },
    { property: 'og:image', content: '/path-to-your-image.jpg' }, // Optionnel : image pour l'OG
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Terms of Service | FA&Design' },
    { name: 'twitter:description', content: 'Read the terms of service for FA&Design, including our policies on use of services, intellectual property, and liability.' },
    { name: 'twitter:image', content: '/path-to-your-image.jpg' } // Optionnel : image pour Twitter
  ]
})
</script>
