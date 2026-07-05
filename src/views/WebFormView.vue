<template>
  <div class="webform-page min-h-[100dvh] bg-dark-bg relative">
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div class="bg-gradient-orb bg-gradient-orb-1 opacity-[0.07]"></div>
      <div class="bg-gradient-orb bg-gradient-orb-2 opacity-[0.07]"></div>
    </div>

    <WebFormHeader />

    <main class="webform-main relative z-10">
      <!-- Success -->
      <div v-if="submitted" class="min-h-[calc(100dvh-4rem)] flex items-center justify-center px-4 py-12 sm:py-16">
        <div class="webform-success w-full max-w-md text-center">
          <div class="webform-success-icon mx-auto mb-6">
            <i class="fas fa-check text-green-400 text-2xl" aria-hidden="true"></i>
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-white mb-3">{{ $t('webform.success.title') }}</h2>
          <p class="text-gray-400 mb-8 leading-relaxed">{{ $t('webform.success.message') }}</p>
          <RouterLink
            to="/"
            class="btn-primary inline-flex items-center justify-center gap-2 bg-accent-blue hover:bg-accent-light text-white px-6 py-3 rounded-lg font-semibold"
          >
            <i class="fas fa-arrow-left text-sm" aria-hidden="true"></i>
            {{ $t('webform.backHome') }}
          </RouterLink>
        </div>
      </div>

      <!-- Form -->
      <template v-else>
        <div class="webform-shell webform-page-body">
            <header class="webform-intro">
              <h1 class="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
                {{ $t('webform.heroTitle') }}
              </h1>
              <p class="text-gray-400 text-sm sm:text-base leading-relaxed">
                {{ $t('webform.subtitle') }}
              </p>
            </header>

            <form id="webform" @submit.prevent="handleSubmit" class="webform-form">
              <!-- Contact -->
              <section class="webform-group" aria-labelledby="wf-section-contact">
                <header class="webform-group-head">
                  <div class="webform-group-head-text">
                    <h2 id="wf-section-contact" class="webform-group-title">{{ $t('webform.sections.contact') }}</h2>
                    <p class="webform-group-hint">{{ $t('webform.sectionHints.contact') }}</p>
                  </div>
                  <i class="fas fa-user webform-group-head-icon" aria-hidden="true"></i>
                </header>

                <div class="webform-fields">
                  <div class="webform-field-row">
                    <div class="webform-field">
                      <label for="wf-name" class="form-label">{{ $t('webform.fields.name') }} <span class="text-accent-blue">*</span></label>
                      <input id="wf-name" v-model="form.name" type="text" required autocomplete="name" class="form-input webform-input" />
                    </div>
                    <div class="webform-field">
                      <label for="wf-email" class="form-label">{{ $t('webform.fields.email') }} <span class="text-accent-blue">*</span></label>
                      <input id="wf-email" v-model="form.email" type="email" required autocomplete="email" inputmode="email" class="form-input webform-input" />
                    </div>
                  </div>
                  <div class="webform-field-row">
                    <div class="webform-field">
                      <label for="wf-phone" class="form-label">{{ $t('webform.fields.phone') }}</label>
                      <input id="wf-phone" v-model="form.phone" type="tel" autocomplete="tel" inputmode="tel" class="form-input webform-input" />
                    </div>
                    <div class="webform-field">
                      <label for="wf-company" class="form-label">{{ $t('webform.fields.company') }}</label>
                      <input id="wf-company" v-model="form.company" type="text" autocomplete="organization" class="form-input webform-input" />
                    </div>
                  </div>
                  <WebFormDynamicList
                    ref="socialLinksRef"
                    id-prefix="wf-social"
                    :label="$t('webform.fields.socialLinks')"
                    :add-label="$t('webform.fields.addSocialLink')"
                    :remove-label="$t('webform.fields.removeSocialLink')"
                    item-label-key="webform.fields.socialLinkLabel"
                    :placeholder="$t('webform.fields.socialLinkPlaceholder')"
                    input-type="url"
                    :max="5"
                  />
                </div>
              </section>

              <!-- Project -->
              <section class="webform-group" aria-labelledby="wf-section-project">
                <header class="webform-group-head">
                  <div class="webform-group-head-text">
                    <h2 id="wf-section-project" class="webform-group-title">{{ $t('webform.sections.project') }}</h2>
                    <p class="webform-group-hint">{{ $t('webform.sectionHints.project') }}</p>
                  </div>
                  <i class="fas fa-globe webform-group-head-icon" aria-hidden="true"></i>
                </header>

                <div class="webform-fields">
                  <div class="webform-field">
                    <label for="wf-type" class="form-label">{{ $t('webform.fields.websiteType') }} <span class="text-accent-blue">*</span></label>
                    <select
                      id="wf-type"
                      v-model="form.websiteType"
                      required
                      class="form-input webform-input webform-select"
                      :class="{ 'webform-select--placeholder': !form.websiteType }"
                    >
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
                      class="form-input webform-input webform-textarea"
                      :placeholder="$t('webform.fields.descriptionPlaceholder')"
                    />
                  </div>
                  <div class="webform-field">
                    <label for="wf-features" class="form-label">{{ $t('webform.fields.features') }}</label>
                    <textarea
                      id="wf-features"
                      v-model="form.features"
                      rows="3"
                      class="form-input webform-input webform-textarea"
                      :placeholder="$t('webform.fields.featuresPlaceholder')"
                    />
                  </div>
                  <WebFormDynamicList
                    ref="languagesRef"
                    id-prefix="wf-lang"
                    :label="$t('webform.fields.languages')"
                    :hint="$t('webform.fields.languagesHint')"
                    :add-label="$t('webform.fields.addLanguage')"
                    :remove-label="$t('webform.fields.removeLanguage')"
                    item-label-key="webform.fields.languageLabel"
                    :placeholder="$t('webform.fields.languagePlaceholder')"
                    :max="5"
                  />
                </div>
              </section>

              <!-- Design & Content -->
              <section class="webform-group" aria-labelledby="wf-section-brand">
                <header class="webform-group-head">
                  <div class="webform-group-head-text">
                    <h2 id="wf-section-brand" class="webform-group-title">{{ $t('webform.sections.brand') }}</h2>
                    <p class="webform-group-hint">{{ $t('webform.sectionHints.brand') }}</p>
                  </div>
                  <i class="fas fa-palette webform-group-head-icon" aria-hidden="true"></i>
                </header>

                <div class="webform-fields">
                  <WebFormDynamicList
                    ref="referencesRef"
                    id-prefix="wf-ref"
                    :label="$t('webform.fields.websiteReferences')"
                    :hint="$t('webform.fields.websiteReferencesHint')"
                    :add-label="$t('webform.fields.addWebsiteReference')"
                    :remove-label="$t('webform.fields.removeWebsiteReference')"
                    item-label-key="webform.fields.websiteReferenceLabel"
                    :placeholder="$t('webform.fields.websiteReferencePlaceholder')"
                    input-type="url"
                    :max="3"
                    required
                  />
                  <div class="webform-field">
                    <label for="wf-colors" class="form-label">{{ $t('webform.fields.colors') }}</label>
                    <p class="webform-field-hint">{{ $t('webform.fields.colorsHint') }}</p>
                    <textarea
                      id="wf-colors"
                      v-model="form.colorNotes"
                      rows="2"
                      class="form-input webform-input webform-textarea"
                      :placeholder="$t('webform.fields.colorsPlaceholder')"
                    />
                  </div>
                  <div class="webform-field">
                    <span class="form-label">{{ $t('webform.fields.assets') }}</span>
                    <p class="webform-field-hint">{{ $t('webform.fields.assetsHint') }}</p>
                    <div class="webform-field-row">
                      <div class="webform-field">
                        <label for="wf-has-logo" class="form-label">{{ $t('webform.fields.hasLogo') }}</label>
                        <select
                          id="wf-has-logo"
                          v-model="form.hasLogo"
                          class="form-input webform-input webform-select"
                          :class="{ 'webform-select--placeholder': !form.hasLogo }"
                        >
                          <option value="">{{ $t('webform.selectPlaceholder') }}</option>
                          <option v-for="option in assetAnswers" :key="option.value" :value="option.value">{{ option.label }}</option>
                        </select>
                      </div>
                      <div class="webform-field">
                        <label for="wf-has-photos" class="form-label">{{ $t('webform.fields.hasPhotos') }}</label>
                        <select
                          id="wf-has-photos"
                          v-model="form.hasPhotos"
                          class="form-input webform-input webform-select"
                          :class="{ 'webform-select--placeholder': !form.hasPhotos }"
                        >
                          <option value="">{{ $t('webform.selectPlaceholder') }}</option>
                          <option v-for="option in assetAnswers" :key="option.value" :value="option.value">{{ option.label }}</option>
                        </select>
                      </div>
                      <div class="webform-field">
                        <label for="wf-has-videos" class="form-label">{{ $t('webform.fields.hasVideos') }}</label>
                        <select
                          id="wf-has-videos"
                          v-model="form.hasVideos"
                          class="form-input webform-input webform-select"
                          :class="{ 'webform-select--placeholder': !form.hasVideos }"
                        >
                          <option value="">{{ $t('webform.selectPlaceholder') }}</option>
                          <option v-for="option in assetAnswers" :key="option.value" :value="option.value">{{ option.label }}</option>
                        </select>
                      </div>
                      <div class="webform-field">
                        <label for="wf-has-text" class="form-label">{{ $t('webform.fields.hasText') }}</label>
                        <select
                          id="wf-has-text"
                          v-model="form.hasText"
                          class="form-input webform-input webform-select"
                          :class="{ 'webform-select--placeholder': !form.hasText }"
                        >
                          <option value="">{{ $t('webform.selectPlaceholder') }}</option>
                          <option v-for="option in assetAnswers" :key="option.value" :value="option.value">{{ option.label }}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Domain & Hosting -->
              <section class="webform-group" aria-labelledby="wf-section-hosting">
                <header class="webform-group-head">
                  <div class="webform-group-head-text">
                    <h2 id="wf-section-hosting" class="webform-group-title">{{ $t('webform.sections.hosting') }}</h2>
                    <p class="webform-group-hint">{{ $t('webform.sectionHints.hosting') }}</p>
                  </div>
                  <i class="fas fa-server webform-group-head-icon" aria-hidden="true"></i>
                </header>

                <div class="webform-fields">
                  <div class="webform-field-row">
                    <div class="webform-field">
                      <label for="wf-has-domain" class="form-label">{{ $t('webform.fields.hasDomain') }}</label>
                      <select
                        id="wf-has-domain"
                        v-model="form.hasDomain"
                        class="form-input webform-input webform-select"
                        :class="{ 'webform-select--placeholder': !form.hasDomain }"
                      >
                        <option value="">{{ $t('webform.selectPlaceholder') }}</option>
                        <option v-for="option in yesNoAnswers" :key="option.value" :value="option.value">{{ option.label }}</option>
                      </select>
                      <div v-if="form.hasDomain === 'yes'" class="webform-field-nested">
                        <label for="wf-domain-name" class="webform-sub-label">{{ $t('webform.fields.domainName') }}</label>
                        <input
                          id="wf-domain-name"
                          v-model="form.domainName"
                          type="text"
                          inputmode="url"
                          autocomplete="off"
                          class="form-input webform-input"
                          :placeholder="$t('webform.fields.domainNamePlaceholder')"
                        />
                      </div>
                    </div>
                    <div class="webform-field">
                      <label for="wf-has-hosting" class="form-label">{{ $t('webform.fields.hasHosting') }}</label>
                      <select
                        id="wf-has-hosting"
                        v-model="form.hasHosting"
                        class="form-input webform-input webform-select"
                        :class="{ 'webform-select--placeholder': !form.hasHosting }"
                      >
                        <option value="">{{ $t('webform.selectPlaceholder') }}</option>
                        <option v-for="option in yesNoAnswers" :key="option.value" :value="option.value">{{ option.label }}</option>
                      </select>
                    </div>
                  </div>

                  <div v-if="form.hasDomain === 'no' || form.hasHosting === 'no'" class="webform-provider-box">
                    <p class="webform-provider-title">{{ $t('webform.namecheapProvider.title') }}</p>
                    <p class="webform-field-hint">{{ $t('webform.namecheapProvider.hint') }}</p>
                    <a
                      href="https://www.namecheap.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="webform-provider-link"
                    >
                      Namecheap
                      <i class="fas fa-external-link-alt text-[10px] ml-1 opacity-70" aria-hidden="true"></i>
                    </a>
                  </div>

                  <div class="webform-notice" role="note">
                    <i class="fas fa-info-circle webform-notice-icon" aria-hidden="true"></i>
                    <p class="webform-notice-text">{{ $t('webform.hostingNotice') }}</p>
                  </div>
                </div>
              </section>

              <!-- Budget & Timeline -->
              <section class="webform-group" aria-labelledby="wf-section-details">
                <header class="webform-group-head">
                  <div class="webform-group-head-text">
                    <h2 id="wf-section-details" class="webform-group-title">{{ $t('webform.sections.details') }}</h2>
                    <p class="webform-group-hint">{{ $t('webform.sectionHints.details') }}</p>
                  </div>
                  <i class="fas fa-calendar-alt webform-group-head-icon" aria-hidden="true"></i>
                </header>

                <div class="webform-fields">
                  <div class="webform-field-row">
                    <div class="webform-field">
                      <label for="wf-budget" class="form-label">{{ $t('webform.fields.budget') }}</label>
                      <select
                        id="wf-budget"
                        v-model="form.budget"
                        class="form-input webform-input webform-select"
                        :class="{ 'webform-select--placeholder': !form.budget }"
                      >
                        <option value="">{{ $t('webform.selectPlaceholder') }}</option>
                        <option v-for="b in budgets" :key="b.value" :value="b.value">{{ b.label }}</option>
                      </select>
                    </div>
                    <div class="webform-field">
                      <label for="wf-timeline" class="form-label">{{ $t('webform.fields.timeline') }}</label>
                      <select
                        id="wf-timeline"
                        v-model="form.timeline"
                        class="form-input webform-input webform-select"
                        :class="{ 'webform-select--placeholder': !form.timeline }"
                      >
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
                      class="form-input webform-input webform-textarea"
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

              <div class="webform-footer">
                <p v-if="errorMessage" class="webform-error" role="alert">
                  <i class="fas fa-exclamation-circle" aria-hidden="true"></i>
                  {{ errorMessage }}
                </p>

                <div class="webform-footer-actions">
                  <div class="webform-agree-wrap">
                    <div class="webform-notice webform-agree-notice" :class="{ 'webform-agree-notice--invalid': agreeError }">
                      <label class="webform-agree">
                        <input
                          v-model="agreed"
                          type="checkbox"
                          class="webform-agree-input"
                          :aria-invalid="agreeError ? 'true' : 'false'"
                        />
                        <span class="webform-agree-box" aria-hidden="true">
                          <i v-if="agreed" class="fas fa-check text-[10px]"></i>
                        </span>
                        <span class="webform-agree-content">
                          <span class="webform-agree-text">{{ $t('webform.agreeLabel') }}</span>
                          <span class="webform-agree-note">{{ $t('webform.agreeNotice') }}</span>
                        </span>
                      </label>
                    </div>

                    <p v-if="agreeError" class="webform-agree-error" role="alert">
                      {{ $t('webform.agreeRequired') }}
                    </p>
                  </div>

                  <button
                    type="submit"
                    :disabled="isSubmitting || !agreed"
                    class="webform-submit-btn btn-primary bg-accent-blue hover:bg-accent-light disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold inline-flex items-center justify-center gap-2"
                  >
                    <i v-if="isSubmitting" class="fas fa-spinner fa-spin" aria-hidden="true"></i>
                    <i v-else class="fas fa-paper-plane" aria-hidden="true"></i>
                    {{ isSubmitting ? $t('webform.submitting') : $t('webform.submit') }}
                  </button>
                </div>
              </div>
            </form>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import WebFormHeader from '../components/WebFormHeader.vue'
