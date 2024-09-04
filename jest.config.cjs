/* eslint-disable no-undef */
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  collectCoverageFrom: [ // Acá elegis donde queres que tome los test, en este caso components
    'src/Components/**/*.{js,jsx,ts,tsx}', // Solo incluir archivos dentro de la carpeta `components`
    '!src/Components/**/*.d.ts', // Excluir archivos de definición de TypeScript
  ],
  
  collectCoverage: true, // Genera el reporte que se ve en consola
  coverageDirectory: '/dev/null', // Evita que se guarde la cobertura en un directorio
  coverageReporters: ['text'], // Muestra la cobertura en la terminal
};