export const success = (data: any, message = "OK") => ({
  success: true,
  message,
  data,
});

export const failure = (message: string, code?: string) => ({
  success: false,
  message,
  code,
});
