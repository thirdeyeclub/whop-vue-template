import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [vue()],
    define: {
      'process.env.WHOP_API_KEY': JSON.stringify(env.WHOP_API_KEY || ''),
      'process.env.WHOP_APP_ID': JSON.stringify(env.WHOP_APP_ID || ''),
      'process.env.WHOP_COMPANY_ID': JSON.stringify(env.WHOP_COMPANY_ID || ''),
      'process.env.WHOP_USER_ID': JSON.stringify(env.WHOP_USER_ID || ''),
    },
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
  };
});

