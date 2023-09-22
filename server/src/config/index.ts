import dev from './config.dev'
import prod from './config.prod'

export default process.env.SERVER_ENV === 'prod' ? prod : dev
