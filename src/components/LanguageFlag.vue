<template>
  <img
    :src="flagUrl"
    :srcset="`${flagUrlSmall} 1x, ${flagUrl} 2x`"
    :alt="alt"
    class="lang-flag"
    loading="lazy"
    decoding="async"
    referrerpolicy="no-referrer"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  locale: string
  alt?: string
}>()

const flagCode = computed(() => {
  const map: Record<string, string> = {
    en: 'gb',
    de: 'de',
    sq: 'al',
    hr: 'hr',
  }
  return map[props.locale] ?? 'gb'
})

const flagUrlSmall = computed(() => `https://flagcdn.com/w20/${flagCode.value}.png`)
const flagUrl = computed(() => `https://flagcdn.com/w40/${flagCode.value}.png`)

const alt = computed(() => props.alt ?? props.locale.toUpperCase())
</script>

<style scoped>
.lang-flag {
  display: block;
  height: 1em;
  width: auto;
  aspect-ratio: 4 / 3;
  border-radius: 1px;
  object-fit: cover;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
}
</style>
