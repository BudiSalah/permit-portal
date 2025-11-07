<template>
  <span :class="badgeClass">
    {{ status }}
  </span>
</template>

<script setup lang="ts">
export type ApplicationStatus = 'Pending' | 'Approved' | 'Rejected';

interface Props {
  status: ApplicationStatus;
}

const props = defineProps<Props>();

const badgeClass = computed(() => {
  const baseClass =
    'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium';

  switch (props.status) {
    case 'Approved':
      return `${baseClass} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
    case 'Rejected':
      return `${baseClass} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
    case 'Pending':
    default:
      return `${baseClass} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
  }
});
</script>
