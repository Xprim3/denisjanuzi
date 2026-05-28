import { ref, onMounted, onUnmounted } from 'vue'

const sectionIds = ['home', 'about', 'projects', 'contact'] as const

export type SectionId = (typeof sectionIds)[number]

export function useActiveSection() {
  const activeSection = ref<SectionId>('home')

  const updateActiveSection = () => {
    const scrollY = window.scrollY + 120

    let current: SectionId = 'home'
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el && el.offsetTop <= scrollY) {
        current = id
      }
    }
    activeSection.value = current
  }

  onMounted(() => {
    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateActiveSection)
  })

  return { activeSection, sectionIds }
}
