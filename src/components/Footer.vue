<template>
  <footer class="bg-dark-bg border-t border-gray-800 py-12 md:py-16 px-4 md:px-6 relative z-10">
    <div class="container mx-auto max-w-6xl">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-10">
        <!-- Brand & Description -->
        <div class="md:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <svg class="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <h3 class="text-2xl font-bold text-white">Denis Januzi</h3>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed mb-4 max-w-md">
            Web developer building modern, practical solutions. Available for remote projects outside working hours.
          </p>
          <div class="flex items-center gap-2 text-gray-400 text-sm">
            <i class="fas fa-map-marker-alt text-accent-blue"></i>
            <span>Trier, Germany</span>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-white font-semibold mb-4 text-lg">Quick Links</h4>
          <ul class="space-y-2.5">
            <li>
              <a 
                href="#home" 
                @click.prevent="smoothScroll('home')"
                class="text-gray-400 hover:text-accent-blue transition-colors text-sm inline-flex items-center gap-2 group"
              >
                <i class="fas fa-chevron-right text-xs opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"></i>
                <span>Home</span>
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                @click.prevent="smoothScroll('about')"
                class="text-gray-400 hover:text-accent-blue transition-colors text-sm inline-flex items-center gap-2 group"
              >
                <i class="fas fa-chevron-right text-xs opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"></i>
                <span>About</span>
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                @click.prevent="smoothScroll('projects')"
                class="text-gray-400 hover:text-accent-blue transition-colors text-sm inline-flex items-center gap-2 group"
              >
                <i class="fas fa-chevron-right text-xs opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"></i>
                <span>Projects</span>
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                @click.prevent="smoothScroll('contact')"
                class="text-gray-400 hover:text-accent-blue transition-colors text-sm inline-flex items-center gap-2 group"
              >
                <i class="fas fa-chevron-right text-xs opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"></i>
                <span>Contact</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-800 my-8"></div>

      <!-- Bottom Bar -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-gray-500 text-xs md:text-sm text-center md:text-left">
          © {{ currentYear }} Denis Januzi. All rights reserved.
        </p>
        <div class="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
          <span>Built with</span>
          <i class="fas fa-heart text-accent-blue animate-pulse"></i>
          <span>using</span>
          <span class="text-accent-blue font-medium">Vue.js</span>
          <span>&</span>
          <span class="text-accent-blue font-medium">TypeScript</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

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
</script>
