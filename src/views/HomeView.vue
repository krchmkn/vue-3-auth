<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppButton from '@/components/AppButton.vue'
import FireWorks from '@/components/FireWorks.vue'
import { useAuth } from 'npmpackage'

const router = useRouter()
const pending = ref(false)
const erroMsg = ref('')
const auth = useAuth()

function logOut() {
  pending.value = true
  auth
    .logout()
    .then(() => router.push({ name: 'login' }))
    .catch((err: Error) => (erroMsg.value = err.message))
    .finally(() => (pending.value = false))
}
</script>

<template>
  <article>
    <header>
      <Transition>
        <p v-if="erroMsg">{{ erroMsg }}</p>
      </Transition>
      <AppButton :pending="pending" @click="logOut">Log out </AppButton>
    </header>
    <h1>Hooray! You are logged in!</h1>

    <FireWorks />
  </article>
</template>

<style lang="scss" scoped>
article {
  text-align: center;
}
</style>
