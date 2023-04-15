<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'

const props = defineProps<{
  pending?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit'): void
}>()
</script>

<template>
  <form @submit.prevent="emit('submit')">
    <slot></slot>

    <slot name="actions">
      <AppButton :pending="props.pending" />
    </slot>
  </form>
</template>
