import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Raiden",
  description: "Raiden - Supabase Framework",
  cleanUrls: true,

  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    search: {
      provider: 'local'
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/docs/quick-start' },
      { text: 'FAQ', link: '/docs/faq' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Quick Start', link: '/docs/quick-start' },
          { text: 'Installation', link: '/docs/installation' },
        ]
      },
      {
        text: 'Core Concept',
        items: [
          { text: 'Architecture', link: '/docs/architecture' },
          { text: 'Project Structure', link: '/docs/structure' },
        ]
      },
      {
        text: 'Building Your Application',
        items: [
          { text: 'Configuration', link: '/docs/config' },
          { text: 'Routing', link: '/docs/routing' },
          { text: 'ACL', link: '/docs/acl' },
          { text: 'Model', link: '/docs/model' },
          { text: 'Controller', link: '/docs/controller' },
          { text: 'Middleware', link: '/docs/middleware' },
          { text: 'Command Line', link: '/docs/cli' },
          { text: 'Deployment Strategy', link: '/docs/deployment' },
          { text: 'Testing', link: '/docs/testing' },
        ]
      },
      {
        text: 'Observability',
        items: [
          { text: 'Open Telemetry', link: '/docs/open-telemetry' },
        ]
      },
      {
        text: 'Resources',
        items: [
          { text: 'FAQ', link: '/docs/faq' },
        ]
      },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Refactory'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
