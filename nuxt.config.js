/*!

 =========================================================
 * Nuxt Black Dashboard - v1.0.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/nuxt-black-dashboard
 * Copyright 2020 Creative Tim (https://www.creative-tim.com)

 * Coded by Creative Tim

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Lumkani',
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js' },
    ],
    // meta: [
    //   { charset: 'utf-8' },
    //   { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    //   { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    // ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800'},
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css'}
    ],
    bodyAttrs: {
      class: '' // Add `white-content` class here to enable "white" mode.
    }
  },
  router: {
    linkExactActiveClass: 'active'
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    'assets/css/demo.css',
    'assets/css/nucleo-icons.css',
    'assets/sass/black-dashboard.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    `~/plugins/dashboard-plugin.js`,
    '~/plugins/moment-timezone-inject.js'

  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/moment',
  ],
  moment: {
    timezone: true
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    'nuxt-i18n'
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.js'
      },
      {
        code: 'ar',
        file: 'ar.js'
      }
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'en',
  },

  env: {
    APIURL: process.env.APIURL || "http://localhost:8000",
    SERVICE_APP_APIURL: process.env.SERVICE_APP_APIURL || "http://127.0.0.1:8000/",
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    babel: {
      plugins: [
        [
          'component',
          {
            'libraryName': 'element-ui',
            'styleLibraryName': 'theme-chalk'
          }
        ]
      ]
    }
  }
}
