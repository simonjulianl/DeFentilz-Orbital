import { Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import { Button, IconButton } from "@chakra-ui/react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface OwnProps {
  onSubmit: (content: String) => void;
  value: null | string | string[];
}

const SearchBar: React.FC<OwnProps> = ({ onSubmit, value}) => {
  const onSubmitEnterHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchBar = e.currentTarget.elements.namedItem(
      "header-search"
    ) as HTMLInputElement;
    var result = searchBar.value;

    // refresh the value
    // searchBar.value = "";

    // callback function to the lifted state searchTerm
    onSubmit(result);
  };

  const iconSubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const searchBar = document.getElementById(
      "header-search"
    ) as HTMLInputElement;

    onSubmit(searchBar.value);

    // refresh the value of searchbar
    // searchBar.value = "";
  };

  return (
    <form onSubmit={onSubmitEnterHandler}>
      <InputGroup>
        <Input
          type="text"
          id="header-search"
          placeholder="Search NUS Facilities..."
          name="search"
          variant="outline"
          value={undefined}
        />
        <InputRightAddon
          children={
            <IconButton
              icon={<FontAwesomeIcon icon={faSearch} color="gray.100" />}
              aria-label="search"
              onClick={iconSubmitHandler}
            />
          }
        ></InputRightAddon>
      </InputGroup>
    </form>
  );
};

export default SearchBar;
