<template>
    <section id="contact" class="py-20 px-6 bg-dark-secondary/30 relative z-10">
      <div class="container mx-auto max-w-6xl">

      <div class="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
        <!-- Left Side - Text Content -->
        <div class="fade-in-up">
          <div class="bg-dark-secondary/50 rounded-2xl p-8 lg:p-10 border border-gray-800">
            <h3 class="text-3xl font-bold text-white mb-6">Let's Connect</h3>
            <div class="space-y-5 text-gray-300 leading-relaxed text-lg">
              <p>
                I take on a limited number of web projects independently and outside working hours. I'm always open to thoughtful conversations around ideas, personal projects, or simple web solutions that benefit from a clear and practical approach.
              </p>
              <p>
                If you need a simple, well-built website for your business or have a small web project in mind, I'm happy to explore whether working together makes sense.
              </p>
              <p>
                Based in Trier, Germany, I collaborate remotely when time allows. Feel free to reach out via email or connect with me on social media.
              </p>
            </div>
          </div>
        </div>

        <!-- Right Side - Contact Methods -->
        <div class="fade-in-up">
          <div class="bg-dark-secondary/50 rounded-2xl p-8 lg:p-10 border border-gray-800 space-y-8">
            <!-- Email Contact -->
            <div>
              <p class="text-gray-400 text-sm mb-4 font-medium uppercase tracking-wider">Email</p>
              <a 
                href="mailto:denisjanuzi@gmail.com"
                class="group flex items-center gap-4 p-4 bg-dark-bg/50 rounded-xl border border-gray-700 hover:border-accent-blue/50 transition-all duration-300"
              >
                <div class="w-12 h-12 bg-accent-blue/10 rounded-lg flex items-center justify-center group-hover:bg-accent-blue/20 transition-colors">
                  <i class="fas fa-envelope text-accent-blue text-xl"></i>
                </div>
                <div>
                  <p class="text-white font-semibold text-lg">denisjanuzi@gmail.com</p>
                  <p class="text-gray-400 text-sm">Send me an email</p>
                </div>
              </a>
            </div>

            <!-- Direct Messaging -->
            <div>
              <p class="text-gray-400 text-sm mb-5 font-medium uppercase tracking-wider">Direct Messaging</p>
              <div class="grid grid-cols-2 gap-4">
                <a 
                  href="https://wa.me/491636851928"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  class="social-icon group flex flex-col items-center justify-center p-6 bg-dark-bg/50 rounded-xl border border-gray-700 hover:border-accent-blue/50 transition-all duration-300 transform hover:scale-105"
                  data-color="#25D366"
                >
                  <i class="fab fa-whatsapp text-3xl text-gray-400 mb-2"></i>
                  <span class="text-gray-400 text-xs font-medium">WhatsApp</span>
                </a>
                <a 
                  href="https://m.me/denissjanuzi"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Messenger"
                  class="social-icon group flex flex-col items-center justify-center p-6 bg-dark-bg/50 rounded-xl border border-gray-700 hover:border-accent-blue/50 transition-all duration-300 transform hover:scale-105"
                  data-color="#0084FF"
                >
                  <i class="fab fa-facebook-messenger text-3xl text-gray-400 mb-2"></i>
                  <span class="text-gray-400 text-xs font-medium">Messenger</span>
                </a>
              </div>
            </div>

            <!-- Social Media -->
            <div>
              <p class="text-gray-400 text-sm mb-5 font-medium uppercase tracking-wider">Social Media</p>
              <div class="grid grid-cols-3 gap-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=61582928535525"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  class="social-icon group flex flex-col items-center justify-center p-6 bg-dark-bg/50 rounded-xl border border-gray-700 hover:border-accent-blue/50 transition-all duration-300 transform hover:scale-105"
                  data-color="#1877F2"
                >
                  <i class="fab fa-facebook-f text-3xl text-gray-400 mb-2"></i>
                  <span class="text-gray-400 text-xs font-medium">Facebook</span>
                </a>
                <a 
                  href="https://www.instagram.com/denissjanuzi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  class="social-icon group flex flex-col items-center justify-center p-6 bg-dark-bg/50 rounded-xl border border-gray-700 hover:border-accent-blue/50 transition-all duration-300 transform hover:scale-105"
                  data-color="#E4405F"
                >
                  <i class="fab fa-instagram text-3xl text-gray-400 mb-2"></i>
                  <span class="text-gray-400 text-xs font-medium">Instagram</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/denisjanuzi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  class="social-icon group flex flex-col items-center justify-center p-6 bg-dark-bg/50 rounded-xl border border-gray-700 hover:border-accent-blue/50 transition-all duration-300 transform hover:scale-105"
                  data-color="#0077B5"
                >
                  <i class="fab fa-linkedin-in text-3xl text-gray-400 mb-2"></i>
                  <span class="text-gray-400 text-xs font-medium">LinkedIn</span>
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
