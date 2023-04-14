<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function onSubmit() {
  router.push({ name: 'home' })
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <label for="account">
      Account name
      <input
        type="text"
        id="account"
        pattern="[A-Za-z]{5}"
        minlength="5"
        title="Please enter at least 5 letters"
        required
      />
    </label>

    <label for="login">
      Email
      <input type="email" id="login" required />
    </label>

    <label for="password">
      Password
      <input
        type="password"
        id="password"
        minlength="5"
        title="Please enter at least 5 symbols"
        required
      />
    </label>

    <input type="submit" />
  </form>
</template>
