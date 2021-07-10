import { Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface OwnProps {
  name: string;
  onSubmit: (content: String) => void;
}

const SearchBar: React.FC<OwnProps> = ({ name, onSubmit }) => {
  const onSubmitEnterHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchBar = e.currentTarget.elements.namedItem(
      name
    ) as HTMLInputElement;
    var result = searchBar.value;

    // callback function to the lifted state searchTerm
    onSubmit(result);
  };

  const iconSubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const searchBar = document.getElementById(name) as HTMLInputElement;

    onSubmit(searchBar.value);
  };

  return (
    <form onSubmit={onSubmitEnterHandler}>
      <InputGroup>
        <Input
          data-cy="search-input"
          type="text"
          id={name}
          placeholder="Search..."
          name="search"
          variant="outline"
          _focus={{
            backgroundColor: "white",
          }}
        />
        <InputRightAddon
          children={
            <IconButton
              data-cy="search-button"
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
