<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'
import AppForm from '@/components/AppForm.vue'
import EmailConfirm from '@/components/EmailConfirm.vue'
import { useAuth } from 'npmpackage'

const form = ref<RegisterReq>({
  email: '',
  emailConfirmCode: '',
  password: '',
  userinfo: {
    account_name: ''
  }
})

const router = useRouter()
const pending = ref(false)
const pendingCode = ref(false)
const erroMsg = ref('')
const auth = useAuth()

function onCodeRequest() {
  pendingCode.value = true
  auth
    .sendConfirmCode({
      email: form.value.email,
      use_call: false
    })
    .then((code: number) => (form.value.emailConfirmCode = code))
    .catch((err: Error) => (erroMsg.value = err.message))
    .finally(() => (pendingCode.value = false))
}

function onSubmit() {
  pending.value = true
  auth
    .register(form.value)
    .then(() => router.push({ name: 'login', query: { email: form.value.email } }))
    .catch((err: Error) => (erroMsg.value = err.message))
    .finally(() => (pending.value = false))
}
</script>

<template>
  <article>
    <Transition>
      <header v-if="erroMsg">{{ erroMsg }}</header>
    </Transition>
    <h1>Create account</h1>
    <AppForm :pending="pending" @submit="onSubmit" :disabled="!form.emailConfirmCode || pending">
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

      <Transition>
        <EmailConfirm
          v-if="form.email"
          v-model="form.emailConfirmCode"
          :pending="pendingCode"
          :disabled="pending || pendingCode"
          @click="onCodeRequest"
        />
      </Transition>

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
