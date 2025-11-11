<template>
  <footer class="py-16 px-5 bg-black text-white border-t-[3px] border-gold">
    <div class="pb-16 mx-auto flex-col md:flex-row flex md:justify-between gap-8 text-sm">
      <!-- LOGO -->
      <div>
        <h3 class="text-2xl font-bold text-gold font-caveat">FA&Design</h3>
      </div>

      <!-- NAVIGATION -->
      <div>
        <h3 class="text-lg font-semibold text-gold mb-2">Navigation</h3>
        <ul class="space-y-1">
          <li><a href="../#inspirations" class="hover:underline" aria-label="Inspirations">Inspirations</a></li>
          <li><a href="../#realisations" class="hover:underline" aria-label="Réalisation">Réalisation</a></li>
          <li><a href="../#formules" class="hover:underline" aria-label="Formules">Formules</a></li>
          <li><a href="../#contact" class="hover:underline" aria-label="Contact">Contact</a></li>
        </ul>
      </div>

      <!-- ME SUIVRE -->
      <div>
        <h3 class="text-lg font-semibold text-gold mb-2">Me suivre</h3>
        <ul class="space-y-1">
          <li><a href="https://www.instagram.com/french_art_design_precilia/" class="hover:underline" aria-label="Instagram" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><a href="https://www.facebook.com/precilia.bourgeois.7" class="hover:underline" aria-label="Facebook" target="_blank" rel="noopener noreferrer">Facebook</a></li>
        </ul>
      </div>

      <!-- CONTACT -->
      <div>
        <h3 class="text-lg font-semibold text-gold mb-2">Contact</h3>
        <p>Mail : <a href="mailto:bourgeois.precilia.34@gmail.com" class="text-gold hover:underline" aria-label="Envoyer un mail à Précilia">bourgeois.precilia.34@gmail.com</a></p>
        <p>Téléphone : <span class="text-gold">+33 6 64 39 12 29</span></p>
      </div>
    </div>

    <!-- COPYRIGHT ET MENTIONS LEGALES -->
    <div class="mt-8 flex justify-between border-t border-gray-700 pt-4 text-center text-xs">
      <div class="flex justify-center space-x-4 mt-2">
        <p>© 2025 Joshua Dixon</p>
        <a href="/PrivacyPolicy" class="hover:underline" aria-label="Politique de confidentialité">Privacy Policy</a>
        <a href="/TermsOfService" class="hover:underline" aria-label="Conditions d'utilisation">Terms of Service</a>
      </div>
      <div class="flex justify-center space-x-4 mt-2">
        <a href="https://fadesign.sanity.studio/" target="_blank" rel="noopener noreferrer" aria-label="Accéder à l'admin de FA&Design">admin</a>
      </div>
    </div>
  </footer>
</template>
