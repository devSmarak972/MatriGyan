import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, TextInput } from "@mantine/core";

const FilterTopBar = (props) => {
  return (
    <form className="flex items-center w-full">
      <label for="simple-search" className="sr-only pl-4">
        Search
      </label>
      <div className="relative w-full">
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search"
          required
          value={props.search}
          onChange={props.handleSearch}
        />
      </div>
    </form>
  );
};

export default FilterTopBar;
