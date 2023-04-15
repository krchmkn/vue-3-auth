<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppButton from '@/components/AppButton.vue'
import FireWorks from '@/components/FireWorks.vue'
import logout from '@/api/logout'

const router = useRouter()
const pending = ref(false)
const refreshToken = ref<LogoutReg>({ refreshToken: '' })

async function logOut() {
  pending.value = true
  try {
    await logout(refreshToken.value)
    router.push({ name: 'login' })
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <article>
    <header>
      <AppButton :pending="pending" @click="logOut"> Log out </AppButton>
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
