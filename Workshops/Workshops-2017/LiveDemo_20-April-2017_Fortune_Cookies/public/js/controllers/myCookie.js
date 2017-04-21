import * as data from 'data';

export function get() {
  return data.getMyCookie('api/my-cookie');
}
