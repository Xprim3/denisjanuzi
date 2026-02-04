<template>
  <section id="projects" class="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 relative z-10">
    <div class="container mx-auto max-w-7xl">
      <div class="text-center mb-12 sm:mb-16 md:mb-20 fade-in-up">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          {{ $t('projects.title') }} <span class="text-accent-blue">{{ $t('projects.titleHighlight') }}</span>
        </h2>
        <div class="w-20 h-1 bg-accent-blue mx-auto mb-4"></div>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          {{ $t('projects.subtitle') }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 lg:gap-10">
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
          <div class="p-5 sm:p-6 md:p-8 flex-1 flex flex-col">
            <h3 class="text-xl sm:text-2xl md:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-accent-blue transition-colors">
              {{ getProjectTitle(project.key) }}
            </h3>
            <p class="text-gray-400 mb-2 flex-1 leading-relaxed">
              {{ getProjectDescription(project.key) }}
            </p>
            <p v-if="project.website" class="text-accent-blue text-sm font-medium mb-5">
              {{ project.website }}
            </p>
            <div v-else class="mb-5"></div>

            <!-- Links -->
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-5 border-t border-gray-800">
              <a 
                v-if="project.liveUrl"
                :href="project.liveUrl" 
                target="_blank"
                rel="noopener noreferrer"
                :class="project.githubUrl ? 'flex-1' : 'w-full'"
                class="bg-accent-blue hover:bg-accent-light text-white px-4 py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 text-center transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <i class="fas fa-external-link-alt"></i>
                <span>{{ $t('projects.liveDemo') }}</span>
              </a>
              <a 
                v-if="project.githubUrl"
                :href="project.githubUrl" 
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 bg-dark-bg hover:bg-gray-800 text-gray-300 hover:text-white px-4 py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 text-center border border-gray-700 hover:border-gray-600 flex items-center justify-center gap-2"
              >
                <i class="fab fa-github"></i>
                <span>{{ $t('projects.github') }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const screenshotErrors = ref<Record<number, boolean>>({})

const handleScreenshotError = (event: Event, index: number) => {
  screenshotErrors.value[index] = true
}

interface Project {
  key: string
  technologies: string[]
  icon: string
  liveUrl?: string
  githubUrl?: string
  screenshot?: string
  website?: string
}

const projects: Project[] = [
  {
    key: 'digitalMenu',
    technologies: [],
    icon: '🍽️',
    liveUrl: 'https://www.skanom.com',
    githubUrl: undefined,
    screenshot: '/skanom.png',
    website: 'www.skanom.com'
  },
  {
    key: 'adria',
    technologies: [],
    icon: '🍕',
    liveUrl: 'https://www.adriatrier.de',
    githubUrl: undefined,
    screenshot: '/adria.png',
    website: 'www.adriatrier.de'
  },
  {
    key: 'cleanGenerale',
    technologies: [],
    icon: '🧹',
    liveUrl: 'https://cleangenerale.com/',
    githubUrl: undefined,
    screenshot: '/Cleangenerale.png',
    website: 'www.cleangenerale.com'
  },
]

const getProjectTitle = (key: string) => {
  return t(`projects.${key}.title`)
}

const getProjectDescription = (key: string) => {
  return t(`projects.${key}.description`)
}
</script>
