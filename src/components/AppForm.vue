<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'

defineProps<{
  pending?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit'): void
}>()
</script>

<template>
  <form @keyup.enter="emit('submit')">
    <slot></slot>

    <slot name="actions">
      <AppButton
        :disabled="disabled"
        :pending="pending"
        @click="emit('submit')"
      />
    </slot>
  </form>
</template>
