<template>
  <header class="scroll-smooth z-20 fixed top-0 w-full bg-black text-gold p-4 py-8 shadow-md  ">
    <div class="hidden md:block absolute top-0 right-0 w-[10vw] h-full bg-cover bg-no-repeat" style="background-image: url('/dorrure.png');"></div>
    <div class="container mx-auto flex justify-between items-center px-5">
      <h2 
        @click="redirectToHome" 
        class="text-4xl w-[20vw] font-caveat cursor-pointer"
      >
        FA&Design.
      </h2>
      
      <!-- Menu Desktop -->
      <nav class="hidden md:flex space-x-6 place-content-around lg:text-lg">    
          <a href="../#inspirations" class="hover:text-gold">Inspirations</a>
          <a href="../#realisations" class="hover:text-gold">Réalisations</a>
          <a href="../#renovation" class="hover:text-gold">Rénovation</a>
          <a href="../#formules" class="hover:text-gold">Formules</a>
          <a href="../#contact" class="hover:text-gold">Contact</a>
      </nav>
      <div class="text-2xl w-[20vw] font-caveat"></div>

      <!-- Menu Burger -->
      <button @click="toggleMenu" class="md:hidden focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>
     
    
    <!-- Menu Mobile -->
    <div v-if="isOpen" class="md:hidden bg-black text-white p-4">
      <a href="#inspirations" class="block py-2">Inspirations</a>
      <a href="#realisations" class="block py-2">Réalisations</a>
      <a href="../#renovation" class="hover:text-gold">Rénovation</a>
      <a href="#formules" class="block py-2">Formules</a>
      <a href="#contact" class="block py-2 ">Contact</a>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const redirectToHome = () => {
window.location.href = "../";
};
</script>

<style>
.bg-gold {
  background-color: #c8a062;
}
.hover\:text-gold:hover {
  color: #c8a062;
}
</style>