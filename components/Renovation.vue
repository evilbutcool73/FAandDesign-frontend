<template>
  <section id="renovation" class="py-16 px-5 bg-black text-white border-t-[3px] border-gold">
    <div class="px-2  md:px-8 mx-auto">
      <header class="mb-8 py-10 text-center">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gold">Rénovation</h2>
        <p class="mt-8 text-center text-gold">Profitez d'un intérieur à votre image.</p>
      </header>

      <!-- Masonry container -->
      <div class="relative">
        <div
          ref="gridContainer"
          class="grid gap-4"
          :class="{
            'grid-cols-1': columnsCount === 1,
            'grid-cols-2': columnsCount === 2,
            'grid-cols-3': columnsCount === 3
          }"
          :style="{ maxHeight: visibleHeight + 'vh', overflow: 'hidden' }"
        >
          <div
            v-for="(item, index) in items"
            :key="item.id || index"
            class="rounded-xl overflow-hidden bg-gray-800 cursor-pointer"
            @click="openItem(item)"
          >
            <img
              :src="item.image"
              :alt="item.nom || 'chantier'"
              class="w-full object-cover block"
              :style="{ aspectRatio: item.aspect || '4 / 3' }"
            />
            <div class="px-3 py-2 bg-black/50 text-gold text-sm">
              {{ item.nom }}
            </div>
          </div>
        </div>

        <!-- Bouton Voir plus -->
        <div
          v-if="showSeeMore"
          class="absolute bottom-0 left-0 w-full flex justify-center"
        >
          <div
            class="w-full text-center py-5 bg-gradient-to-t from-black via-black/90 to-transparent"
          >
            <button
              @click="seeMore"
              class="inline-block bg-gold text-black font-semibold px-8 py-3 rounded-2xl shadow-lg hover:bg-gold/90 transition"
            >
              Voir plus
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';

/* Exemple d’images (remplace par ton fetch Sanity) */
const items = ref([]);

const client = inject('sanityClient');

/* responsive : nombre de colonnes */
const columnsCount = ref(3);
const updateColumnsCount = () => {
  const w = window.innerWidth;
  if (w < 768) columnsCount.value = 1;
  else if (w < 1024) columnsCount.value = 2;
  else columnsCount.value = 3;
};

/* hauteur visible du container en vh */
const visibleHeight = ref(80);

/* total height estimée : quand on affiche tout, on désactive le bouton */
const gridContainer = ref(null);
const totalScrollableHeight = ref(0);

const updateTotalHeight = () => {
  if (gridContainer.value) {
    totalScrollableHeight.value = gridContainer.value.scrollHeight;
  }
};

/* "Voir plus" ajoute +80vh à chaque clic */
function seeMore() {
  visibleHeight.value += 80;
}

/* bouton visible si le contenu dépasse la hauteur actuelle */
const showSeeMore = computed(() => {
  if (!gridContainer.value) return false;
  const container = gridContainer.value;
  return container.scrollHeight > (visibleHeight.value / 100) * window.innerHeight;
});

/* clic sur image */
function openItem(item) {
  console.log('ouvrir', item);
  // router.push(`/realisations/${item.id}`)
}

const fetchChantiers = async () => {
  const query = `*[_type == "chantiers"] {
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
    items.value = data.map(proj => ({
      nom: proj.Nom,
      image: proj.Image?.asset?.url || ""
    }));
    console.log(items)
  } catch (error) {
    console.error("Erreur lors de la récupération des inspirations :", error);
  }
};

/* lifecycles */
onMounted(() => {
  updateColumnsCount();
  updateTotalHeight();
  window.addEventListener('resize', () => {
    updateColumnsCount();
    updateTotalHeight();
  });
  fetchChantiers();

});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateColumnsCount);
});

/* surveille items et recalcule */
watch(items, () => {
  setTimeout(updateTotalHeight, 100);
});
</script>

<style scoped>
/* Optionnel : un effet fondu progressif sur le bas avant "Voir plus" */
#chantiers {
  position: relative;
}
</style>
