export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const backendUrl = config.backendUrl;
  const id = getRouterParam(event, 'id');

  try {
    const response = await $fetch(`${backendUrl}/permits/${id}`);
    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 404,
      statusMessage: error.statusMessage || 'Permit not found',
    });
  }
});
