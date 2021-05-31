import { Input, InputGroup } from "@chakra-ui/react";
import { Button, IconButton } from "@chakra-ui/react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({ isNotMobile }) => {
    return (
    <form onSubmit={() => console.log("Submitted")}>
        <InputGroup> 
        {/* "15em", "20em", "35em", "50em" */}
        {/* width={[300, 300, 350, 350]} */}
            <Input width={[240, 300, 480, 700, 1400]} type="text" id="header-search" placeholder="Search NUS Facilities..." name="search"></Input>
            {
                isNotMobile
                ? (
                    <Button leftIcon={<FontAwesomeIcon icon={faSearch} color="gray.100"/>} type="submit">Search</Button>
                )
                : (
                    <IconButton icon={<FontAwesomeIcon icon={faSearch} color="gray.100"/>} aria-label="search"/>
                )
            }
        </InputGroup>
    </form>
    );
}

export default SearchBar;