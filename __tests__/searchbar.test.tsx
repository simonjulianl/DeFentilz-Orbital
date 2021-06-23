import './matchMedia.mock'; // Must be imported before the tested file

import React from 'react';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

// Component to test
import SearchBar from '~/components/SearchBar/SearchBar';

/**
 * @jest-environment jsdom
*/

jest.mock("next/router", () => ({
    useRouter() {
      return {
        route: "",
        pathname: "",
        query: "",
        asPath: "",
      };
    },
  }));
  
const useRouter = jest.spyOn(require("next/router"), "useRouter");

describe("Search Bar", () => {
    useRouter.mockImplementation(() => ({
        route: "/yourRoute",
        pathname: "/yourRoute",
        query: "",
        asPath: "",
      }));

    test("should show placeholder text", () => {
        const { getByPlaceholderText} = render(<SearchBar name={'test'} onSubmit={() => {}}/>);
        expect(getByPlaceholderText('Search NUS Facilities...')).toBeVisible();
    });

    test('should show button', () => {
        const { getByRole } = render(<SearchBar name={'test'} onSubmit={() => {}}/>);
        expect(getByRole('button')).toBeVisible();
    })
});