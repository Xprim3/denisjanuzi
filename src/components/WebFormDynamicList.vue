<template>
  <div class="webform-field">
    <div class="webform-references-head">
      <label class="form-label webform-references-label">
        {{ label }}
        <span v-if="required" class="text-accent-blue">*</span>
      </label>
      <button
        v-if="rows.length < max"
        type="button"
        class="webform-reference-add"
        @click="addRow"
      >
        {{ addLabel }}
      </button>
    </div>
    <p v-if="hint" class="webform-field-hint">{{ hint }}</p>

    <div class="webform-references space-y-3">
      <div
        v-for="(row, index) in rows"
        :key="row.id"
        class="webform-reference-row"
      >
        <label :for="`${idPrefix}-${row.id}`" class="sr-only">
          {{ t(itemLabelKey, { number: index + 1 }) }}
        </label>
        <input
          :id="`${idPrefix}-${row.id}`"
          v-model="row.value"
          :type="inputType"
          :inputmode="inputType === 'url' ? 'url' : undefined"
          :required="required && index === 0"
          class="form-input webform-input"
          :placeholder="placeholder"
        />
        <button
          v-if="rows.length > 1"
          type="button"
          class="webform-reference-remove"
          :aria-label="removeLabel"
          @click="removeRow(row.id)"
        >
          <i class="fas fa-times" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

type Row = { id: number; value: string }

const props = withDefaults(
  defineProps<{
    label: string
    addLabel: string
    removeLabel: string
    itemLabelKey: string
    idPrefix: string
    placeholder?: string
    hint?: string
    max?: number
    inputType?: 'text' | 'url'
    required?: boolean
  }>(),
  {
    max: 5,
    inputType: 'text',
    required: false,
    placeholder: '',
    hint: '',
  },
)

let nextId = 1
const rows = ref<Row[]>([{ id: nextId++, value: '' }])

const addRow = () => {
  if (rows.value.length >= props.max) return
  rows.value.push({ id: nextId++, value: '' })
}

const removeRow = (id: number) => {
  if (rows.value.length <= 1) return
  rows.value = rows.value.filter((row) => row.id !== id)
}

const getValues = () => rows.value.map((row) => row.value.trim()).filter(Boolean)

const hasRequiredValue = () => rows.value.some((row) => row.value.trim().length > 0)

defineExpose({ getValues, hasRequiredValue })
</script>
