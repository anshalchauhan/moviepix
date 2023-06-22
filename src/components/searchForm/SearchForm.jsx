import React from "react";

const SearchForm = ({ className, onSubmit, onChange, value, content }) => {
  return (
    <form className={className} onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Search for a movie or tv show...."
        onChange={onChange}
        value={value}
      />
      {content}
    </form>
  );
};

export default SearchForm;
