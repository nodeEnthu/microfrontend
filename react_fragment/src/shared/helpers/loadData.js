import axios from 'axios';

export default resourceType => {
  return axios(`https://jsonplaceholder.typicode.com/${resourceType}`)
    .then(data => {
      // only keep 10 first results
      return data.filter((_, idx) => idx < 10);
    });
};