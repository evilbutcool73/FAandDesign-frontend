<template>
    <div >
      <Header/>
      <!-- <HeroSection /> -->
      <AboutSection />
      <TeamSection />
      <PourVous/>
      <InspirationsSection />
      <RealisationsSection />
      <Renovation/>
      <FormulesSection />
      <FormSection/>
      <FAQ/>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import Header from '@/components/Header.vue';
  import HeroSection from '@/components/HeroSection.vue';
  import AboutSection from '@/components/AboutSection.vue';
  import TeamSection from '@/components/TeamSection.vue';
  import InspirationsSection from '@/components/InspirationsSection.vue';
  import RealisationsSection from '@/components/RealisationsSection.vue';
  import FormulesSection from '@/components/FormulesSection.vue';
  import FormSection from '@/components/FormSection.vue';
  import Footer from '@/components/Footer.vue';
  import { createClient } from '@sanity/client'
  import Renovation from '~/components/Renovation.vue';
  import FAQ from '~/components/FAQ.vue';
import { useRuntimeConfig, provide } from '#imports';

import { useHead } from 'nuxt/app';

useHead({
  title: 'FAandDesign - Accueil',
  meta: [
    { name: 'description', content: "Bienvenue chez FA&Design, création d'instant sur mesure, alliant design et fonctionnalité."},
    { name: 'og:title', content: 'FA&Design - Accueil' },
    { name: 'og:description', content: 'Explorez nos réalisations et inspirations, découvrez nos formules et contactez-nous pour votre projet.' },
    { name: 'og:image', content: '/images/social-preview.jpg' },
    { name: 'og:url', content: "https://www.preciliabourgeois.com/"},
    { name: 'twitter:card', content: '' },
    { name: 'twitter:title', content: 'FA&Design - Accueil' },
    { name: 'twitter:description', content: 'Découvrez FA&Design, vos inspirations et réalisations design sur mesure.' },
    { name: 'twitter:image', content: '/images/social-preview.jpg' }
  ],
  link: [
    { rel: 'canonical', href: "https://www.preciliabourgeois.com/" },
  ]
});

const config = useRuntimeConfig().public.sanity

const client = createClient({
  projectId: config.projectId,
  dataset: config.dataset,
  apiVersion: config.apiVersion,
  useCdn: true
})

// Fournir le client aux composants enfants
provide('sanityClient', client)
  </script>
  
  <style>
  @import 'tailwindcss/base';
  @import 'tailwindcss/components';
  @import 'tailwindcss/utilities';
  
  @font-face {
    font-family: Caveat;
    font-style: normal;
    font-weight: 200 700;
    font-display: swap;
    src: url("../assets/font/Caveat/Caveat-VariableFont_wght.ttf") format("woff2");
  }
  
  body {
    background-color: black;
    color: white;
    font-family: 'Roboto', sans-serif;
  }
  html {
  scroll-behavior: smooth;
}
  </style>
  