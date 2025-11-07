<template>
  <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ meta }">
    <div class="space-y-6">
      <Field name="applicant_name" v-slot="{ field, errors, errorMessage }">
        <div>
          <label
            for="applicant_name"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            اسم مقدم الطلب
          </label>
          <input
            id="applicant_name"
            v-bind="field"
            type="text"
            :class="[
              'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors',
              errors.length > 0
                ? 'border-red-500 dark:border-red-600'
                : 'border-gray-300 dark:border-gray-600',
              loading ? 'opacity-50 cursor-not-allowed' : '',
            ]"
            :disabled="loading"
          />
          <span
            v-if="errorMessage"
            class="mt-1 block text-sm text-red-600 dark:text-red-400"
          >
            {{ errorMessage }}
          </span>
        </div>
      </Field>

      <Field name="applicant_email" v-slot="{ field, errors, errorMessage }">
        <div>
          <label
            for="applicant_email"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            البريد الإلكتروني
          </label>
          <input
            id="applicant_email"
            v-bind="field"
            type="email"
            :class="[
              'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors',
              errors.length > 0
                ? 'border-red-500 dark:border-red-600'
                : 'border-gray-300 dark:border-gray-600',
              loading ? 'opacity-50 cursor-not-allowed' : '',
            ]"
            :disabled="loading"
          />
          <span
            v-if="errorMessage"
            class="mt-1 block text-sm text-red-600 dark:text-red-400"
          >
            {{ errorMessage }}
          </span>
        </div>
      </Field>

      <Field name="permit_type" v-slot="{ field, errors, errorMessage }">
        <div>
          <label
            for="permit_type"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            نوع التصريح
          </label>
          <input
            id="permit_type"
            v-bind="field"
            type="text"
            :class="[
              'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors',
              errors.length > 0
                ? 'border-red-500 dark:border-red-600'
                : 'border-gray-300 dark:border-gray-600',
              loading ? 'opacity-50 cursor-not-allowed' : '',
            ]"
            :disabled="loading"
          />
          <span
            v-if="errorMessage"
            class="mt-1 block text-sm text-red-600 dark:text-red-400"
          >
            {{ errorMessage }}
          </span>
        </div>
      </Field>

      <div
        v-if="error"
        class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 dark:bg-red-900 dark:border-red-700 dark:text-red-200"
      >
        {{ error }}
      </div>

      <div
        v-if="success"
        class="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-200"
      >
        تم إرسال الطلب بنجاح!
      </div>

      <button
        type="submit"
        :disabled="loading || !meta.valid"
        class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span v-if="loading">جاري الإرسال...</span>
        <span v-else>إرسال الطلب</span>
      </button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import { sleep } from '~/utils/sleep';

const emit = defineEmits<{
  success: [];
}>();

const loading = ref(false);
const error = ref<string | null>(null);
const success = ref(false);

// Validation schema
const schema = yup.object({
  applicant_name: yup
    .string()
    .required('اسم مقدم الطلب مطلوب')
    .min(2, 'يجب أن يكون الاسم على الأقل حرفين')
    .max(100, 'يجب ألا يتجاوز الاسم 100 حرف'),
  applicant_email: yup
    .string()
    .required('البريد الإلكتروني مطلوب')
    .email('يرجى إدخال بريد إلكتروني صحيح'),
  permit_type: yup
    .string()
    .required('نوع التصريح مطلوب')
    .min(2, 'يجب أن يكون نوع التصريح على الأقل حرفين')
    .max(200, 'يجب ألا يتجاوز نوع التصريح 200 حرف'),
});

const handleSubmit = async (values: any) => {
  error.value = null;
  success.value = false;
  loading.value = true;

  try {
    // Simulate request time (2-4 seconds)
    await sleep(2, 4);

    await $fetch('/api/permits', {
      method: 'POST',
      body: values,
    });

    success.value = true;
    emit('success');

    // Redirect after 2 seconds
    setTimeout(() => {
      navigateTo('/');
    }, 2000);
  } catch (err: any) {
    error.value =
      err.data?.message || 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.';
  } finally {
    loading.value = false;
  }
};
</script>
