import { Box, Center, Text} from "@chakra-ui/react";
import React from "react";

interface OwnProps {
    queryTerm: string | string[] 
}

const SearchResult: React.FC<OwnProps> = ({queryTerm}) => {
  return (
    <Box maxH={250} width={250} overflow={"auto"}>
        {[...Array(100).keys()].map(x => {
                return (
                    <Center><Text>{queryTerm}</Text></Center>
                );
            }
        )}
    </Box>
  );
};

export default SearchResult;
