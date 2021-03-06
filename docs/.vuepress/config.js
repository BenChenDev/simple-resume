module.exports = {
  title: 'Simple Resume',
  description:
    "A free resume builder that's not out to get your data. Secure, customizable, portable, open-source.",
  themeConfig: {
    logo: '/logo.png',
    repo: 'SHENG-X/simple-resume',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Go to App', link: 'https://simpleresume.ca' },
    ],
    sidebar: [
      '/',
      '/features/',
      '/templates/',
      '/technology/',
      '/contributing/',
      '/building-from-source/',
      '/changelog/',
    ],
    smoothScroll: true,
  },
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-23588235-2',
      },
    ],
  ],
};
