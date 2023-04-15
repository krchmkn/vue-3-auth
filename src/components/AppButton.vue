<script setup lang="ts">
const props = defineProps<{
  pending?: boolean
}>()
</script>

<template>
  <button :aria-busy="props.pending" :disabled="props.pending">
    <slot>Submit</slot>
  </button>
</template>
