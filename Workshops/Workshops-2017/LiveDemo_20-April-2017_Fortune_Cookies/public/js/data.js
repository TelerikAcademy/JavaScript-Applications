import * as requester from 'requester';

export function getUsers() {
  // Add authentication
  return requester.get('api/users');
}

export function getCookies() {
  return requester.get('api/cookies');
}

export function login(username, passHash) {
  const body = {
    username,
    passHash
  };

  return requester.put('api/auth', body);
}

export function register(username, passHash) {
  const body = {
    username,
    passHash
  };

  return requester.post('api/users', body);
}
