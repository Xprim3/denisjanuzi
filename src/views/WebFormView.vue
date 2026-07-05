<template>
  <div class="webform-page min-h-[100dvh] bg-dark-bg relative flex flex-col">
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div class="bg-gradient-orb bg-gradient-orb-1 opacity-10"></div>
      <div class="bg-gradient-orb bg-gradient-orb-2 opacity-10"></div>
      <div class="grid-pattern opacity-30"></div>
    </div>

    <WebFormHeader />

    <main class="webform-main relative z-10 flex-1 flex flex-col min-h-0">
      <!-- Success -->
      <div v-if="submitted" class="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div class="webform-success-card w-full max-w-md text-center p-8 sm:p-10">
          <div class="webform-success-icon mx-auto mb-6">
            <i class="fas fa-check text-green-400 text-2xl"></i>
          </div>
          <h2 class="text-2xl font-bold text-white mb-3">{{ $t('webform.success.title') }}</h2>
          <p class="text-gray-400 mb-8 leading-relaxed">{{ $t('webform.success.message') }}</p>
          <RouterLink
            to="/"
            class="btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-accent-blue hover:bg-accent-light text-white px-6 py-3.5 rounded-xl font-semibold"
          >
            <i class="fas fa-arrow-left text-sm"></i>
            {{ $t('webform.backHome') }}
          </RouterLink>
        </div>
      </div>

      <!-- Form -->
      <template v-else>
        <!-- Scrollable content -->
        <div class="flex-1 overflow-y-auto overscroll-contain">
          <div class="webform-hero px-4 sm:px-6 pt-[calc(4.5rem+env(safe-area-inset-top))] sm:pt-28 pb-5 sm:pb-8">
            <div class="container mx-auto max-w-2xl">
              <span class="webform-badge">{{ $t('webform.title') }}</span>
              <h1 class="text-2xl sm:text-4xl font-bold text-white mt-3 mb-2 leading-tight">
                {{ $t('webform.heroTitle') }}
              </h1>
              <p class="text-gray-400 text-sm sm:text-base leading-relaxed">
                {{ $t('webform.subtitle') }}
              </p>
            </div>
          </div>

          <form
            id="webform"
            @submit.prevent="handleSubmit"
            class="container mx-auto max-w-2xl px-4 sm:px-6 pb-4 sm:pb-8 space-y-4 sm:space-y-5"
          >
            <!-- Section 1: Contact -->
            <section class="webform-section" aria-labelledby="section-contact">
              <div class="webform-section-header">
                <span class="webform-section-step" aria-hidden="true">1</span>
                <div>
                  <h2 id="section-contact" class="webform-section-title">{{ $t('webform.sections.contact') }}</h2>
                  <p class="webform-section-desc">{{ $t('webform.sectionHints.contact') }}</p>
                </div>
              </div>
              <div class="webform-section-body space-y-4">
                <div class="webform-field">
                  <label for="wf-name" class="form-label">{{ $t('webform.fields.name') }} <span class="text-accent-blue">*</span></label>
                  <input id="wf-name" v-model="form.name" type="text" required autocomplete="name" class="form-input webform-input" />
                </div>
                <div class="webform-field">
                  <label for="wf-email" class="form-label">{{ $t('webform.fields.email') }} <span class="text-accent-blue">*</span></label>
                  <input id="wf-email" v-model="form.email" type="email" required autocomplete="email" inputmode="email" class="form-input webform-input" />
                </div>
                <div class="grid sm:grid-cols-2 gap-4">
                  <div class="webform-field">
                    <label for="wf-phone" class="form-label">{{ $t('webform.fields.phone') }}</label>
                    <input id="wf-phone" v-model="form.phone" type="tel" autocomplete="tel" inputmode="tel" class="form-input webform-input" />
                  </div>
                  <div class="webform-field">
                    <label for="wf-company" class="form-label">{{ $t('webform.fields.company') }}</label>
                    <input id="wf-company" v-model="form.company" type="text" autocomplete="organization" class="form-input webform-input" />
                  </div>
                </div>
              </div>
            </section>

            <!-- Section 2: Project -->
            <section class="webform-section" aria-labelledby="section-project">
              <div class="webform-section-header">
                <span class="webform-section-step" aria-hidden="true">2</span>
                <div>
                  <h2 id="section-project" class="webform-section-title">{{ $t('webform.sections.project') }}</h2>
                  <p class="webform-section-desc">{{ $t('webform.sectionHints.project') }}</p>
                </div>
              </div>
              <div class="webform-section-body space-y-4">
                <div class="webform-field">
                  <label for="wf-type" class="form-label">{{ $t('webform.fields.websiteType') }} <span class="text-accent-blue">*</span></label>
                  <select id="wf-type" v-model="form.websiteType" required class="form-input webform-input webform-select">
                    <option value="" disabled>{{ $t('webform.selectPlaceholder') }}</option>
                    <option v-for="type in websiteTypes" :key="type.value" :value="type.value">{{ type.label }}</option>
                  </select>
                </div>
                <div class="webform-field">
                  <label for="wf-desc" class="form-label">{{ $t('webform.fields.description') }} <span class="text-accent-blue">*</span></label>
                  <textarea
                    id="wf-desc"
                    v-model="form.description"
                    required
                    rows="4"
                    class="form-input webform-input resize-none min-h-[120px]"
                    :placeholder="$t('webform.fields.descriptionPlaceholder')"
                  />
                </div>
                <div class="webform-field">
                  <label for="wf-features" class="form-label">{{ $t('webform.fields.features') }}</label>
                  <textarea
                    id="wf-features"
                    v-model="form.features"
                    rows="3"
                    class="form-input webform-input resize-none min-h-[88px]"
                    :placeholder="$t('webform.fields.featuresPlaceholder')"
                  />
                </div>
                <div class="webform-field">
                  <label for="wf-existing" class="form-label">{{ $t('webform.fields.existingWebsite') }}</label>
                  <input id="wf-existing" v-model="form.existingWebsite" type="url" inputmode="url" class="form-input webform-input" placeholder="https://" />
                </div>
              </div>
            </section>

            <!-- Section 3: Details -->
            <section class="webform-section" aria-labelledby="section-details">
              <div class="webform-section-header">
                <span class="webform-section-step" aria-hidden="true">3</span>
                <div>
                  <h2 id="section-details" class="webform-section-title">{{ $t('webform.sections.details') }}</h2>
                  <p class="webform-section-desc">{{ $t('webform.sectionHints.details') }}</p>
                </div>
              </div>
              <div class="webform-section-body space-y-4">
                <div class="grid sm:grid-cols-2 gap-4">
                  <div class="webform-field">
                    <label for="wf-budget" class="form-label">{{ $t('webform.fields.budget') }}</label>
                    <select id="wf-budget" v-model="form.budget" class="form-input webform-input webform-select">
                      <option value="">{{ $t('webform.selectPlaceholder') }}</option>
                      <option v-for="b in budgets" :key="b.value" :value="b.value">{{ b.label }}</option>
                    </select>
                  </div>
                  <div class="webform-field">
                    <label for="wf-timeline" class="form-label">{{ $t('webform.fields.timeline') }}</label>
                    <select id="wf-timeline" v-model="form.timeline" class="form-input webform-input webform-select">
                      <option value="">{{ $t('webform.selectPlaceholder') }}</option>
                      <option v-for="tl in timelines" :key="tl.value" :value="tl.value">{{ tl.label }}</option>
                    </select>
                  </div>
                </div>
                <div class="webform-field">
                  <label for="wf-notes" class="form-label">{{ $t('webform.fields.notes') }}</label>
                  <textarea
                    id="wf-notes"
                    v-model="form.notes"
                    rows="3"
                    class="form-input webform-input resize-none min-h-[88px]"
                    :placeholder="$t('webform.fields.notesPlaceholder')"
                  />
                </div>
              </div>
            </section>

            <input
              v-model="form._gotcha"
              type="text"
              name="_gotcha"
              tabindex="-1"
              autocomplete="off"
              class="sr-only"
              aria-hidden="true"
            />

            <!-- Desktop submit (inline) -->
            <div class="hidden sm:block pt-2">
              <p v-if="errorMessage" class="webform-error mb-4">
                <i class="fas fa-exclamation-circle"></i>
                {{ errorMessage }}
              </p>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="webform-submit-btn btn-primary bg-accent-blue hover:bg-accent-light disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold flex items-center justify-center gap-2"
              >
                <i v-if="isSubmitting" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-paper-plane"></i>
                {{ isSubmitting ? $t('webform.submitting') : $t('webform.submit') }}
              </button>
              <p class="text-gray-500 text-xs leading-relaxed mt-4">{{ $t('webform.privacyNote') }}</p>
            </div>

            <!-- Spacer for mobile sticky footer -->
            <div class="h-28 sm:hidden" aria-hidden="true"></div>
          </form>
        </div>

        <!-- Mobile sticky footer -->
        <div class="webform-mobile-footer sm:hidden safe-bottom">
          <p v-if="errorMessage" class="webform-error mb-3">
            <i class="fas fa-exclamation-circle"></i>
            {{ errorMessage }}
          </p>
          <button
            type="submit"
            form="webform"
            :disabled="isSubmitting"
            class="webform-submit-btn btn-primary w-full bg-accent-blue hover:bg-accent-light disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold flex items-center justify-center gap-2"
          >
            <i v-if="isSubmitting" class="fas fa-spinner fa-spin"></i>
            <i v-else class="fas fa-paper-plane"></i>
            {{ isSubmitting ? $t('webform.submitting') : $t('webform.submit') }}
          </button>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import WebFormHeader from '../components/WebFormHeader.vue'

