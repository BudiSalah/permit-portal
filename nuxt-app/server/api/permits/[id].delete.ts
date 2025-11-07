export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const backendUrl = config.backendUrl;
  const id = getRouterParam(event, 'id');

  try {
    await $fetch(`${backendUrl}/permits/${id}`, {
      method: 'DELETE',
    });
    return { success: true, message: 'Permit deleted successfully' };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to delete permit',
    });
  }
});
