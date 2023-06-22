import React, { useState, useEffect } from "react";
import "./style.scss";
import { useBeforeUnload, useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";

//importing components Img and ContentWrapper
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";

//importing SearchForm component
import SearchForm from "../../../components/searchForm/SearchForm";

const HeroBanner = () => {
  //States in HeroBanner, background image and search query
  const [background, setBackground] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  //userNavigate for navigating after searching a query
  const navigate = useNavigate();

  //Accessing url state from home
  const { url } = useSelector((state) => state.home);

  //Using useFetch hook to fetch Api data
  const { data, loading } = useFetch("/movie/upcoming");

  //Initial render
  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)].backdrop_path;
    setBackground(bg);
  }, [data]);

  //states for searchForm, input
  const searchQueryHandler = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchOnSubmitHandler = (event) => {
    event.preventDefault();
    navigate(`/search/${searchQuery}`);
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}

      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Milions of movies, TV shows andpeople to discover. Explore now.
          </span>

          <SearchForm
            className="searchInput"
            onSubmit={searchOnSubmitHandler}
            onChange={searchQueryHandler}
            value={searchQuery}
            content={<button>Search</button>}
          />
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
