<script setup lang="ts">
import { computed } from 'vue'
import AppButton from '@/components/AppButton.vue'

type modelValueType = string | number

const props = defineProps<{
  pending?: boolean
  disabled?: boolean
  modelValue: modelValueType
}>()

const emit = defineEmits<{
  (e: 'click'): void
  (e: 'update:modelValue', newVal: modelValueType): void
}>()

const value = computed({
  get() {
    return props.modelValue
  },
  set(newVal) {
    emit('update:modelValue', newVal)
  }
})
</script>

<template>
  <div class="grid">
    <div>
      <label for="emailConfirmCode">
        <input
          v-model="value"
          :disabled="pending"
          type="number"
          id="emailConfirmCode"
          placeholder="Email confirm code"
          required
        />
      </label>
    </div>

    <div :class="$style.buttonWrap">
      <AppButton :pending="pending" :disabled="disabled" @click="emit('click')"
        >Get confirm code</AppButton
      >
    </div>
  </div>
</template>

<style module>
.buttonWrap {
  margin-top: 5px;
}
</style>
