<template>
    <section id="contact" class="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-dark-secondary/30 relative z-10 overflow-x-hidden">
      <div class="container mx-auto max-w-6xl">

      <div class="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
        <!-- Left Side - Text Content -->
        <div v-reveal>
          <div class="bg-dark-secondary/50 rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-800 hover-lift transition-colors duration-300 hover:border-accent-blue/30">
            <h3 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-5 sm:mb-6 md:mb-8">{{ $t('contact.letsConnect') }}</h3>
            <div class="space-y-4 sm:space-y-5 md:space-y-6 text-gray-300 leading-relaxed text-base sm:text-lg md:text-xl">
              <p>
                {{ $t('contact.description1') }}
              </p>
              <p>
                {{ $t('contact.description2') }}
              </p>
              <p>
                {{ $t('contact.description3') }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right Side - Contact Methods -->
        <div v-reveal="{ delay: 120 }">
          <div class="bg-dark-secondary/50 rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10 border border-gray-800 space-y-6 sm:space-y-7 md:space-y-8 hover-lift transition-colors duration-300 hover:border-accent-blue/30">
            <!-- Email Contact -->
            <div>
              <p class="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 font-medium uppercase tracking-wider">{{ $t('contact.email') }}</p>
              <a 
                href="mailto:denisjanuzi@gmail.com"
                class="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-dark-bg/50 rounded-xl border border-gray-700 hover:border-accent-blue/50 hover-lift transition-all duration-300"
              >
                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-accent-blue/10 rounded-lg flex items-center justify-center group-hover:bg-accent-blue/20 transition-colors flex-shrink-0">
                  <i class="fas fa-envelope text-accent-blue text-lg sm:text-xl"></i>
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-white font-semibold text-base sm:text-lg break-all">denisjanuzi@gmail.com</p>
                  <p class="text-gray-400 text-xs sm:text-sm">{{ $t('contact.sendEmail') }}</p>
                </div>
              </a>
            </div>

            <!-- Direct Messaging -->
            <div>
              <p class="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-5 font-medium uppercase tracking-wider">{{ $t('contact.directMessaging') }}</p>
              <div class="grid grid-cols-2 gap-3 sm:gap-4">
                <a 
                  href="https://wa.me/4915229502316"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  class="social-icon group flex flex-col items-center justify-center p-4 sm:p-5 md:p-6 bg-dark-bg/50 rounded-xl border border-gray-700 hover:border-accent-blue/50 transition-all duration-300 transform hover:scale-105 min-w-0"
                  data-color="#25D366"
                >
                  <i class="fab fa-whatsapp text-2xl sm:text-3xl text-gray-400 mb-2"></i>
                  <span class="text-gray-400 text-xs font-medium text-center">{{ $t('contact.whatsapp') }}</span>
                </a>
                <a 
                  href="https://m.me/denissjanuzi"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Messenger"
                  class="social-icon group flex flex-col items-center justify-center p-4 sm:p-5 md:p-6 bg-dark-bg/50 rounded-xl border border-gray-700 hover:border-accent-blue/50 transition-all duration-300 transform hover:scale-105 min-w-0"
                  data-color="#0084FF"
                >
                  <i class="fab fa-facebook-messenger text-2xl sm:text-3xl text-gray-400 mb-2"></i>
                  <span class="text-gray-400 text-xs font-medium text-center">{{ $t('contact.messenger') }}</span>
                </a>
              </div>
            </div>

            <!-- Social Media -->
            <div>
              <p class="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-5 font-medium uppercase tracking-wider">{{ $t('contact.socialMedia') }}</p>
              <div class="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=61582928535525"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  class="social-icon group flex flex-col items-center justify-center p-4 sm:p-5 md:p-6 bg-dark-bg/50 rounded-xl border border-gray-700 hover:border-accent-blue/50 transition-all duration-300 transform hover:scale-105 min-w-0"
                  data-color="#1877F2"
                >
                  <i class="fab fa-facebook-f text-2xl sm:text-3xl text-gray-400 mb-2"></i>
                  <span class="text-gray-400 text-xs font-medium text-center">{{ $t('contact.facebook') }}</span>
                </a>
                <a 
                  href="https://www.instagram.com/denissjanuzi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  class="social-icon group flex flex-col items-center justify-center p-4 sm:p-5 md:p-6 bg-dark-bg/50 rounded-xl border border-gray-700 hover:border-accent-blue/50 transition-all duration-300 transform hover:scale-105 min-w-0"
                  data-color="#E4405F"
                >
                  <i class="fab fa-instagram text-2xl sm:text-3xl text-gray-400 mb-2"></i>
                  <span class="text-gray-400 text-xs font-medium text-center">{{ $t('contact.instagram') }}</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/denisjanuzi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  class="social-icon group flex flex-col items-center justify-center p-4 sm:p-5 md:p-6 bg-dark-bg/50 rounded-xl border border-gray-700 hover:border-accent-blue/50 transition-all duration-300 transform hover:scale-105 min-w-0"
                  data-color="#0077B5"
                >
                  <i class="fab fa-linkedin-in text-2xl sm:text-3xl text-gray-400 mb-2"></i>
                  <span class="text-gray-400 text-xs font-medium text-center">{{ $t('contact.linkedin') }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Client form notice -->
      <div
        class="contact-client-notice relative overflow-hidden rounded-2xl border-2 border-accent-blue/50 bg-gradient-to-br from-accent-blue/20 via-dark-secondary/90 to-dark-secondary/70 p-5 sm:p-6 md:p-8 mt-8 sm:mt-10 md:mt-12 shadow-[0_0_40px_rgba(59,130,246,0.15)]"
        v-reveal="{ delay: 180 }"
      >
        <div class="absolute -top-10 -right-10 w-40 h-40 bg-accent-blue/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>
        <div class="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

        <div class="relative flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5 md:gap-6">
          <div class="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-accent-blue/25 border border-accent-blue/40 flex items-center justify-center shadow-lg shadow-accent-blue/20">
            <i class="fas fa-clipboard-list text-accent-light text-2xl sm:text-3xl" aria-hidden="true"></i>
          </div>

          <div class="flex-1 min-w-0">
            <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/20 border border-accent-blue/30 text-accent-light text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3">
              <i class="fas fa-info-circle text-[10px] sm:text-xs" aria-hidden="true"></i>
              {{ $t('contact.clientFormBadge') }}
            </span>
            <h3 class="text-xl sm:text-2xl md:text-[1.65rem] font-bold text-white mb-3 leading-tight">
              {{ $t('contact.clientFormTitle') }}
            </h3>
            <p class="text-gray-100 text-base sm:text-lg leading-relaxed">
              {{ $t('contact.clientFormNote') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
