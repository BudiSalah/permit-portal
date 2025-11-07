<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label
        for="applicant_name"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        اسم مقدم الطلب
      </label>
      <input
        id="applicant_name"
        v-model="form.applicant_name"
        type="text"
        required
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        :disabled="loading"
      />
    </div>

    <div>
      <label
        for="applicant_email"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        البريد الإلكتروني
      </label>
      <input
        id="applicant_email"
        v-model="form.applicant_email"
        type="email"
        required
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        :disabled="loading"
      />
    </div>

    <div>
      <label
        for="permit_type"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        نوع التصريح
      </label>
      <input
        id="permit_type"
        v-model="form.permit_type"
        type="text"
        required
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        :disabled="loading"
      />
    </div>

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
      :disabled="loading"
      class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <span v-if="loading">جاري الإرسال...</span>
      <span v-else>إرسال الطلب</span>
    </button>
  </form>
</template>

<script setup lang="ts">
interface FormData {
  applicant_name: string;
  applicant_email: string;
  permit_type: string;
}

const form = reactive<FormData>({
  applicant_name: '',
  applicant_email: '',
  permit_type: '',
});

const loading = ref(false);
const error = ref<string | null>(null);
const success = ref(false);

const emit = defineEmits<{
  success: [];
}>();

const handleSubmit = async () => {
  error.value = null;
  success.value = false;
  loading.value = true;

  try {
    await $fetch('/api/permits', {
      method: 'POST',
      body: form,
    });

    success.value = true;
    form.applicant_name = '';
    form.applicant_email = '';
    form.permit_type = '';

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
