import Axios from "axios";
//API key: 20298268-ad7854859c2b2dc6e8b44e367

async function apiImages(filter, page) {
  const { data } = await Axios.get(
    `https://pixabay.com/api/?q=${filter}&page=${page}&key=20298268-ad7854859c2b2dc6e8b44e367&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
}

export default apiImages;
