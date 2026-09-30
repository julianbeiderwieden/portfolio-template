import about from './documents/about'
import contact from './documents/contact'
import imprint from './documents/imprint'
import privacy from './documents/privacy'
import project from './documents/project'
import settings from './documents/settings'
import figure from './objects/figure'
import portableText from './objects/portableText'
import projectMetadataItem from './objects/projectMetadataItem'
import slideshow from './objects/slideshow'
import textSection from './objects/textSection'
import twoColumns from './objects/twoColumns'
import video from './objects/video'

export const singletonTypes = new Set(['about', 'contact', 'imprint', 'privacy', 'settings'])

export const schemaTypes = [
  project,
  about,
  contact,
  imprint,
  privacy,
  settings,
  figure,
  portableText,
  projectMetadataItem,
  slideshow,
  textSection,
  twoColumns,
  video,
]
