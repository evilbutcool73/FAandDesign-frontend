<script setup>
import { ref, onMounted } from "vue";
import { inject } from "#imports";

const client = inject("sanityClient");
const hero = ref(null);
const bgStyle = ref("");

const fetchHero = async () => {
  const query = `*[_type == "hero"]{
    _id,
    Image{
      asset->{
        _id,
        url
      }
    }
  }`;

  try {
    const data = await client.fetch(query);
    hero.value = data[0]?.Image?.asset?.url; // Safely access the URL
    if (hero.value) {
      bgStyle.value = `background: url('${hero.value}') no-repeat center center fixed; background-size: cover;`;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du hero :", error);
  }
};

onMounted(() => {
  fetchHero();
});

</script>

<template>
  <section
    class="relative w-full h-screen bg-cover bg-center text-white flex items-end justify-left"
    :style="bgStyle"
  >
  <!-- <div class="bg-black/30 rounded-xl m-5 px-2 py-2 sm:px-4 text-xl sm:text-3xl font-caveat">
        <h3>Décoratrice d'intérieur</h3>
  </div> -->
  </section>
</template>

<style>
.bg-gold {
  background-color: #c8a062;
}
</style>
