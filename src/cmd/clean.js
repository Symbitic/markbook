import { status } from 'common/log'

/**
 * Remove the destination directory.
 */
export default function (dir) {
  if (dir) {
    status('Remove %s', dir)
  } else {
    status('Remove default dir')
  }
}
