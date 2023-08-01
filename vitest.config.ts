import tsconfigPaths from 'vite-tsconfig-paths';

import {defineConfig} from 'vite'

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        includeSource: ['lib/**/*.{js,ts}'],
    },
})