<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <div class="mb-6">
        <NuxtLink
          to="/"
          class="text-blue-600 hover:text-blue-700 dark:text-blue-400 inline-flex items-center mb-4"
        >
          ← العودة إلى القائمة الرئيسية
        </NuxtLink>
      </div>

      <div v-if="pending" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        ></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">جاري التحميل...</p>
      </div>

      <div
        v-else-if="error"
        class="p-6 bg-red-50 border border-red-200 rounded-lg text-red-700 dark:bg-red-900 dark:border-red-700 dark:text-red-200"
      >
        <p class="font-medium">حدث خطأ أثناء تحميل البيانات</p>
        <p class="text-sm mt-2">{{ error.message }}</p>
      </div>

      <div v-else-if="permit" class="space-y-6">
        <!-- Permit Details Card -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {{ permit.permit_type }}
              </h1>
              <p class="text-gray-600 dark:text-gray-400">
                رقم الطلب: #{{ permit.id }}
              </p>
            </div>
            <StatusBadge :status="permit.application_status" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                اسم مقدم الطلب
              </label>
              <p class="text-gray-900 dark:text-gray-100">
                {{ permit.applicant_name }}
              </p>
            </div>

            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                البريد الإلكتروني
              </label>
              <p class="text-gray-900 dark:text-gray-100">
                {{ permit.applicant_email }}
              </p>
            </div>

            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                نوع التصريح
              </label>
              <p class="text-gray-900 dark:text-gray-100">
                {{ permit.permit_type }}
              </p>
            </div>

            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                تاريخ التقديم
              </label>
              <p class="text-gray-900 dark:text-gray-100">
                {{ formatDate(permit.submitted_at) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Update Status Section -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            تحديث حالة الطلب
          </h2>

          <Form
            :key="permit?.id"
            @submit="handleStatusUpdate"
            :validation-schema="statusSchema"
            :initial-values="{
              application_status: permit?.application_status || 'Pending',
            }"
            v-slot="{ meta }"
            class="space-y-4"
          >
            <Field
              name="application_status"
              v-slot="{ field, errors, errorMessage }"
            >
              <div>
                <label
                  for="status"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  الحالة الحالية
                </label>
                <select
                  id="status"
                  v-bind="field"
                  :class="[
                    'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors',
                    errors.length > 0
                      ? 'border-red-500 dark:border-red-600'
                      : 'border-gray-300 dark:border-gray-600',
                    updating ? 'opacity-50 cursor-not-allowed' : '',
                  ]"
                  :disabled="updating"
                >
                  <option value="Pending">قيد الانتظار</option>
                  <option value="Approved">موافق عليه</option>
                  <option value="Rejected">مرفوض</option>
                </select>
                <span
                  v-if="errorMessage"
                  class="mt-1 block text-sm text-red-600 dark:text-red-400"
                >
                  {{ errorMessage }}
                </span>
              </div>
            </Field>

            <div
              v-if="updateError"
              class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 dark:bg-red-900 dark:border-red-700 dark:text-red-200"
            >
              {{ updateError }}
            </div>

            <div
              v-if="updateSuccess"
              class="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-200"
            >
              تم تحديث الحالة بنجاح!
            </div>

            <button
              type="submit"
              :disabled="updating || !meta.valid"
              class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="updating">جاري التحديث...</span>
              <span v-else>تحديث الحالة</span>
            </button>
          </Form>
        </div>

        <!-- Delete Section -->
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 border-l-4 border-red-500"
        >
          <h2 class="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
            منطقة الخطر
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            حذف هذا الطلب بشكل دائم. لا يمكن التراجع عن هذا الإجراء.
          </p>

          <div
            v-if="deleteError"
            class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 dark:bg-red-900 dark:border-red-700 dark:text-red-200 mb-4"
          >
            {{ deleteError }}
          </div>

          <button
            @click="handleDelete"
            :disabled="deleting"
            class="bg-red-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="deleting">جاري الحذف...</span>
            <span v-else>حذف الطلب</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import { sleep } from '~/utils/sleep';

interface Permit {
  id: number;
  applicant_name: string;
  applicant_email: string;
  permit_type: string;
  application_status: 'Pending' | 'Approved' | 'Rejected';
  submitted_at: string;
}

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const {
  data: permit,
  pending,
  error,
  refresh,
} = await useAsyncData<Permit>(`permit-${id}`, () =>
  $fetch(`/api/permits/${id}`)
);

// Validation schema for status update
const statusSchema = yup.object({
  application_status: yup
    .string()
    .required('الحالة مطلوبة')
    .oneOf(['Pending', 'Approved', 'Rejected'], 'يجب اختيار حالة صحيحة'),
});

const updating = ref(false);
const updateError = ref<string | null>(null);
const updateSuccess = ref(false);

const handleStatusUpdate = async (values: any) => {
  updateError.value = null;
  updateSuccess.value = false;
  updating.value = true;

  try {
    // Simulate request time (2-4 seconds)
    await sleep(2, 4);

    await $fetch(`/api/permits/${id}`, {
      method: 'PATCH',
      body: {
        application_status: values.application_status,
      },
    });

    updateSuccess.value = true;
    await refresh();

    setTimeout(() => {
      updateSuccess.value = false;
    }, 3000);
  } catch (err: any) {
    updateError.value =
      err.data?.message ||
      'حدث خطأ أثناء تحديث الحالة. يرجى المحاولة مرة أخرى.';
  } finally {
    updating.value = false;
  }
};

const deleting = ref(false);
const deleteError = ref<string | null>(null);

const handleDelete = async () => {
  if (
    !confirm('هل أنت متأكد من حذف هذا الطلب؟ لا يمكن التراجع عن هذا الإجراء.')
  ) {
    return;
  }

  deleteError.value = null;
  deleting.value = true;

  try {
    // Simulate request time (2-4 seconds)
    await sleep(2, 4);

    await $fetch(`/api/permits/${id}`, {
      method: 'DELETE',
    });

    // Redirect to home page after successful deletion
    await router.push('/');
  } catch (err: any) {
    deleteError.value =
      err.data?.message || 'حدث خطأ أثناء حذف الطلب. يرجى المحاولة مرة أخرى.';
    deleting.value = false;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};
</script>
