<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 bg-dark-bg/95 backdrop-blur-sm transition-all duration-300"
    :class="{ 'shadow-lg': scrolled }"
  >
    <nav class="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <a 
          href="#home" 
          @click="smoothScroll('home')"
          class="flex items-center space-x-3 group"
        >
          <!-- Code/Developer Logo -->
          <svg class="w-6 h-6 text-white group-hover:text-accent-blue transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
            class="text-white hover:text-accent-blue transition-colors duration-200 font-medium"
          >
            {{ $t(`nav.${item.id}`) }}
          </a>
          <button
            @click="smoothScroll('contact')"
            class="bg-accent-blue hover:bg-accent-light text-white px-4 py-1.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 text-sm"
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
            class="text-white hover:text-accent-blue transition-colors duration-200 font-medium text-sm"
          >
            {{ $t(`nav.${item.id}`) }}
          </a>
          <button
            @click="smoothScroll('contact')"
            class="bg-accent-blue hover:bg-accent-light text-white px-3 py-1.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 text-xs"
          >
            {{ $t('nav.getInTouch') }}
          </button>
          <LanguageSwitcher />
        </div>

        <!-- Mobile Navigation (Small screens - below 768px) -->
        <div class="md:hidden flex items-center gap-3">
          <button
            @click="smoothScroll('contact')"
            class="bg-accent-blue hover:bg-accent-light text-white px-3 py-1.5 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 text-xs"
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

const scrolled = ref(false)

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
