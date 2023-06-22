import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/moviepix-full.png";

//importing searchFrom from components
import SearchFrom from "../searchForm/SearchForm";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  //to bring the header to top, whenever we route to a different page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  //Code to add effects on the header based on whether we are scrolling down or up
  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) setShow("hide");
      else setShow("show");
    } else setShow("top");
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  //Code to open searchform
  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  //Code to open mobile menu
  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  //states for searchForm, input
  const searchQueryHandler = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchOnSubmitHandler = (event) => {
    event.preventDefault();
    navigate(`/search/${searchQuery}`);
    setTimeout(() => {
      setShowSearch(false);
    }, 1000);
  };

  //To navigate to movies and tv shows page
  const navigationHandler = (type) => {
    navigate(`/explore/${type}`);
    setMobileMenu(false);
  };

  //Content inside searchFrom Button
  let content = <VscChromeClose onClick={() => setShowSearch(false)} />;

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            TV Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <SearchFrom
            className="searchInput"
            onSubmit={searchOnSubmitHandler}
            onChange={searchQueryHandler}
            value={searchQuery}
            content={content}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
