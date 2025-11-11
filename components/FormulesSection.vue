<template>
  <section id="formules" class="relative py-16 px-5 bg-black text-white border-t-[3px] border-gold overflow-hidden">
    <div class="absolute top-[-100px] right-[-50px] w-[200px] h-[125px] md:w-[400px] md:h-[250px] bg-cover bg-no-repeat transform rotate-[-120deg] scale-90 origin-center" 
         style="background-image: url('/dorrure.png');">
    </div>

    <div class="md:px-5 mx-auto">
      <div class="py-5 lg:py-10">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gold text-center">Mes Formules</h2>
        <p class="mt-8 text-center text-gold">Votre Projet, Vos Envies, Nos Suggestions.</p>
      </div>

      <div class="relative mt-8 overflow-hidden">
        <div class="flex transition-transform duration-500 ease-in-out" :style="carouselStyle">
          <div 
            v-for="(formule, index) in formules" 
            :key="index"
            class="flex-none w-full md:w-1/2 lg:w-1/3 px-2 "
          >
            <div class="flex flex-col border border-black rounded-xl p-6 h-full bg-gold text-black">
              <div class="border-b border-black pb-4">
                <h3 class="text-3xl font-bold">{{ formule.nom }}</h3>
                <p class="text-2xl  font-caveat">"{{ formule.accroche }}"</p>
              </div>
              <ul class="mt-4 text-left border-b border-black py-4 flex-grow">
                <li v-for="(point, i) in formule.points" :key="i" class="pb-3  flex items-center">
                  <span class="mr-2">✓</span> {{ point }}
                </li>
              </ul>
              <div class="mt-auto">
                <p class="mt-4 text-xl text-center font-bold  py-4">{{ formule.prix }}</p>
                <button @click="redirectToContact" class="mt-4 px-4 mb-5 py-2 w-full bg-black text-white font-bold rounded-lg">
                  ME CONTACTER
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Bouton gauche -->
        <div @click="prevSlide" class="absolute top-[110px] left-0 h-full w-[8vw] flex items-center justify-center cursor-pointer">
          <div class="bg-black rounded-xl px-3 pt-2 pb-3">
            <button class="text-white text-5xl font-black">&lt;</button>
          </div>
        </div>

        <!-- Bouton droit -->
        <div @click="nextSlide" class="absolute top-[110px] right-0 h-full w-[8vw] flex items-center justify-center cursor-pointer">
          <div class="bg-black rounded-xl px-3 pt-2 pb-3">
            <button class="text-white text-5xl font-black">&gt;</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Section image + texte -->
<div class="mt-24 flex flex-col lg:flex-row items-center justify-center px-5">
  <!-- Image -->
  <div class="w-full lg:w-1/2 flex justify-center ">
    <img 
      src="/Carte cadeau 4.JPG" 
      alt="Illustration Formules" 
    class="w-full md:w-[50vw] lg:w-[33vw] h-auto rounded-2xl lobject-cover"
    />
  </div>

  <!-- Texte -->
  <div class="w-full lg:w-1/2 text-center lg:text-left text-white pt-10 md:pt-0">
    <h2 class="text-2xl lg:text-3xl font-normal ">'Plaisir <strong class="text-gold font-normal">d'Offrir</strong>'</h2>
    <p class="text-lg md:text-xl pt-10 leading-relaxed">
      Dévoilez votre originalité avec  la <strong class="text-gold font-normal">Carte Cadeau</strong> <strong class="font-caveat text-2xl font-normal">FA&Design</strong> <br>
    Une séance <strong class="text-gold font-normal">Coaching Déco</strong> à partir de 99€
    </p>
  </div>
</div>

  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useHead } from 'nuxt/app';
import { inject } from '#imports';

useHead({
  meta: [
    { name: 'description', content: 'Découvrez nos formules personnalisées adaptées à vos envies et besoins, proposées par FA&Design.' },
    { name: 'og:description', content: 'Explorez nos différentes formules de conception sur mesure. Votre projet, vos envies, nos suggestions.' },
    { name: 'og:image', content: '/images/formules-preview.jpg' },
    { name: 'og:url', content: "https://www.preciliabourgeois.com/" },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Mes Formules - FA&Design' },
    { name: 'twitter:description', content: 'Découvrez nos formules sur mesure, pensées pour répondre à vos besoins.' },
    { name: 'twitter:image', content: '/images/formules-preview.jpg' }
  ],
  link: [
    { rel: 'canonical', href: "https://www.preciliabourgeois.com/" },
  ]
});

const formules = ref([]);
const currentIndex = ref(0);
const visibleCount = ref(1);
const client = inject('sanityClient');

const redirectToContact = () => {
  window.location.href = "#contact";
};

const updateVisibleCount = () => {
  if (window.innerWidth < 768) {
    visibleCount.value = 1;
  } else if (window.innerWidth < 1024) {
    visibleCount.value = 2;
  } else {
    visibleCount.value = 3;
  }
};

const carouselStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * (100 / visibleCount.value)}%)`
}));

const nextSlide = () => {
  const maxIndex = formules.value.length - visibleCount.value;
  currentIndex.value = currentIndex.value >= maxIndex ? 0 : currentIndex.value + 1;
};

const prevSlide = () => {
  const maxIndex = formules.value.length - visibleCount.value;
  currentIndex.value = currentIndex.value === 0 ? maxIndex : currentIndex.value - 1;
};

const fetchFormules = async () => {
  const query = `*[_type == "formules"] | order(ordre asc) {
    _id,
    Nom,
    accroche,
    ListPoints,
    prix
  }`;

  try {
    const data = await client.fetch(query);
    formules.value = data.map(formule => ({
      nom: formule.Nom,
      accroche: formule.accroche || "",
      points: formule.ListPoints || [],
      prix: formule.prix || "Prix sur demande"
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des formules :", error);
  }
};

onMounted(() => {
  fetchFormules();
  updateVisibleCount();
  window.addEventListener("resize", updateVisibleCount);
});
</script>
