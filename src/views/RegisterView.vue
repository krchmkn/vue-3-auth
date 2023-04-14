<script setup lang="ts">
import RegisterForm from '@/components/RegisterForm.vue'
</script>

<template>
  <article>
    <h1>Create account</h1>
    <RegisterForm />

    <footer>
      Already have an account?
      <RouterLink :to="{ name: 'login' }">Log in</RouterLink>
    </footer>
  </article>
</template>
