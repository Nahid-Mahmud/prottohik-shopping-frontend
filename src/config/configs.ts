// import all env form env.local file

const configs = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

export const baseUrl = configs.api.baseUrl;
