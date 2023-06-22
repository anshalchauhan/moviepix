import { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import Carousel from "../../../components/carousel/Carousel";

//importing useFetch hook to call API
import useFetch from "../../../hooks/useFetch";

const Section = ({ url, tabData, heading, endpoint, changeTab }) => {
  const { data, loading } = useFetch(url);

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">{heading}</span>
        <SwitchTabs data={tabData} onTabChange={changeTab} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
    </div>
  );
};

export default Section;
