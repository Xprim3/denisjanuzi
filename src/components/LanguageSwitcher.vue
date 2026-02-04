<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-700 hover:border-accent-blue/50 bg-dark-bg/50 hover:bg-dark-bg transition-all duration-200 text-white text-sm font-medium"
      :class="{ 'border-accent-blue/50': isOpen }"
    >
      <i class="fas fa-globe text-accent-blue"></i>
      <span class="hidden sm:inline">{{ currentLanguage.toUpperCase() }}</span>
      <i class="fas fa-chevron-down text-xs transition-transform duration-200" :class="{ 'rotate-180': isOpen }"></i>
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        ref="dropdownRef"
        class="absolute right-0 mt-2 w-40 bg-dark-secondary border border-gray-800 rounded-lg shadow-xl overflow-hidden z-50"
      >
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="changeLanguage(lang.code)"
          class="w-full px-4 py-3 text-left text-white hover:bg-accent-blue/10 transition-colors duration-200 flex items-center gap-3"
          :class="{ 'bg-accent-blue/20': currentLanguage === lang.code }"
        >
          <span class="text-sm font-medium">{{ lang.name }}</span>
          <i v-if="currentLanguage === lang.code" class="fas fa-check text-accent-blue ml-auto"></i>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const languages = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' }
]

const currentLanguage = computed(() => locale.value)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const changeLanguage = (langCode: string) => {
  locale.value = langCode
  localStorage.setItem('locale', langCode)
  closeDropdown()
}

// Handle click outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (isOpen.value && dropdownRef.value) {
    // Check if click is outside both the dropdown and the button
    const button = target.closest('button')
    const isClickInsideDropdown = dropdownRef.value.contains(target)
    const isClickOnButton = button && button.closest('.relative')?.querySelector('button') === button
    
    if (!isClickInsideDropdown && !isClickOnButton) {
      closeDropdown()
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
