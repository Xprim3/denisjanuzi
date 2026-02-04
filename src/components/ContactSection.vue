<template>
    <section id="contact" class="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-dark-secondary/30 relative z-10 overflow-x-hidden">
      <div class="container mx-auto max-w-6xl">

      <div class="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
        <!-- Left Side - Text Content -->
        <div class="fade-in-up">
          <div class="bg-dark-secondary/50 rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-800">
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
        <div class="fade-in-up">
          <div class="bg-dark-secondary/50 rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10 border border-gray-800 space-y-6 sm:space-y-7 md:space-y-8">
            <!-- Email Contact -->
            <div>
              <p class="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 font-medium uppercase tracking-wider">{{ $t('contact.email') }}</p>
              <a 
                href="mailto:denisjanuzi@gmail.com"
                class="group flex items-center gap-4 p-4 bg-dark-bg/50 rounded-xl border border-gray-700 hover:border-accent-blue/50 transition-all duration-300"
              >
                <div class="w-12 h-12 bg-accent-blue/10 rounded-lg flex items-center justify-center group-hover:bg-accent-blue/20 transition-colors">
                  <i class="fas fa-envelope text-accent-blue text-xl"></i>
                </div>
                <div>
                  <p class="text-white font-semibold text-lg">denisjanuzi@gmail.com</p>
                  <p class="text-gray-400 text-sm">{{ $t('contact.sendEmail') }}</p>
                </div>
              </a>
            </div>

            <!-- Direct Messaging -->
            <div>
              <p class="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-5 font-medium uppercase tracking-wider">{{ $t('contact.directMessaging') }}</p>
              <div class="grid grid-cols-2 gap-3 sm:gap-4">
                <a 
                  href="https://wa.me/491636851928"
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
    </div>
  </section>
</template>

<script setup lang="ts">
// Contact section - no form needed, just email and social links
</script>
