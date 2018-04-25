/* Sends get request to url */
const GET = (url = '/') => (
  fetch(`${url}`).then(res => res.json())
);

/* Sends POST request with data to url */
const POST = (url = '/', data = {}) => (
  fetch(`${url}`, {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json',
    },
  }).then(res => res.json())
);

export { GET, POST };
