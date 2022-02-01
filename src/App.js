import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { GlobalStyle } from "./GlobalStyle";

import ImageGallery from "./components/ImageGallery/ImageGallery";
import Searchbar from "./components/Searchbar/Searchbar";
import Error from "./components/Error/Error";
import Loader from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";
import Button from "./components/Button/Button";

import { AppContainer } from "./App.styled";
import apiImages from "./service/apiImages";
import "react-toastify/dist/ReactToastify.css";

export default function App(second) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState("");
  const [totalHits, setTotalHits] = useState(0);

  const fetchImage = () => {
    setIsLoading(true);
    async function forFetch() {
      try {
        const { hits, totalHits } = await apiImages(filter, page);
        setImages((prevState) => [...prevState, ...hits]);
        setPage((prevState) => prevState + 1);
        setTotalHits(totalHits);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    forFetch();
  };

  useEffect(() => {
    if (!filter) {
      return;
    }
    fetchImage();
  }, [filter]);

  const handleFormSubmit = (query) => {
    if (query === filter) return;
    setFilter(query);
    setIsLoading(true);
    setPage(1);
    setImages([]);
  };

  const toggleModal = () => {
    setShowModal((showModal) => !showModal);
  };

  const saveLargeImage = (url) => {
    setLargeImage(url);
    toggleModal();
  };

  return (
    <>
      <AppContainer>
        <GlobalStyle />
        <Searchbar propSubmit={handleFormSubmit} />
        {error && <Error message="Something wrong" />}
        {filter && totalHits === 0 && !isLoading && (
          <Error message="No results found" />
        )}
        <ImageGallery images={images} onClick={saveLargeImage} />
        {showModal && <Modal onClose={toggleModal} url={largeImage} />}
        {isLoading && <Loader />}
        {images.length > 0 && images.length !== totalHits && !isLoading && (
          <Button onClick={() => fetchImage()} />
        )}
        <ToastContainer autoClose={3000} />
      </AppContainer>
    </>
  );
}

// export default class App extends Component {
//   state = {
//     images: [],
//     error: null,
//     filter: "",
//     page: 1,
//     isLoading: false,
//     showModal: false,
//     largeImage: "",
//     totalHits: 0,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.filter !== this.state.filter) {
//       this.fetchImage();
//     }
//     window.scrollTo({
//       top: document.documentElement.scrollHeight,
//       behavior: "smooth",
//     });
//   }

//   handleFormSubmit = (query) => {
//     this.setState({ filter: query, page: 1, images: [] });
//   };

//   fetchImage = () => {
//     const { page, filter } = this.state;
//     this.setState({ isLoading: true });
//     Axios.get(
//       `https://pixabay.com/api/?q=${filter}&page=${page}&key=20298268-ad7854859c2b2dc6e8b44e367&image_type=photo&orientation=horizontal&per_page=12`
//     )
//       .then((response) => response.data)
//       .then(({ hits, totalHits }) => {
//         this.setState((prevState) => ({
//           images: [...prevState.images, ...hits],
//           page: prevState.page + 1,
//           totalHits: totalHits,
//         }));
//       })
//       .catch((error) => this.setState({ error }))
//       .finally(() => this.setState({ isLoading: false }));
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   saveLargeImage = (url) => {
//     this.setState({ largeImage: url });
//     this.toggleModal();
//   };

//   render() {
//     const { images, showModal, isLoading, error, totalHits, filter } =
//       this.state;

//     return (
//       <>
//         <GlobalStyle />
//         <AppContainer>
//           <Searchbar onSubmit={this.handleFormSubmit} />
//           {error && <Error message="Something wrong" />}
//           {filter && totalHits === 0 && <Error message="No results found" />}
//           <ImageGallery images={images} onClick={this.saveLargeImage} />
//           {showModal && (
//             <Modal onClose={this.toggleModal} url={this.state.largeImage} />
//           )}

//           {isLoading && <Loader />}
//           {images.length > 0 && images.length !== totalHits && !isLoading && (
//             <Button onClick={this.fetchImage} />
//           )}
//           <ToastContainer autoClose={3000} />
//         </AppContainer>
//       </>
//     );
//   }
// }
