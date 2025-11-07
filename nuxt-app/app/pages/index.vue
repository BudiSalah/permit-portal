<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 py-8 max-w-6xl">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          بوابة طلبات التصاريح
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          عرض جميع طلبات التصاريح المقدمة
        </p>
      </div>

      <div class="mb-6">
        <NuxtLink
          to="/apply"
          class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          تقديم طلب جديد
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

      <div v-else-if="data && data.length === 0" class="text-center py-12">
        <p class="text-gray-600 dark:text-gray-400 text-lg">
          لا توجد طلبات تصاريح حالياً
        </p>
        <NuxtLink
          to="/apply"
          class="inline-block mt-4 text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          تقديم أول طلب
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PermitCard v-for="permit in data" :key="permit.id" :permit="permit" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Permit {
  id: number;
  applicant_name: string;
  applicant_email: string;
  permit_type: string;
  application_status: 'Pending' | 'Approved' | 'Rejected';
  submitted_at: string;
}

const { data, pending, error, refresh } = await useAsyncData<Permit[]>(
  'permits',
  () => $fetch('/api/permits')
);

// Refresh data when page becomes visible (in case new permits were added)
onMounted(() => {
  refresh();

  window.addEventListener('focus', () => refresh());
});

// Refresh when navigating back to this page
onActivated(() => {
  refresh();
});
</script>
