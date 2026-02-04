<template>
  <section id="projects" class="py-20 px-6 relative z-10">
    <div class="container mx-auto max-w-7xl">
      <div class="text-center mb-16 fade-in-up">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Featured <span class="text-accent-blue">Projects</span>
        </h2>
        <div class="w-20 h-1 bg-accent-blue mx-auto mb-4"></div>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          A selection of projects that showcase my skills and expertise
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <div 
          v-for="(project, index) in projects" 
          :key="index"
          class="group bg-dark-secondary/50 rounded-2xl overflow-hidden border border-gray-800 hover:border-accent-blue/50 transition-all duration-300 fade-in-up flex flex-col"
        >
          <!-- Project Image/Visual -->
          <div class="relative h-56 bg-gradient-to-br from-accent-blue/10 via-purple-500/10 to-pink-500/10 overflow-hidden">
            <!-- Website Screenshot if available -->
            <img 
              v-if="project.screenshot"
              :src="project.screenshot" 
              :alt="`${project.title} - ${project.description}`"
              class="absolute inset-0 w-full h-full object-cover object-center"
              loading="lazy"
            />
            <!-- Fallback Icon -->
            <div v-else class="absolute inset-0 flex items-center justify-center">
              <div class="text-7xl opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-300">
                {{ project.icon }}
              </div>
            </div>
            <!-- Overlay on hover -->
            <div class="absolute inset-0 bg-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <!-- Project Content -->
          <div class="p-6 flex-1 flex flex-col">
            <h3 class="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-accent-blue transition-colors">
              {{ project.title }}
            </h3>
            <p class="text-gray-400 mb-2 flex-1 leading-relaxed">
              {{ project.description }}
            </p>
            <p v-if="project.website" class="text-accent-blue text-sm font-medium mb-5">
              {{ project.website }}
            </p>
            <div v-else class="mb-5"></div>

            <!-- Links -->
            <div class="flex gap-3 pt-4 border-t border-gray-800">
              <a 
                v-if="project.liveUrl"
                :href="project.liveUrl" 
                target="_blank"
                rel="noopener noreferrer"
                :class="project.githubUrl ? 'flex-1' : 'w-full'"
                class="bg-accent-blue hover:bg-accent-light text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 text-center transform hover:scale-105"
              >
                <i class="fas fa-external-link-alt mr-2"></i>
                Live Demo
              </a>
              <a 
                v-if="project.githubUrl"
                :href="project.githubUrl" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 bg-dark-bg hover:bg-gray-800 text-gray-300 hover:text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 text-center border border-gray-700 hover:border-gray-600"
              >
                <i class="fab fa-github mr-2"></i>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const screenshotErrors = ref<Record<number, boolean>>({})

const handleScreenshotError = (event: Event, index: number) => {
  screenshotErrors.value[index] = true
}

interface Project {
  title: string
  description: string
  technologies: string[]
  icon: string
  liveUrl?: string
  githubUrl?: string
  screenshot?: string
  website?: string
}

const projects: Project[] = [
  {
    title: 'Digital Menu',
    description: 'A modern digital menu website providing an interactive dining experience with easy navigation and beautiful presentation.',
    technologies: [],
    icon: '🍽️',
    liveUrl: 'https://www.skanom.com',
    githubUrl: undefined,
    screenshot: '/skanom.png',
    website: 'www.skanom.com'
  },
  {
    title: 'Adria - Ristorante and Pizza',
    description: 'A restaurant website showcasing authentic Italian cuisine, menu, and dining experience.',
    technologies: [],
    icon: '🍕',
    liveUrl: 'https://www.adriatrier.de',
    githubUrl: undefined,
    screenshot: '/adria.png',
    website: 'www.adriatrier.de'
  },
  {
    title: 'Clean Generale',
    description: 'A professional cleaning service website showcasing services and expertise.',
    technologies: [],
    icon: '🧹',
    liveUrl: 'https://cleangenerale.com/',
    githubUrl: undefined,
    screenshot: '/Cleangenerale.png',
    website: 'www.cleangenerale.com'
  },
]
</script>
