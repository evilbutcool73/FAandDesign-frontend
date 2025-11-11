<template>
  <Header/>
    <section class="py-16 px-5 bg-black text-white border-t-[3px] border-gold">
      <div class="md:px-5 mx-auto text-center">
        
        <div class="py-5 lg:py-10">
          <div class="width-full text-left">
            <a href="../../#realisations" class="text-gold"> < Retour</a>
          </div>
          
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gold">{{ realisation?.Nom }}</h2>
          <p class="mt-8 text-center text-gold">Avant / Après</p>
        </div>
  
        <!-- Affichage des images en Masonry comme dans Inspirations -->
        <div class="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 mt-8">
          <div 
            v-for="(image, index) in realisationImages" 
            :key="index" 
            class="break-inside-avoid overflow-hidden rounded-lg shadow-lg">
            <img :src="image" class="w-full h-auto object-cover rounded-lg">
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import { createClient } from '@sanity/client';
  import { useRuntimeConfig } from '#imports'
  import Header from '@/components/Header.vue';
  import { useHead } from 'nuxt/app';
  import Footer from '@/components/Footer.vue';
  
  const config = useRuntimeConfig().public.sanity;
  const client = createClient({
    projectId: config.projectId,
    dataset: config.dataset,
    apiVersion: config.apiVersion,
    useCdn: true
  });
  
  const route = useRoute();
  
  const realisation = ref(null);
  const realisationImages = ref([]);
  
  // Fonction pour récupérer les détails de la réalisation
  const fetchRealisationDetails = async (id) => {
    const query = `*[_type == "realisation" && _id == "${id}"][0]{
      _id,
      Nom,
      ListImages[] {
        asset->{
          url
        }
      }
    }`;
  
    try {
      const data = await client.fetch(query);
      if (data) {
        realisation.value = data;
        realisationImages.value = data.ListImages.map(img => img.asset.url);
        // Mettre à jour les métadonnées pour le SEO
        useHead({
          title: `Réalisation - ${realisation.value.Nom}`,
          meta: [
            { name: 'description', content: `Découvrez la réalisation de ${realisation.value.Nom}.` },
            { property: 'og:title', content: `Réalisation - ${realisation.value.Nom}` },
            { property: 'og:description', content: `Découvrez la réalisation de ${realisation.value.Nom}.` },
            { property: 'og:image', content: realisationImages.value[0] || '/default-image.jpg' },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: "https://www.preciliabourgeois.com/"},
          ]
        });
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données de la réalisation :", error);
    }
  };
  
  onMounted(() => {
    const id = route.params.id;
    fetchRealisationDetails(id);
  });
  </script>
  