<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function onSubmit() {
  router.push({ name: 'home' })
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <label for="login">
      Login
      <input type="text" id="login" required />
    </label>

    <label for="password">
      Password
      <input type="password" id="password" required />
    </label>

    <input type="submit" />
  </form>
</template>
