/**
 * Sanity CLI Configuration
 * Learn more: https://www.sanity.io/docs/cli
 */

import {defineCliConfig} from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '<your project ID>'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  deployment: {
    // Assigned after the first `sanity deploy`.
    appId: process.env.SANITY_STUDIO_APP_ID,
    autoUpdates: true,
  },
  studioHost: process.env.SANITY_STUDIO_STUDIO_HOST || '', // https://www.sanity.io/docs/environment-variables
})
