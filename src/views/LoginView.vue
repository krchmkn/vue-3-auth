<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AppForm from '@/components/AppForm.vue'
import { useAuth } from 'npmpackage'
import router from '@/router'

const form = ref<LoginReq>({
  credential: '',
  password: ''
})

const pending = ref(false)
const erroMsg = ref('')
const auth = useAuth()

function onSubmit() {
  pending.value = true
  auth
    .login(form.value)
    .then(() => router.push({ name: 'home' }))
    .catch((err: Error) => (erroMsg.value = err.message))
    .finally(() => (pending.value = false))
}
</script>

<template>
  <article>
    <Transition>
      <header v-if="erroMsg">{{ erroMsg }}</header>
    </Transition>
    <h1>Login</h1>
    <AppForm :pending="pending" @submit="onSubmit">
      <label for="login">
        Email
        <input v-model="form.credential" :disabled="pending" type="email" id="login" required />
      </label>

      <label for="password">
        Password
        <input
          v-model="form.password"
          :disabled="pending"
          type="password"
          id="password"
          minlength="5"
          title="Please enter at least 5 symbols"
          required
        />
      </label>
    </AppForm>

    <footer>
      Don't have an account?
      <RouterLink :to="{ name: 'register' }">Create account</RouterLink>
    </footer>
  </article>
</template>
