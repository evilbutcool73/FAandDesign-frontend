<template>
    <section id="contact" class="py-32 px-5 text-white bg-black border-t-[3px] border-b-[3px] md:border-b-[0px] border-gold">
      <div class="md:px-5 grid lg:grid-cols-2 gap-8 xl:items-center">
        <!-- Formulaire -->
        <div>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-semibold text-white">Me <strong class="text-gold font-semibold">Contacter</strong></h2>
          <p class="mt-2">
            Par <strong class="">Mail</strong> : <a href="mailto:bourgeois.precilia.34@gmail.com" class=" underline">bourgeois.precilia.34@gmail.com</a><br>
            Par <strong class="">Téléphone</strong> : +33 6 64 39 12 29<br>
            ou par <strong class="">Formulaire</strong> directement ici !
          </p>
          
          <form action="https://formspree.io/f/xqaqrvgg" method="POST" class="mt-6 ">
            <label for="Nom">Nom</label>
            <input type="text" name="Nom" placeholder="Nom" 
                  class="w-full p-3 mb-5 ring-2 ring-white bg-black focus:outline-none focus:ring-gold">
            
            <label for="Prenom">Prénom</label>
            <input type="text" name="Prenom" placeholder="Prenom" 
                  class="w-full p-3 mb-5  ring-2 ring-white bg-black focus:outline-none focus:ring-gold"> 
                  
            <label for="Numero">Numéro</label>
            <input type="tel" name="Numero" placeholder="Numéro (facultatif)" 
                  class="w-full p-3 mb-5  ring-2 ring-white bg-black focus:outline-none focus:ring-gold">
            
            <label for="Email">Email</label>
            <input type="email" name="Email" placeholder="Email" 
                  class="w-full p-3 mb-5  ring-2 ring-white bg-black focus:outline-none focus:ring-gold">
            
            <label for="Prestation"></label>
            <select name="Prestation" class="w-full p-3 mb-5  ring-2 ring-white bg-black focus:outline-none focus:ring-gold">
              <option disabled selected>Préstation choisie</option>
              <option v-for="formule in formules" :key="formule.nom">{{ formule.nom }}</option>
            </select>

            <label for="Message">Message</label>
            <textarea name="message" placeholder="Écrivez votre message..." rows="4" 
                      class="w-full p-3 mb-5 ring-2 ring-white bg-black focus:outline-none focus:ring-gold"></textarea>

            <button type="submit" 
                    class="px-6 py-3 bg-white text-black font-bold ring-2 ring-gold hover:bg-opacity-80 transition">
              Soumettre
            </button>
          </form>

        </div>
  
        <!-- Carte La grande motte -->
        <div class="h-[70vh] md:h-[100vh] w-full bg-cover bg-center rounded-lg shadow-lg" >
             <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23125.649534721142!2d4.051407570653694!3d43.57100490075874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b6980718c43b47%3A0x4078821166ab9a0!2s34280%20La%20Grande-Motte!5e0!3m2!1sen!2sfr!4v1742411347040!5m2!1sen!2sfr" 
    class="w-full h-full rounded-lg shadow-lg"
    style="border:0;" 
    allowfullscreen="" 
    loading="lazy" 
    referrerpolicy="no-referrer-when-downgrade">
</iframe>

        </div>
      </div>
    </section>
  </template>
  
  <script setup>
import { ref, onMounted } from "vue";
import { inject } from '#imports';
import { useHead } from 'nuxt/app';
useHead({
  meta: [
    { name: 'description', content: 'Contactez FA&Design pour discuter de vos projets de design. Par email ou via notre formulaire en ligne.' },
    { name: 'og:description', content: 'Envoyez-nous vos questions ou demandez un devis pour vos projets via notre formulaire ou par email.' },
    { name: 'og:image', content: '/images/contact-preview.jpg' },
    { name: 'og:url', content: "https://www.preciliabourgeois.com/" },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Me Contacter - FA&Design' },
    { name: 'twitter:description', content: 'Contactez FA&Design pour en savoir plus sur nos services.' },
    { name: 'twitter:image', content: '/images/contact-preview.jpg' }
  ],
  link: [
    { rel: 'canonical', href: "https://www.preciliabourgeois.com/" },
  ]
});

const formules = ref([]);



const client = inject('sanityClient')
const fetchFormules = async () => {
const query = `*[_type == "formules"]{ Nom }`;

try {
    const data = await client.fetch(query);
    formules.value = data.map(formule => ({
    nom: formule.Nom
    }));
} catch (error) {
    console.error("Erreur lors de la récupération des formules :", error);
}
};
  
  onMounted(() => {
  fetchFormules();
});
  </script>
  