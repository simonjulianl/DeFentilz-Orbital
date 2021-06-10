import React, { useEffect, useState } from "react";
import { Avatar, VStack, Text, Flex, IconButton, Center, Spacer } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import Page from "~/components/Page/Page";
import { NextPage } from "next";
import SearchBar from "~/components/SearchBar/SearchBar";
import { useRouter } from 'next/router'
import SearchCard from "~/components/SearchCard/SearchCard";

import Image from "next/image";

const SearchView: NextPage = () => {
  const router = useRouter();
  let { q } = router.query;
  if(Array.isArray(q)){ // because q technically string | string[]
    q = q.reduce((x, y) => (x + y));
  }

  const [screenWidth, setScreenWidth] = useState(0);
  const [searchResult, setSearchResult] = useState([]); // Simulate API Call to search

  useEffect(() => {
    // Make API Call here 
    setSearchResult([
      {
        name: q + " A", 
        type: "sports",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut venenatis diam, nec laoreet justo. Sed rutrum ex leo, nec blandit sapien vestibulum vitae. Donec sagittis odio diam, eu malesuada enim volutpat in. Integer et orci dolor. Suspendisse massa leo, eleifend et maximus ut, tristique rhoncus lectus. Cras ac sapien eu nisl mattis sollicitudin. In placerat quam dolor, quis varius est sollicitudin vel. Donec sagittis, enim eu rhoncus ultrices, risus erat commodo purus, eleifend venenatis nisi diam ut purus. Aenean dapibus porttitor lorem eget feugiat. Vestibulum ac sem luctus, luctus lacus sit amet, egestas sem. Nulla hendrerit eget odio in cursus.",
        location: "UTown",
        rating: 5,
        image: "http://lorempixel.com/output/cats-q-c-640-480-1.jpg"
      }, 
      {
        name: q + " B",
        type: "sports",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut venenatis diam, nec laoreet justo. Sed rutrum ex leo, nec blandit sapien vestibulum vitae. Donec sagittis odio diam, eu malesuada enim volutpat in. Integer et orci dolor. Suspendisse massa leo, eleifend et maximus ut, tristique rhoncus lectus. Cras ac sapien eu nisl mattis sollicitudin. In placerat quam dolor, quis varius est sollicitudin vel. Donec sagittis, enim eu rhoncus ultrices, risus erat commodo purus, eleifend venenatis nisi diam ut purus. Aenean dapibus porttitor lorem eget feugiat. Vestibulum ac sem luctus, luctus lacus sit amet, egestas sem. Nulla hendrerit eget odio in cursus.",
        location: "UTown",
        rating: 5,
        image: "http://lorempixel.com/output/cats-q-c-640-480-2.jpg"
      }, {
        name: q + " C",
        type: "sports",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut venenatis diam, nec laoreet justo. Sed rutrum ex leo, nec blandit sapien vestibulum vitae. Donec sagittis odio diam, eu malesuada enim volutpat in. Integer et orci dolor. Suspendisse massa leo, eleifend et maximus ut, tristique rhoncus lectus. Cras ac sapien eu nisl mattis sollicitudin. In placerat quam dolor, quis varius est sollicitudin vel. Donec sagittis, enim eu rhoncus ultrices, risus erat commodo purus, eleifend venenatis nisi diam ut purus. Aenean dapibus porttitor lorem eget feugiat. Vestibulum ac sem luctus, luctus lacus sit amet, egestas sem. Nulla hendrerit eget odio in cursus.",
        location: "UTown",
        rating: 4,
        image: "http://lorempixel.com/output/cats-q-c-640-480-3.jpg"
      }, 
    ])
    setScreenWidth(screen.width);
  }, [screenWidth, searchResult]);

  return (
    <Page title="Search" description="Search">
      <Flex direction="column" justify="flex-start">
        <Box
        padding={3}
        >
          <SearchBar onSubmit={(content: string) => router.push({
                pathname: '/search',
                query: {
                  q: content
                } 
              }
              )}
              value={q} />
        </Box>
        <VStack>
          <Text>
            Searching for: {q}
          </Text>
            {searchResult.map(
              ({name, type, description, location, image, rating}) =>
                <SearchCard
                  name={name}
                  type={type}
                  description={description}
                  image={image}
                  location={location}
                  rating={rating}/>
              )
            }
        </VStack>
      </Flex>
    </Page>
  );
};

export default SearchView;
