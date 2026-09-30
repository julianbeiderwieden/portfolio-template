import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {ProjectsIcon} from '@sanity/icons/Projects'
import {UserIcon} from '@sanity/icons/User'
import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {CogIcon} from '@sanity/icons/Cog'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {LockIcon} from '@sanity/icons/Lock'
import {schemaTypes, singletonTypes} from './src/schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'portfolio-cms',
  title: 'Portfolio CMS',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Projects')
              .id('projects')
              .icon(ProjectsIcon)
              .child(
                S.documentTypeList('project')
                  .title('Projects')
                  .defaultOrdering([
                    {field: 'orderRank', direction: 'asc'},
                    {field: 'title', direction: 'asc'},
                  ]),
              ),
            S.listItem()
              .title('About')
              .id('about')
              .icon(UserIcon)
              .child(S.document().schemaType('about').documentId('about')),
            S.listItem()
              .title('Contact')
              .id('contact')
              .icon(EnvelopeIcon)
              .child(S.document().schemaType('contact').documentId('contact')),
            S.divider(),
            S.listItem()
              .title('Imprint')
              .id('imprint')
              .icon(DocumentTextIcon)
              .child(S.document().schemaType('imprint').documentId('imprint')),
            S.listItem()
              .title('Privacy')
              .id('privacy')
              .icon(LockIcon)
              .child(S.document().schemaType('privacy').documentId('privacy')),
            S.divider(),
            S.listItem()
              .title('Settings')
              .id('settings')
              .icon(CogIcon)
              .child(S.document().schemaType('settings').documentId('settings')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    // Keep singletons out of the “New document” menu.
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (actions, {schemaType}) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({action}) => !['unpublish', 'delete', 'duplicate'].includes(action ?? ''))
        : actions,
  },
})
