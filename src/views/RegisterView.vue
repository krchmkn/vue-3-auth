<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import register from '@/api/register'
import { RouterLink } from 'vue-router'
import AppForm from '@/components/AppForm.vue'

const form = ref<RegisterReq>({
  email: '',
  password: '',
  userinfo: {
    account_name: ''
  }
})

const router = useRouter()
const pending = ref(false)

async function onSubmit() {
  pending.value = true
  try {
    await register(form.value)
    router.push({ name: 'home' })
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <article>
    <h1>Create account</h1>
    <AppForm :pending="pending" @submit="onSubmit">
      <label for="account">
        Account name
        <input
          v-model="form.userinfo.account_name"
          :disabled="pending"
          type="text"
          id="account"
          minlength="3"
          title="Please enter at least 3 letters"
          required
        />
      </label>

      <label for="email">
        Email
        <input v-model="form.email" :disabled="pending" type="email" id="email" required />
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
      Already have an account?
      <RouterLink :to="{ name: 'login' }">Log in</RouterLink>
    </footer>
  </article>
</template>
