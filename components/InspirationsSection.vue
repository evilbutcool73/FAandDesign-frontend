<template>
  <section id="inspirations" class="relative py-16 px-10 bg-black text-white border-t-[3px] border-gold overflow-hidden">
    <!-- Image en haut à droite, mais contenue dans la section -->
  <div class="rotate-[-30deg] origin-center absolute -top-20 -right-10 w-[200px] md:w-[400px] h-[125px] md:h-[250px] bg-cover bg-no-repeat " 
    style="background-image: url('/dorrure.png');"></div>

    <div class="md:px-5 mx-auto text-center">
      <div class="py-5 lg:py-10">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gold">Inspirations</h2>
        <p class="mt-8 text-gold">Notre histoire commence par une pensée</p>
      </div>
    </div>

    <!-- Masonry Layout avec Columns -->
    <div class="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 mt-8">
      <div 
        v-for="(image, index) in images" 
        :key="index" 
        class="break-inside-avoid overflow-hidden rounded-lg shadow-lg">
        <img :src="image.image" :alt="image.nom" class="w-full h-auto object-cover rounded-lg">
      </div>
    </div>
  </section>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { inject } from '#imports'
import { useHead } from 'nuxt/app';

const client = inject('sanityClient')
const images = ref([]);

const fetchInspirations = async () => {
  const query = `*[_type == "inspiration"] {
  _id,
  Nom,
  Image{
    asset->{
      _id,
      url
    }
  }
}`;


  try {
    const data = await client.fetch(query);
    images.value = data.map(proj => ({
      nom: proj.Nom,
      image: proj.Image?.asset?.url || ""
    }));

    if (images.value.length > 0) {
      useHead({
        meta: [
          { name: 'description', content: 'Découvrez les inspirations qui façonnent nos créations chez FA&Design.' },
          { property: 'og:description', content: 'Découvrez les inspirations qui façonnent nos créations chez FA&Design.' },
          { property: 'og:image', content: images.value[0].image || '/fallback.jpg' },
          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: 'https://www.preciliabourgeois.com/inspiration' },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: 'Inspirations - FA&Design' },
          { name: 'twitter:description', content: 'Découvrez les inspirations qui façonnent nos créations chez FA&Design.' },
          { name: 'twitter:image', content: images.value[0].image || '/fallback.jpg' },
        ]
      });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des inspirations :", error);
  }
};

onMounted(() => {
  fetchInspirations();
});
</script>
