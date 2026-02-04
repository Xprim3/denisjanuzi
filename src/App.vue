<template>
  <div class="min-h-screen bg-dark-bg relative">
    <!-- Global Background Decorations -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <!-- Gradient Orbs -->
      <div class="bg-gradient-orb bg-gradient-orb-1"></div>
      <div class="bg-gradient-orb bg-gradient-orb-2"></div>
      <div class="bg-gradient-orb bg-gradient-orb-3"></div>
      
      <!-- Grid Pattern -->
      <div class="grid-pattern"></div>
      
      <!-- Floating Shapes -->
      <div class="floating-shape floating-shape-1"></div>
      <div class="floating-shape floating-shape-2"></div>
      <div class="floating-shape floating-shape-3"></div>
    </div>

    <!-- Navigation Header -->
    <NavHeader />
    
    <!-- Hero Section -->
    <HeroSection />
    
    <!-- Wave Divider -->
    <div class="wave-divider wave-divider-top">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
      </svg>
    </div>
    
    <!-- About Me Section -->
    <div class="relative">
      <div class="section-overlay"></div>
      <AboutSection />
    </div>
    
    <!-- Wave Divider -->
    <div class="wave-divider">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
      </svg>
    </div>
    
    <!-- Projects Section -->
    <div class="relative">
      <div class="section-overlay"></div>
      <ProjectsSection />
    </div>
    
    <!-- Wave Divider -->
    <div class="wave-divider">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
      </svg>
    </div>
    
    <!-- Contact Section -->
    <div class="relative">
      <div class="section-overlay"></div>
      <ContactSection />
    </div>
    
    <!-- Footer -->
    <div class="relative z-10">
      <Footer />
    </div>

    <!-- Scroll to Top Button -->
    <transition name="fade">
      <button
        v-if="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 z-50 w-12 h-12 bg-accent-blue hover:bg-accent-light text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
        aria-label="Scroll to top"
      >
        <i class="fas fa-arrow-up text-xl"></i>
      </button>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import NavHeader from './components/NavHeader.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactSection from './components/ContactSection.vue'
import Footer from './components/Footer.vue'

const showScrollTop = ref(false)

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
