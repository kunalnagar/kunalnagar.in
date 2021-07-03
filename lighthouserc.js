module.exports = {
  ci: {
    collect: {
      assert: {
        preset: 'lighthouse:recommended',
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
