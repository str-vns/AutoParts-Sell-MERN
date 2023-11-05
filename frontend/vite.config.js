import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import vasicss from '@vitejs/plugin-basic-ssl'
// https://vitejs.dev/config/
export default {
  plugins: [react(),
  vasicss()
],


}