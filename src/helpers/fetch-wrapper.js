import { useAuthStore } from 'stores/auth';

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
};

function request(method) {
  return (url, body) => {
    const requestOptions = {
      method,
      headers: authHeader(url)
    };
    if (body) {
      requestOptions.headers['Content-Type'] = 'application/json';
      requestOptions.body = JSON.stringify(body);
    }
    return fetch(url, requestOptions).then(handleResponse);
  }
}

// helper functions

function authHeader(url) {
  // return auth header with jwt if user is logged in and request is to the api url
  const { user } = useAuthStore();
  const isLoggedIn = !!user?.key;
  if (isLoggedIn) {
    return { 'Authorization': "Token " + user.key + "",};
  } else {
    return {};
  }
}

async function handleResponse(response) {
  // console.log('handleResponse Response: ', response)
  // const newData = await response.json();
  // console.log('handleResponse Response JSON: ', newData)
  const isJson = response.headers?.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  // check for error response
  if (!response.ok) {
    const { user, logout } = useAuthStore();
    if ([401, 403].includes(response.status) && user) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      logout();
    }

    let error = null;
    if (data.email !== undefined){
      error = data.email[0];
    }
    else if (data.non_field_errors !== undefined){
      error = data.non_field_errors[0];
    }
    else{
      error = response.status;
    }
    return Promise.reject(error);
  }
  return data;
}
