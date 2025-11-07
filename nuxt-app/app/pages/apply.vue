<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 py-8 max-w-2xl">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          تقديم طلب تصريح جديد
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          يرجى ملء النموذج أدناه لتقديم طلب تصريح جديد
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
        <PermitForm @success="handleSuccess" />
      </div>

      <div class="mt-6">
        <NuxtLink
          to="/"
          class="text-blue-600 hover:text-blue-700 dark:text-blue-400 inline-flex items-center"
        >
          ← العودة إلى القائمة الرئيسية
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const handleSuccess = () => {
  // Form component handles navigation, but we can add additional logic here if needed
};
</script>
