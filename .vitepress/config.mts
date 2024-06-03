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
          { text: 'Controller', link: '/docs/controller' },
          { text: 'Model', link: '/docs/model' },
          { text: 'REST', link: '/docs/rest' },
          { text: 'RPC', link: '/docs/rpc' },
          { text: 'Realtime', link: '/docs/realtime' },
          { text: 'ACL', link: '/docs/acl' },
          { text: 'Testing', link: '/docs/testing' },
        ]
      },
      {
        text: 'Commands',
        items: [
          { text: 'Overview', link: '/docs/cli/'},
          { text: 'apply', link: '/docs/cli/apply'},
          { text: 'build', link: '/docs/cli/build'},
          { text: 'completion', link: '/docs/cli/completion'},
          { text: 'configure', link: '/docs/cli/configure'},
          { text: 'generate', link: '/docs/cli/generate'},
          { text: 'help', link: '/docs/cli/help'},
          { text: 'imports', link: '/docs/cli/imports'},
          { text: 'init', link: '/docs/cli/init'},
          { text: 'run', link: '/docs/cli/run'},
          { text: 'serve', link: '/docs/cli/serve'},
          { text: 'start', link: '/docs/cli/start'},
          { text: 'version', link: '/docs/cli/version'},
        ]
      },
      {
        text: 'Deployment Strategy',
        items: [
          { text: 'Binary', link: '/docs/deploy/binary' },
          { text: 'Kubernetes', link: '/docs/deploy/k8s' },
        ]
      },
      {
        text: 'Middlewares',
        items: [
          { text: 'Global', link: '/docs/middleware/' },
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
      { icon: 'github', link: 'https://github.com/sev-2/raiden' }
    ]
  }
})
