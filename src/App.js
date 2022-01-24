import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import {GlobalStyle} from './GlobalStyle';

import ImageGallery from "./components/ImageGallery/ImageGallery";
import Searchbar from "./components/Searchbar/Searchbar";
import Error from "./components/Error/Error";
import Loader from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";
import Button from "./components/Button/Button";
import Axios from "axios";

import { AppContainer } from "./App.styled";

import "react-toastify/dist/ReactToastify.css";


//API key: 20298268-ad7854859c2b2dc6e8b44e367

export default class App extends Component {
  state = {
    images: [],
    error: null,
    filter: "",
    page: 1,
    isLoading: false,
    showModal: false,
    largeImage: "",
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filter !== this.state.filter) {
      this.fetchImage();
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }

  handleFormSubmit = (query) => {
    
    this.setState({ filter: query, page: 1, images: [] });
  };

  fetchImage = () => {
    const { page, filter } = this.state;
    this.setState({ isLoading: true });
    Axios.get(
      `https://pixabay.com/api/?q=${filter}&page=${page}&key=20298268-ad7854859c2b2dc6e8b44e367&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((response) => response.data)
      .then(({ hits, totalHits }) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...hits],
          page: prevState.page + 1,
          totalHits: totalHits,
        }));
      })
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  saveLargeImage = (url) => {
    this.setState({ largeImage: url });
    this.toggleModal();
  };

  render() {
    const { images, showModal, isLoading, error, totalHits, filter } = this.state;
    

    return (
      <>
        <GlobalStyle/>
        <AppContainer>
        <Searchbar onSubmit={this.handleFormSubmit} />
          {error && <Error message='Something wrong' />}
          { filter && totalHits===0 && <Error message='No results found' />}
        <ImageGallery images={images} onClick={this.saveLargeImage} />
        {showModal && (
          <Modal onClose={this.toggleModal} url={this.state.largeImage} />
        )}

        {isLoading && <Loader />}
        {images.length > 0 && images.length !== totalHits && !isLoading && (
          <Button onClick={this.fetchImage} />
        )}
        <ToastContainer autoClose={3000} />
      </AppContainer>
      </>
    );
  }
}
