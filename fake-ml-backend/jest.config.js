module.exports = {
  // Extensiones de archivo de test
  moduleFileExtensions: ['js', 'json', 'ts'],
  // Raíz de tu proyecto
  rootDir: '.',
  // Regex para reconocer tus .spec.ts y .test.ts
  testRegex: '\\.(spec|test)\\.ts$',
  // Transpila con ts-jest
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  // Genera coverage
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    // excluye entrypoint y módulos
    '!src/main.ts',
    '!src/**/*.module.ts',
  ],
  coverageDirectory: 'coverage',
  // Umbrales mínimos de cobertura
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  // Entorno de Node para tus tests
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      diagnostics: false,
    },
  },
};
