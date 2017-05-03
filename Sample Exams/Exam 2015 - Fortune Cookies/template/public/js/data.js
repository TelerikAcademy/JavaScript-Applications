import * as requester from 'requester';


export function getUsers() {
    return requester.get('/api/users');
}

export function getCookies() {
    return requester.get('api/cookies');
}