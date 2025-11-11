<template>
  <section id="realisations" class="relative py-16 px-5 bg-black text-white border-t-[3px] border-gold overflow-hidden">
    <!-- Image en haut à droite avec rotation et correction -->
    <div class="absolute top-[-50px] right-[-50px] w-[200px] md:w-[400px] h-[100px] md:h-[200px] bg-cover bg-no-repeat transform rotate-[130deg] scale-90 origin-center z-1"
         style="background-image: url('/dorrure.png');">
    </div>

    <div class="md:px-5 mx-auto">
      <div class="py-5 lg:py-10 ">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gold text-center">Réalisations</h2>
        <p class="mt-8 text-center text-gold">Explorez les créations signées FA&Design</p>
      </div>

      <div class="relative mt-8 overflow-hidden">
        <!-- wrapper with touch/pointer listeners -->
        <div
          class="flex transition-transform duration-500 ease-in-out"
          :style="carouselStyle"
          @touchstart.passive="onTouchStart"
          @touchmove.passive="onTouchMove"
          @touchend="onTouchEnd"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerup="onPointerUp"
          @pointercancel="onPointerUp"
          ref="carousel"
        >
          <div
            v-for="(item, index) in items"
            :key="index"
            class="flex-none w-full md:w-1/2 lg:w-1/3 px-2 cursor-pointer"
            @click="goToRealisation(item.id)"
          >
            <div class="relative w-full aspect-square rounded-3xl overflow-hidden bg-cover bg-center"
                 :style="{ backgroundImage: `url(${item.image})` }">
              <div class="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-2xl py-5 px-2">
                <p>{{ item.text }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Bouton gauche -->
        <div @click="prevSlide" class=" absolute top-0 left-0 h-full w-[8vw] flex items-center justify-center cursor-pointer transition-opacity duration-300">
          <div class="bg-black/40 rounded-xl px-3 pt-2 pb-4">
            <button class="text-white text-5xl font-black">&lt;</button>
          </div>
        </div>

        <!-- Bouton droit -->
        <div @click="nextSlide" class="absolute top-0 right-0 h-full w-[8vw] flex items-center justify-center cursor-pointer transition-opacity duration-300">
          <div class="bg-black/40 rounded-xl px-3 pt-2 pb-4">
            <button class="text-white text-5xl font-black">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>




<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { inject, useRouter, useHead } from '#imports';

// Router + Sanity client
const router = useRouter();
const client = inject('sanityClient');

// Refs / state
const items = ref([]);
const currentIndex = ref(0);
const visibleCount = ref(1);
const carousel = ref(null);

// paramètres
const threshold = 50; // px pour valider le swipe

/* -------------------------
   Responsive visible count
   ------------------------- */
const updateVisibleCount = () => {
  const w = window.innerWidth;
  visibleCount.value = w < 768 ? 1 : (w < 1024 ? 2 : 3);
};

/* -------------------------
   Carousel transform style
   ------------------------- */
const carouselStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * (100 / visibleCount.value)}%)`,
}));

/* -------------------------
   Navigation simple
   ------------------------- */
const nextSlide = () => {
  const maxIndex = Math.max(0, items.value.length - visibleCount.value);
  currentIndex.value = currentIndex.value >= maxIndex ? 0 : currentIndex.value + 1;
};

const prevSlide = () => {
  const maxIndex = Math.max(0, items.value.length - visibleCount.value);
  currentIndex.value = currentIndex.value <= 0 ? maxIndex : currentIndex.value - 1;
};

const goToRealisation = (id) => {
  if (!id) return;
  router.push(`/realisations/${id}`);
};

/* -------------------------
   Swipe / Pointer handlers
   ------------------------- */
let startX = 0;
let startY = 0;
let deltaX = 0;
let deltaY = 0;
let dragging = false;
let pointerDown = false;

function resetDrag() {
  startX = startY = deltaX = deltaY = 0;
  dragging = false;
  pointerDown = false;
}

/* Touch */
function onTouchStart(e) {
  if (!e.touches || e.touches.length === 0) return;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  dragging = true;
}
function onTouchMove(e) {
  if (!dragging || !e.touches || e.touches.length === 0) return;
  deltaX = e.touches[0].clientX - startX;
  deltaY = e.touches[0].clientY - startY;
}
function onTouchEnd() {
  if (!dragging) return;
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
    deltaX < 0 ? nextSlide() : prevSlide();
  }
  resetDrag();
}

/* Pointer (mouse) */
function onPointerDown(e) {
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  pointerDown = true;
  dragging = true;
  startX = e.clientX;
  startY = e.clientY;
  try { e.target.setPointerCapture?.(e.pointerId); } catch (err) {}
}
function onPointerMove(e) {
  if (!pointerDown) return;
  deltaX = e.clientX - startX;
  deltaY = e.clientY - startY;
}
function onPointerUp() {
  if (!pointerDown) return;
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
    deltaX < 0 ? nextSlide() : prevSlide();
  }
  resetDrag();
}

/* -------------------------
   Fetch réalisations (Sanity)
   ------------------------- */
async function fetchRealizations() {
  if (!client) {
    console.error('[fetchRealizations] sanity client is not available (inject returned undefined).');
    return;
  }

  const query = `*[_type == "realisation"]{
    _id,
    Nom,
    ImageCover{ asset->{ _id, url } }
  }`;

  try {
    const data = await client.fetch(query);
    // Normaliser les données
    items.value = (data || []).map(p => ({
      id: p._id,
      image: p.ImageCover?.asset?.url || '',
      text: p.Nom || ''
    }));

    // Mettre à jour meta OG basique si on a une image
    if (items.value.length > 0) {
      useHead({
        meta: [
          { name: 'description', content: 'Découvrez les réalisations de Précilia Bourgeois.' },
          { property: 'og:description', content: 'Découvrez les réalisations de Précilia Bourgeois.' },
          { property: 'og:image', content: items.value[0].image || '/fallback.jpg' },
        ]
      });
    }
  } catch (err) {
    console.error('Erreur fetchRealizations:', err);
  }
}

/* -------------------------
   Listeners lifecycle
   ------------------------- */
function attachCarouselListeners() {
  if (!carousel.value) return;

  // touch listeners (passive where possible)
  carousel.value.addEventListener('touchstart', onTouchStart, { passive: true });
  carousel.value.addEventListener('touchmove', onTouchMove, { passive: true });
  carousel.value.addEventListener('touchend', onTouchEnd);

  // pointer listeners
  carousel.value.addEventListener('pointerdown', onPointerDown);
  carousel.value.addEventListener('pointermove', onPointerMove);
  carousel.value.addEventListener('pointerup', onPointerUp);
  carousel.value.addEventListener('pointercancel', onPointerUp);
}

function removeCarouselListeners() {
  if (!carousel.value) return;
  carousel.value.removeEventListener('touchstart', onTouchStart);
  carousel.value.removeEventListener('touchmove', onTouchMove);
  carousel.value.removeEventListener('touchend', onTouchEnd);
  carousel.value.removeEventListener('pointerdown', onPointerDown);
  carousel.value.removeEventListener('pointermove', onPointerMove);
  carousel.value.removeEventListener('pointerup', onPointerUp);
  carousel.value.removeEventListener('pointercancel', onPointerUp);
}

/* -------------------------
   Keep currentIndex valid
   ------------------------- */
watch([visibleCount, items], () => {
  const maxIndex = Math.max(0, items.value.length - visibleCount.value);
  if (currentIndex.value > maxIndex) currentIndex.value = maxIndex;
});

/* -------------------------
   Mount / unmount
   ------------------------- */
onMounted(() => {
  fetchRealizations();
  updateVisibleCount();
  window.addEventListener('resize', updateVisibleCount);

  // attendre que le ref carousel soit monté → setTimeout 0 pour sécurité minimale
  setTimeout(() => {
    attachCarouselListeners();
  }, 0);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateVisibleCount);
  removeCarouselListeners();
});
</script>


