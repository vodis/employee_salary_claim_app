import axios from 'axios';

export const http = {
  post: async (url, data, config) => {
    return await axios
      .post(url, data, {
        headers: {
          Accept: 'application/json; charset=UTF-8',
          'Content-Type': 'application/json; charset=UTF-8'
        },
        ...config
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        alert(error.message);
      });
  }
};
