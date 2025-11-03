/** @jest-config-loader ts-node */

module.exports = {
    // 1. Указывает, что используем TypeScript
    preset: 'ts-jest',

    // 2. Окружение для тестов (браузерное, а не Node.js)
    testEnvironment: 'jsdom',

    // 3. Файлы, которые выполняются перед каждым тестом
    setupFilesAfterEnv: ['<rootDir>/src/setup-tests.ts'],


    // 4. Как обрабатывать импорты стилей и других файлов
    moduleNameMapping: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },

    // 5. Как преобразовывать файлы
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest', // TS файлы через ts-jest
    },

    // 6. Где искать тестовые файлы
    testMatch: [
        '**/__tests__/**/*.+(ts|tsx|js)', // в папках __tests__
        '**/?(*.)+(spec|test).+(ts|tsx|js)' // файлы с .spec.ts или .test.ts
    ],
};
