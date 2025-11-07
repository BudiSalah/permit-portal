<template>
  <div
    class="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
  >
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {{ permit.permit_type }}
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {{ permit.applicant_name }}
        </p>
      </div>
      <StatusBadge :status="permit.application_status" />
    </div>

    <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
      <div class="flex items-center">
        <span class="font-medium ml-2">البريد الإلكتروني:</span>
        <span>{{ permit.applicant_email }}</span>
      </div>
      <div class="flex items-center">
        <span class="font-medium ml-2">تاريخ التقديم:</span>
        <span>{{ formatDate(permit.submitted_at) }}</span>
      </div>
    </div>

    <div class="flex gap-2 mt-4">
      <NuxtLink
        :to="`/permits/${permit.id}`"
        class="flex-1 text-center bg-primary-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
      >
        عرض التفاصيل
      </NuxtLink>
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

interface Props {
  permit: Permit;
}

defineProps<Props>();

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
