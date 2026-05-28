<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 bg-dark-bg/95 backdrop-blur-sm transition-all duration-500 ease-smooth"
    :class="scrolled ? 'shadow-lg py-0' : 'shadow-none'"
  >
    <nav 
      class="container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-smooth"
      :class="scrolled ? 'py-2 sm:py-2.5' : 'py-3 sm:py-4'"
    >
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <a 
          href="#home" 
          @click="smoothScroll('home')"
          class="flex items-center space-x-3 group transition-transform duration-300 hover:scale-[1.02]"
        >
          <!-- Code/Developer Logo -->
          <svg class="w-6 h-6 text-white group-hover:text-accent-blue transition-colors duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <span class="hidden sm:inline text-white font-bold text-xl group-hover:text-accent-blue transition-colors">Denis Januzi</span>
        </a>

        <!-- Desktop Navigation (Large screens - 1024px+) -->
        <div class="hidden lg:flex items-center space-x-6">
          <a 
            v-for="item in navItems" 
            :key="item.id"
            :href="`#${item.id}`"
            @click.prevent="smoothScroll(item.id)"
            class="nav-link text-white hover:text-accent-blue transition-colors duration-300 font-medium"
            :class="{ 'is-active text-accent-blue': activeSection === item.id }"
          >
            {{ $t(`nav.${item.id}`) }}
          </a>
          <button
            @click="smoothScroll('contact')"
            class="btn-primary bg-accent-blue hover:bg-accent-light text-white px-4 py-1.5 rounded-lg font-medium text-sm"
          >
            {{ $t('nav.getInTouch') }}
          </button>
          <LanguageSwitcher />
        </div>

        <!-- Tablet Navigation (Medium screens - 768px to 1023px) -->
        <div class="hidden md:flex lg:hidden items-center space-x-4">
          <a 
            v-for="item in navItems" 
            :key="item.id"
            :href="`#${item.id}`"
            @click.prevent="smoothScroll(item.id)"
            class="nav-link text-white hover:text-accent-blue transition-colors duration-300 font-medium text-sm"
            :class="{ 'is-active text-accent-blue': activeSection === item.id }"
          >
            {{ $t(`nav.${item.id}`) }}
          </a>
          <button
            @click="smoothScroll('contact')"
            class="btn-primary bg-accent-blue hover:bg-accent-light text-white px-3 py-1.5 rounded-lg font-medium text-xs"
          >
            {{ $t('nav.getInTouch') }}
          </button>
          <LanguageSwitcher />
        </div>

        <!-- Mobile Navigation (Small screens - below 768px) -->
        <div class="md:hidden flex items-center gap-3">
          <button
            @click="smoothScroll('contact')"
            class="btn-primary bg-accent-blue hover:bg-accent-light text-white px-3 py-1.5 rounded-lg font-semibold text-xs"
          >
            {{ $t('nav.getInTouch') }}
          </button>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import { useActiveSection } from '../composables/useActiveSection'

const scrolled = ref(false)
const { activeSection } = useActiveSection()

const navItems = [
  { id: 'home' },
  { id: 'about' },
  { id: 'projects' },
]

const smoothScroll = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    const headerOffset = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
