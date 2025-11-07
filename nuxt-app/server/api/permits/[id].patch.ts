export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const backendUrl = config.backendUrl;
  const id = getRouterParam(event, 'id');

  try {
    const body = await readBody(event);
    const response = await $fetch(`${backendUrl}/permits/${id}`, {
      method: 'PATCH',
      body,
    });
    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to update permit',
    });
  }
});

