<template>
  <section id="home" class="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
    <!-- Floating Code Particles Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      <div 
        v-for="(snippet, i) in floatingSnippets" 
        :key="i"
        class="absolute font-mono text-accent-blue text-xs"
        :style="snippet.style"
      >
        {{ snippet.text }}
      </div>
    </div>
    
    <div class="container mx-auto max-w-6xl relative z-10">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Left Content -->
        <div class="space-y-6 fade-in-up">
          <!-- Headline -->
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Building clear, practical 
            <span class="text-accent-blue">web experiences</span>.
          </h1>

          <!-- Description -->
          <p class="text-gray-300 text-lg md:text-xl leading-relaxed">
            Focused on well-structured websites and web applications designed with simplicity, performance, and usability in mind.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              @click="smoothScroll('projects')"
              class="bg-accent-blue hover:bg-accent-light text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              View Projects
            </button>
            <button
              @click="smoothScroll('about')"
              class="bg-transparent border-2 border-gray-600 hover:border-accent-blue text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              About Me
            </button>
          </div>
        </div>

        <!-- Right Visual - Modern Code Editor -->
        <div class="relative fade-in-up">
          <!-- VS Code Style Editor -->
          <div class="relative">
            <div class="bg-dark-secondary rounded-lg shadow-2xl border border-gray-800 overflow-hidden">
              <!-- Editor Header/Tabs -->
              <div class="bg-gray-900 border-b border-gray-800 px-4 py-2 flex items-center gap-2">
                <div class="flex gap-1.5">
                  <div class="w-3 h-3 rounded-full bg-red-500"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div class="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div class="flex-1 flex items-center gap-2 ml-4">
                  <div class="flex items-center gap-2 px-3 py-1 bg-dark-secondary rounded-t border-t border-x border-gray-700">
                    <svg class="w-4 h-4 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span class="text-gray-300 text-xs font-medium">portfolio.tsx</span>
                  </div>
                </div>
              </div>

              <!-- Code Editor Body -->
              <div class="bg-gray-950 p-4">
                <!-- Line Numbers & Code -->
                <div class="flex font-mono text-sm">
                  <div class="text-gray-600 pr-4 text-right select-none">
                    <div v-for="i in 12" :key="i" class="leading-6">{{ i }}</div>
                  </div>
                  <div class="flex-1 text-gray-100">
                    <div class="space-y-0 leading-6">
                      <div><span class="text-purple-400">import</span> <span class="text-yellow-400">{</span> <span class="text-accent-light">Developer</span> <span class="text-yellow-400">}</span> <span class="text-purple-400">from</span> <span class="text-green-400">'./skills'</span>;</div>
                      <div class="opacity-0">.</div>
                      <div><span class="text-purple-400">const</span> <span class="text-accent-light">denis</span>: <span class="text-accent-blue">Developer</span> <span class="text-white">=</span> <span class="text-yellow-400">{</span></div>
                      <div class="ml-4"><span class="text-gray-400">name:</span> <span class="text-green-400">'Denis Januzi'</span><span class="text-white">,</span></div>
                      <div class="ml-4"><span class="text-gray-400">role:</span> <span class="text-green-400">'Full-Stack Developer'</span><span class="text-white">,</span></div>
                      <div class="ml-4"><span class="text-gray-400">skills:</span> <span class="text-yellow-400">[</span></div>
                      <div class="ml-8"><span class="text-green-400">'Vue.js'</span><span class="text-white">,</span> <span class="text-green-400">'TypeScript'</span><span class="text-white">,</span></div>
                      <div class="ml-8"><span class="text-green-400">'Node.js'</span><span class="text-white">,</span> <span class="text-green-400">'PostgreSQL'</span></div>
                      <div class="ml-4"><span class="text-yellow-400">]</span><span class="text-white">,</span></div>
                      <div class="ml-4"><span class="text-gray-400">passion:</span> <span class="text-green-400">'Building amazing products'</span></div>
                      <div><span class="text-yellow-400">}</span><span class="text-white">;</span></div>
                      <div class="opacity-0">.</div>
                      <div><span class="text-purple-400">export</span> <span class="text-purple-400">default</span> <span class="text-accent-light">denis</span>;</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Status Bar -->
              <div class="bg-accent-blue/10 border-t border-gray-800 px-4 py-1.5 flex items-center justify-between text-xs">
                <div class="flex items-center gap-4 text-gray-400">
                  <span>TypeScript</span>
                  <span>UTF-8</span>
                  <span>LF</span>
                </div>
                <div class="flex items-center gap-4 text-gray-400">
                  <span>Ln 11, Col 25</span>
                  <span class="text-green-400">●</span>
                </div>
              </div>
            </div>
            <!-- Glow Effect -->
            <div class="absolute -inset-4 bg-accent-blue/20 blur-2xl rounded-lg -z-10"></div>
          </div>

          <!-- Terminal Window -->
          <div class="mt-4 bg-dark-secondary rounded-lg border border-gray-800 overflow-hidden">
            <div class="bg-gray-900 border-b border-gray-800 px-4 py-2 flex items-center gap-2">
              <div class="flex gap-1.5">
                <div class="w-3 h-3 rounded-full bg-gray-700"></div>
                <div class="w-3 h-3 rounded-full bg-gray-700"></div>
                <div class="w-3 h-3 rounded-full bg-gray-700"></div>
              </div>
              <span class="text-gray-500 text-xs ml-4">Terminal</span>
            </div>
            <div class="bg-black p-4 font-mono text-sm">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="text-green-400">$</span>
                  <span class="text-gray-300">npm run dev</span>
                </div>
                <div class="text-gray-500 ml-6">
                  <span class="inline-block animate-pulse">▋</span> Vite server running at http://localhost:5173
                </div>
                <div class="text-gray-500 ml-6">
                  <span class="inline-block animate-pulse">▋</span> Building for production...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

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

// Floating code particles
const codeSnippets = [
  'const', 'function', 'async', 'await', 'import', 'export',
  'interface', 'type', 'class', 'return', 'if', 'else',
  '=>', '{}', '[]', '()', '&&', '||', '===', '!=='
]

const floatingSnippets = ref(
  Array.from({ length: 20 }, () => ({
    text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${10 + Math.random() * 10}s`
    }
  }))
)

// Animated cursor effect
onMounted(() => {
  // Add blinking cursor animation
  const style = document.createElement('style')
  style.textContent = `
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }
    .animate-pulse {
      animation: blink 1s infinite;
    }
    [style*="animationDelay"] {
      animation: float linear infinite;
    }
  `
  document.head.appendChild(style)
})
</script>