import WebFormDynamicList from '../components/WebFormDynamicList.vue'

const { t } = useI18n()

type DynamicListExpose = {
  getValues: () => string[]
  hasRequiredValue: () => boolean
}

const socialLinksRef = ref<DynamicListExpose | null>(null)
const languagesRef = ref<DynamicListExpose | null>(null)
const referencesRef = ref<DynamicListExpose | null>(null)

const form = ref({
  name: '',
  email: '',
  phone: '',
  company: '',
  websiteType: '',
  description: '',
  features: '',
  colorNotes: '',
  hasLogo: '',
  hasPhotos: '',
  hasVideos: '',
  hasText: '',
  hasDomain: '',
  hasHosting: '',
  domainName: '',
  budget: '',
  timeline: '',
  notes: '',
  _gotcha: '',
})

const isSubmitting = ref(false)
const submitted = ref(false)
const errorMessage = ref('')
const agreed = ref(false)
const agreeError = ref(false)

watch(agreed, (value) => {
  if (value) agreeError.value = false
})

watch(
  () => form.value.hasDomain,
  (value) => {
    if (value !== 'yes') form.value.domainName = ''
  },
)

const websiteTypes = computed(() => [
  { value: 'onePage', label: t('webform.websiteTypes.onePage') },
  { value: 'multiPage', label: t('webform.websiteTypes.multiPage') },
  { value: 'adminDashboard', label: t('webform.websiteTypes.adminDashboard') },
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

const assetAnswers = computed(() => [
  { value: 'yes', label: t('webform.assetAnswers.yes') },
  { value: 'no', label: t('webform.assetAnswers.no') },
  { value: 'partial', label: t('webform.assetAnswers.partial') },
])

const yesNoAnswers = computed(() => [
  { value: 'yes', label: t('webform.assetAnswers.yes') },
  { value: 'no', label: t('webform.assetAnswers.no') },
])

const handleSubmit = async () => {
  errorMessage.value = ''
  agreeError.value = false

  if (!agreed.value) {
    agreeError.value = true
    return
  }

  const referenceUrls = referencesRef.value?.getValues() ?? []
  if (!referenceUrls.length) {
    errorMessage.value = t('webform.websiteReferencesRequired')
    return
  }

  isSubmitting.value = true

  try {
    const response = await fetch('/api/webform', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form.value,
        websiteReferences: referenceUrls,
        languages: languagesRef.value?.getValues() ?? [],
        socialLinks: socialLinksRef.value?.getValues() ?? [],
      }),
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
