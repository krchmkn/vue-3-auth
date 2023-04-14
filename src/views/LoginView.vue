<script setup lang="ts">
import { RouterLink } from 'vue-router';
import LoginForm from '@/components/LoginForm.vue'
</script>

<template>
  <article>
    <h1>Login</h1>
    <LoginForm />

    <footer>
      Don't have an account?
      <RouterLink :to="{ name: 'register' }">Create account</RouterLink>
    </footer>
  </article>
</template>
