import axios from 'axios';

export async function getImagesByQuery(query, page = 1) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '51605494-583685eee7aa4d922c38f5bf9',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 15,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching images');
  }
}
