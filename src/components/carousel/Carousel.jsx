import { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

import "./style.scss";

const Carousel = ({ data, loading, endpoint, title }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  //Function for scrolling the carousel component
  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  //For Rendering the movie posters with the circle rating and the genres of the movie or tvshow
  const renderedPosters = data?.map((item) => {
    const posterUrl = item.poster_path
      ? url.poster + item.poster_path
      : PosterFallback;
    return (
      <div
        key={item.id}
        className="carouselItem"
        onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}
      >
        <div className="posterBlock">
          <Img src={posterUrl} />
          <CircleRating rating={item.vote_average.toFixed()} />
          <Genres data={item.genre_ids.slice(0, 2)} />
        </div>
        <div className="textBlock">
          <span className="title">{item.title || item.name}</span>
          <span className="date">
            {dayjs(item.release_Date).format("MMM D, YYYY")}
          </span>
        </div>
      </div>
    );
  });

  const skeletonItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="title skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div ref={carouselContainer} className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRightNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {renderedPosters}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
