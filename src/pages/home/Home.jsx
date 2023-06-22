import { useState } from "react";
import "./style.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import Section from "./section/Section";

const Home = () => {
  //State for trending section
  const [trendingTab, setTrendingTab] = useState("day");

  const changeTrendingTab = (tab) => {
    setTrendingTab(tab);
  };

  //State for popular section
  const [popularTab, setPopularTab] = useState("movie");

  const changePopularTab = (tab) => {
    setPopularTab(tab);
  };

  //State for popular section
  const [topRatedTab, setTopRatedTab] = useState("movie");

  const changeTopRatedTab = (tab) => {
    setTopRatedTab(tab);
  };

  return (
    <div className="homePage">
      <HeroBanner />
      <Section
        heading="Trending"
        tabData={["day", "week"]}
        url={`/trending/all/${trendingTab}`}
        endpoint={trendingTab}
        changeTab={changeTrendingTab}
      />
      <Section
        heading="What's Popular"
        tabData={["movie", "tv"]}
        url={`/${popularTab}/popular`}
        endpoint={popularTab}
        changeTab={changePopularTab}
      />
      <Section
        heading="Top Rated"
        tabData={["movie", "tv"]}
        url={`/${topRatedTab}/top_rated`}
        endpoint={topRatedTab}
        changeTab={changeTopRatedTab}
      />
    </div>
  );
};

export default Home;
