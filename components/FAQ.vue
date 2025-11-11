<template>
  <section id="faq" class="py-16 px-5 bg-black text-white border-t-[3px] border-gold">
    <div class="max-w-3xl mx-auto">
      <header class="mb-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gold">FAQ</h2>
        <p class="mt-6 text-white/70">Questions fréquentes — cliquez sur une question pour afficher la réponse.</p>
      </header>

      <div class="space-y-3">
        <div
          v-for="(item, i) in items"
          :key="item.id || i"
          class="bg-white/5 rounded-xl border border-white/5 overflow-hidden"
        >
          <button
            :id="`faq-question-${i}`"
            class="w-full text-left px-5 py-4 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            :aria-expanded="item.open ? 'true' : 'false'"
            :aria-controls="`faq-answer-${i}`"
            @click="toggle(i)"
            @keydown.enter.prevent="toggle(i)"
            @keydown.space.prevent="toggle(i)"
          >
            <span class="flex-1 text-left">
              <span class="text-white text-base md:text-lg font-medium">{{ item.q }}</span>
            </span>

            <!-- chevron -->
            <span
              class="ml-4 transform transition-transform duration-300"
              :class="item.open ? 'rotate-180' : 'rotate-0'"
              aria-hidden="true"
            >
              <svg class="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>

          <!-- Answer container: ref set by index -> used to measure height -->
          <div
            :id="`faq-answer-${i}`"
            class="px-5 overflow-hidden transition-[max-height] duration-300"
            :style="{ maxHeight: item.open ? item._scrollHeight + 'px' : '0px' }"
            :ref="el => setAnswerRef(el, i)"
            role="region"
            :aria-labelledby="`faq-question-${i}`"
          >
            <div class="py-4 text-white/80">
              <!-- la réponse peut contenir du HTML: utilise v-html si nécessaire -->
              <div v-if="item.html" v-html="item.a"></div>
              <p v-else>{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- si aucune question -->
      <p v-if="items.length === 0" class="mt-8 text-center text-white/60">Aucune question disponible.</p>
    </div>
  </section>
</template>
<script setup>
import { ref, nextTick, onMounted, watch, onBeforeUnmount } from 'vue';
import { inject } from '#imports';

const items = ref([]);
const answers = ref([]);
const client = inject('sanityClient');

const singleOpen = true;
let resizeObserver = null;

function setAnswerRef(el, idx) {
  answers.value[idx] = el || null;
}

/* calcule _scrollHeight pour chaque item */
async function updateAnswerHeights() {
  await nextTick();
  // utiliser items.value ici
  items.value.forEach((it, idx) => {
    const el = answers.value[idx];
    it._scrollHeight = el ? el.scrollHeight || 0 : 0;
  });
}

/* Toggle : ouvre/ferme et recalcule hauteurs après rendu */
async function toggle(index) {
  const target = items.value[index];
  if (!target) return;

  if (singleOpen) {
    if (!target.open) {
      items.value.forEach((it, i) => { it.open = (i === index); });
    } else {
      target.open = false;
    }
  } else {
    target.open = !target.open;
  }

  await nextTick();
  await updateAnswerHeights();
}

/* Cleanup externe */
function cleanupObservers() {
  if (resizeObserver) {
    answers.value.forEach(el => { if (el && resizeObserver.unobserve) resizeObserver.unobserve(el); });
    resizeObserver.disconnect();
    resizeObserver = null;
  }
}

/* onBeforeUnmount au niveau setup */
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
  cleanupObservers();
});

/* handler de resize (déclaré en haut pour reuse dans onBeforeUnmount) */
const onResize = () => updateAnswerHeights();

onMounted(async () => {
  try {
    const data = await client.fetch(`*[_type == "faq"]{_id, Question, Reponse}`);
    console.log('FAQ raw data:', data);

    items.value.splice(0, items.value.length);

    data.forEach(d => {
      // si Reponse peut être un objet/array (portable text), on convertit temporairement en string pour debug
      const rawA = d.Reponse;
      const aIsString = typeof rawA === 'string';
      const answerForItem = aIsString
        ? rawA
        : (Array.isArray(rawA) ? JSON.stringify(rawA) : String(rawA));

      items.value.push({
        id: d._id,
        q: d.Question ?? 'Question manquante',
        a: answerForItem,
        html: aIsString && rawA.includes('<'), // si c'est du HTML brut
        open: false,
        _scrollHeight: 0
      });
    });

    await nextTick();
    await updateAnswerHeights();

    // resize listener
    window.addEventListener('resize', onResize);

    // ResizeObserver : observe les éléments answer au montage
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => updateAnswerHeights());
      answers.value.forEach(el => { if (el) resizeObserver.observe(el); });
    }
  } catch (err) {
    console.error('Erreur lors du chargement des FAQ :', err);
  }
});

/* Si items change (fetch ou autre), recalculer */
watch(items, async () => {
  await nextTick();
  await updateAnswerHeights();
  if (resizeObserver) {
    answers.value.forEach(el => { if (el && resizeObserver.observe) resizeObserver.observe(el); });
  }
});
</script>

<style scoped>
/* couleurs cohérentes */
.text-gold { color: #c9a24a; }
.bg-gold { background-color: #c9a24a; }

/* amélioration tactile */
button {
  -webkit-tap-highlight-color: transparent;
}

/* small polish: smoother max-height transition */
.transition-\[max-height\] {
  transition-property: max-height;
}
</style>
