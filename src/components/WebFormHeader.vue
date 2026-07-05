<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-dark-bg/95 backdrop-blur-sm shadow-lg">
    <nav class="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 safe-top">
      <div class="flex items-center justify-between">
        <RouterLink
          to="/"
          class="webform-back-link text-gray-400 hover:text-accent-blue transition-colors duration-300 font-medium inline-flex items-center gap-2 min-h-[44px]"
        >
          <i class="fas fa-arrow-left text-xs"></i>
          {{ $t('webform.backHome') }}
        </RouterLink>

        <LanguageSwitcher />
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import LanguageSwitcher from './LanguageSwitcher.vue'
</script>
