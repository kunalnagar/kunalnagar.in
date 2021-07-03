module.exports = {
  ci: {
    collect: {
      assert: {
        budgetsFile: './budget.json',
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
