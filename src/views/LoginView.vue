<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'
import login from '@/api/login'
import AppForm from '@/components/AppForm.vue'

const form = ref<LoginReq>({
  credential: '',
  password: ''
})

const router = useRouter()
const pending = ref(false)

async function onSubmit() {
  pending.value = true
  try {
    await login(form.value)
    router.push({ name: 'home' })
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <article>
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