const { t } = useI18n()

const form = ref({
  name: '',
  email: '',
  phone: '',
  company: '',
  websiteType: '',
  description: '',
  features: '',
  existingWebsite: '',
  budget: '',
  timeline: '',
  notes: '',
  _gotcha: '',
})

const isSubmitting = ref(false)
const submitted = ref(false)
const errorMessage = ref('')

const websiteTypes = computed(() => [
  { value: 'business', label: t('webform.websiteTypes.business') },
  { value: 'restaurant', label: t('webform.websiteTypes.restaurant') },
  { value: 'showroom', label: t('webform.websiteTypes.showroom') },
  { value: 'portfolio', label: t('webform.websiteTypes.portfolio') },
  { value: 'landing', label: t('webform.websiteTypes.landing') },
  { value: 'ecommerce', label: t('webform.websiteTypes.ecommerce') },
  { value: 'other', label: t('webform.websiteTypes.other') },
])

const budgets = computed(() => [
  { value: 'under500', label: t('webform.budgets.under500') },
  { value: '500-1000', label: t('webform.budgets.500to1000') },
  { value: '1000-2500', label: t('webform.budgets.1000to2500') },
  { value: '2500plus', label: t('webform.budgets.2500plus') },
  { value: 'discuss', label: t('webform.budgets.discuss') },
])

const timelines = computed(() => [
  { value: 'asap', label: t('webform.timelines.asap') },
  { value: '1month', label: t('webform.timelines.1month') },
  { value: '2-3months', label: t('webform.timelines.2to3months') },
  { value: 'flexible', label: t('webform.timelines.flexible') },
])

const handleSubmit = async () => {
  errorMessage.value = ''
  isSubmitting.value = true

  try {
    const response = await fetch('/api/webform', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(data.error || t('webform.error'))
    }

    submitted.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : t('webform.error')
  } finally {
    isSubmitting.value = false
  }
}
</script>
