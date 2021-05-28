import { Input, InputGroup } from "@chakra-ui/react";
import { Button, IconButton } from "@chakra-ui/react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({ isNotMobile }) => {
    return (
    <form action="/" method="get">
        <InputGroup>
            <Input width={["15em", "20em", "35em", "50em"]} type="text" id="header-search" placeholder="Search NUS Facilities..." name="search"></Input>
            {
                isNotMobile
                ? (
                    <Button leftIcon={<FontAwesomeIcon icon={faSearch} color="gray.100"/>}>Search</Button>
                )
                : (
                    <IconButton icon={<FontAwesomeIcon icon={faSearch} color="gray.100"/>} aria-label="search" type="submit"/>
                )
            }
            
        </InputGroup>
    </form>
    );
}

export default SearchBar;