import type { Directive, DirectiveBinding } from 'vue'

type RevealOptions = {
  delay?: number
  threshold?: number
  once?: boolean
}

const observers = new WeakMap<Element, IntersectionObserver>()

function parseBinding(binding: DirectiveBinding): RevealOptions {
  const value = binding.value
  if (typeof value === 'number') {
    return { delay: value }
  }
  if (typeof value === 'object' && value !== null) {
    return value as RevealOptions
  }
  return {}
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const vReveal: Directive<HTMLElement, number | RevealOptions | undefined> = {
  mounted(el, binding) {
    const { delay = 0, threshold = 0.12, once = true } = parseBinding(binding)

    const variant = binding.arg ?? 'up'
    el.classList.add('reveal', `reveal-${variant}`)

    if (delay > 0) {
      el.style.setProperty('--reveal-delay', `${delay}ms`)
    }

    if (prefersReducedMotion()) {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            if (once) {
              observer.unobserve(el)
              observers.delete(el)
            }
          } else if (!once) {
            el.classList.remove('is-visible')
          }
        })
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )

    observers.set(el, observer)
    observer.observe(el)
  },

  unmounted(el) {
    const observer = observers.get(el)
    observer?.disconnect()
    observers.delete(el)
  },
}
