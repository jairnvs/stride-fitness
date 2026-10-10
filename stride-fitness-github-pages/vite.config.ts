declare const process: { env: Record<string, string | undefined> };
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({base:process.env.GITHUB_PAGES === 'true' ? '/stride-fitness/' : '/',plugins:[react(),tailwindcss(),VitePWA({registerType:'autoUpdate',includeAssets:['icon.svg','apple-touch-icon.png'],manifest:{name:'Stride — Your fitness companion',short_name:'Stride',description:'Learn your body. Train with intention. Stay consistent.',theme_color:'#171d19',background_color:'#f7f7f4',display:'standalone',start_url:'./',scope:'./',icons:[{src:'icon-192.png',sizes:'192x192',type:'image/png',purpose:'any'},{src:'icon-512.png',sizes:'512x512',type:'image/png',purpose:'any maskable'}]},workbox:{globPatterns:['**/*.{js,css,html,svg,png,json,glb,woff2}'],maximumFileSizeToCacheInBytes:32000000,cleanupOutdatedCaches:true,navigateFallback:'index.html'}})]});
