import { users, repos } from './data';

const isPausedUrl = {};

export function makeFakeAPICall(url, result) {
  let i = 1;
  return new Promise(resolve => {
    isPausedUrl[url] = false;
    function notify() {
      if (!isPausedUrl[url]) {
        i += 1;
      }
      if (i === 100) {
        resolve(result);
      } else {
        setTimeout(notify, 10);
      }
    }
    notify();
  });
}

export const fetchContributors = () => makeFakeAPICall('/users', users);

export const fetchUserRepositories = id => makeFakeAPICall(`/users/${id}/repositories`, repos[id]);
