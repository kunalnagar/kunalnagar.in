module.exports = {
  ci: {
    collect: {
      assert: {
        assertions: {
          'categories:performance': ['warn', { minScore: 0.7 }],
          'categories:accessibility': ['error', { minScore: 0.7 }],
          'categories:accessibility': ['error', { minScore: 0.7 }],
          'categories:seo': ['error', { minScore: 0.7 }],
          'categories:best-practices': ['error', { minScore: 0.7 }],
        },
      },
      url: [
        'http://localhost:4000/',
        'http://localhost:4000/foss',
        'http://localhost:4000/blog',
      ],
      startServerCommand: 'npm run dev',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
