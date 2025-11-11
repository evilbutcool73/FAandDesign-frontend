<template>
  <div>
    <h1>Redirection vers Sanity Studio...</h1>
    <p>Vous allez être redirigé vers l'interface d'administration.</p>
  </div>
</template>

<script setup>
  // Vérifie que nous sommes côté client avant d'effectuer la redirection
  if (process.client) {
    window.location.href = "https://fadesign.sanity.studio/";
  }
</script>
