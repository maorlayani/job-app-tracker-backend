var config: string;
import prod from './prod'
import dev from './dev'

// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
  // we are in production - return the prod set of keys
  config = prod
} else {
  // we are in development - return the dev keys!!!
  config = dev
}
export default config