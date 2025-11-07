export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const backendUrl = config.backendUrl;

  try {
    const body = await readBody(event);
    const response = await $fetch(`${backendUrl}/permits`, {
      method: 'POST',
      body,
    });
    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to create permit',
    });
  }
});
