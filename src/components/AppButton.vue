<script setup lang="ts">
defineProps<{
  pending?: boolean
  disabled?: boolean
}>()
</script>

<template>
  <button type="button" :aria-busy="pending" :disabled="disabled">
    <slot>Submit</slot>
  </button>
</template>
