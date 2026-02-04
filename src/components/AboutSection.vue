<template>
  <section id="about" class="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-dark-secondary/30 relative z-10">
    <div class="container mx-auto max-w-6xl">
      <div class="grid lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start">
        <!-- Combined Profile Image & Info Card -->
        <div class="lg:col-span-1 fade-in-up">
          <div class="bg-dark-secondary/50 rounded-2xl border border-gray-800 hover:border-accent-blue/50 transition-all duration-300 overflow-hidden">
            <!-- Profile Image -->
            <div class="relative w-full aspect-square">
              <img 
                v-if="profileImage && !imageError"
                :src="profileImage" 
                alt="Denis Januzi"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
              <!-- Fallback -->
              <div v-else class="w-full h-full bg-gradient-to-br from-accent-blue/20 to-purple-500/20 flex items-center justify-center">
                <div class="w-32 h-32 bg-accent-blue rounded-full flex items-center justify-center shadow-lg">
                  <span class="text-white text-4xl font-bold">DJ</span>
                </div>
              </div>
            </div>

            <!-- Personal Info -->
            <div class="p-5 sm:p-6 md:p-8 space-y-4 sm:space-y-5">
              <h3 class="text-2xl font-bold text-white">{{ personalInfo.name }}</h3>
              
              <div class="space-y-3 text-sm">
                <div>
                  <p class="text-gray-400 mb-1">{{ $t('about.birthday') }}</p>
                  <p class="text-white">{{ personalInfo.birthday }}</p>
                </div>

                <div>
                  <p class="text-gray-400 mb-1">{{ $t('about.location') }}</p>
                  <p class="text-white">{{ personalInfo.location }}</p>
                </div>

                <div>
                  <p class="text-gray-400 mb-1">{{ $t('about.languages') }}</p>
                  <p class="text-white text-sm">
                    <span 
                      v-for="(lang, index) in personalInfo.languages" 
                      :key="lang.name"
                    >
                      <span class="font-medium">{{ lang.name }}</span><span v-if="index < personalInfo.languages.length - 1">, </span>
                    </span>
                  </p>
                </div>

                <div>
                  <p class="text-gray-400 mb-2">{{ $t('about.techStack') }}</p>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="tech in personalInfo.primaryTech" 
                      :key="tech"
                      class="bg-accent-blue/10 px-3 py-1 rounded text-xs text-accent-light"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>

                <div>
                  <p class="text-gray-400 mb-2">{{ $t('about.hobbies') }}</p>
                  <p class="text-white text-sm">
                    <span 
                      v-for="(hobby, index) in personalInfo.hobbies" 
                      :key="hobby"
                    >
                      <span class="font-medium">{{ hobby }}</span><span v-if="index < personalInfo.hobbies.length - 1">, </span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- About Content -->
        <div class="lg:col-span-2 space-y-6 sm:space-y-8 md:space-y-10 fade-in-up">
          <!-- Personal Story -->
          <div class="space-y-4 sm:space-y-5">
            <h3 class="text-2xl sm:text-3xl font-bold text-white mb-5 sm:mb-6">{{ $t('about.myStory') }}</h3>
            <p class="text-gray-300 text-lg leading-relaxed">
              {{ $t('about.story1') }}
            </p>
            <p class="text-gray-300 text-lg leading-relaxed">
              {{ $t('about.story2') }}
            </p>
            <p class="text-gray-300 text-lg leading-relaxed">
              {{ $t('about.story3') }}
            </p>
            <p class="text-gray-300 text-lg leading-relaxed">
              {{ $t('about.story4') }}
            </p>
          </div>

          <!-- Full-Time Job -->
          <div class="bg-dark-secondary/50 rounded-xl p-5 sm:p-6 md:p-8 border border-gray-800 hover:border-accent-blue/50 transition-all duration-300">
            <h4 class="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-5">{{ $t('about.fullTimeCareer') }}</h4>
            <p class="text-gray-400 mb-3">
              <span class="text-accent-light font-medium">{{ $t('about.fullTimeJobTitle') }}</span> {{ $t('common.at') }} 
              <span class="text-accent-light font-medium">{{ $t('about.fullTimeJobCompany') }}</span>
            </p>
            <p class="text-gray-300">
              {{ $t('about.fullTimeJobDescription') }}
            </p>
          </div>

          <!-- Coding Passion -->
          <div class="bg-dark-secondary/50 rounded-xl p-5 sm:p-6 md:p-8 border border-gray-800 hover:border-accent-blue/50 transition-all duration-300">
            <h4 class="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-5">{{ $t('about.codingFocus') }}</h4>
            <p class="text-gray-300 mb-3">
              {{ $t('about.codingDescription1') }}
            </p>
            <p class="text-gray-300">
              {{ $t('about.codingDescription2') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const imageError = ref(false)
// Profile image - place your image in the public folder as 'profile.jpg'
const profileImage = ref<string | null>('/profile.jpg.jpg')

const handleImageError = () => {
  imageError.value = true
}

const personalInfo = {
  name: 'Denis Januzi',
  birthday: 'May 15, 1989',
  location: 'Trier, Germany',
  languages: [
    { name: 'Albanian', level: 'Native' },
    { name: 'Croatian', level: 'Fluent' },
    { name: 'English', level: 'Fluent' },
    { name: 'German', level: 'Fluent' }
  ],
  primaryTech: [
    'HTML',
    'CSS',
    'JavaScript',
    'Vue.js',
    'TypeScript',
    'React',
    'Node.js',
    'PostgreSQL',
    'MongoDB',
    'Git',
    'Docker'
  ],
  hobbies: [
    'Web Development',
    'Learning new Technologies',
    'Traveling'
  ],
  availability: 'Available for remote projects outside working hours',
  email: 'denis@example.com' // Optional - set to null or empty string to hide
}

const fullTimeJob = {
  title: 'Postbote',
  company: 'DHL Deutsche Post',
  description: 'I work in mail and parcel delivery, where precision, reliability, and structure are part of everyday life. This role has strengthened my organizational skills, time management, and attention to detail. Outside working hours, I apply the same disciplined approach to personal web projects building simple, well-structured applications and continuously learning new technologies.'
}

</script>
