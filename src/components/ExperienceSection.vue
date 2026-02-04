<template>
  <section id="experience" class="py-20 px-6">
    <div class="container mx-auto max-w-6xl">
      <div class="text-center mb-12 fade-in-up">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          My <span class="text-accent-blue">Experience</span>
        </h2>
        <div class="w-20 h-1 bg-accent-blue mx-auto"></div>
        <p class="text-gray-400 mt-4 max-w-2xl mx-auto">
          A journey of growth, learning, and building impactful solutions
        </p>
      </div>

      <div class="space-y-8">
        <div 
          v-for="(exp, index) in experiences" 
          :key="index"
          class="bg-dark-secondary/50 rounded-lg p-6 md:p-8 border border-gray-800 hover:border-accent-blue/50 transition-all duration-300 fade-in-up"
        >
          <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div class="flex-1">
              <h3 class="text-xl md:text-2xl font-bold text-white mb-2">
                {{ exp.title }}
              </h3>
              <p class="text-accent-blue font-semibold mb-3">
                {{ exp.company }}
              </p>
              <p class="text-gray-400 mb-4">
                {{ exp.description }}
              </p>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tech in exp.technologies" 
                  :key="tech"
                  class="bg-dark-bg px-3 py-1 rounded text-sm text-gray-300"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
            <div class="text-gray-500 font-medium text-sm md:text-base md:whitespace-nowrap">
              {{ exp.period }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Experience {
  title: string
  company: string
  period: string
  description: string
  technologies: string[]
}

const experiences: Experience[] = [
  {
    title: 'Senior Full-Stack Developer',
    company: 'Tech Company',
    period: '2022 - Present',
    description: 'Leading development of scalable web applications, mentoring junior developers, and implementing best practices for code quality and performance.',
    technologies: ['Vue.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS']
  },
  {
    title: 'Full-Stack Developer',
    company: 'Startup Inc',
    period: '2020 - 2022',
    description: 'Developed and maintained multiple client projects, collaborated with cross-functional teams, and delivered high-quality solutions on time.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Docker']
  },
  {
    title: 'Frontend Developer',
    company: 'Digital Agency',
    period: '2018 - 2020',
    description: 'Created responsive and interactive user interfaces, optimized web performance, and ensured cross-browser compatibility.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Vue.js', 'SASS']
  }
]
</script>
