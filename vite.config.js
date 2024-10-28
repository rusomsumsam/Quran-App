import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// Function to get all HTML files dynamically
function getHtmlFiles(dir) {
    base: '/Quran-App/'; //এটা github এ আপনার dist folder আলাদা branch এ subtree করে deploy করার জন্য মাকঝকানে নামটা repo name
    let files = fs.readdirSync(dir);
    let htmlFiles = {};

    files.forEach(file => {
        if (file.endsWith('.html')) {
            htmlFiles[file.replace('.html', '')] = resolve(dir, file);
        }
    });
    return htmlFiles;
}

export default defineConfig({
    build: {
        rollupOptions: {
            input: getHtmlFiles('./') // Current directory (./) থেকে সব html ফাইল ইনপুট হিসেবে নেয়া হচ্ছে
        }
    }
});