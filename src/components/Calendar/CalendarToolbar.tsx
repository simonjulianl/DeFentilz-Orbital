import {
  Button,
  HStack,
  Text,
  VStack,
  IconButton,
  useRadioGroup,
  useBreakpointValue,
} from "@chakra-ui/react";
import { RadioCard } from "~/components/Calendar/RadioCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import moment from "moment";
import { useEffect, useState } from "react";

interface ToolbarProps {
  view: any;
  views: any;
  label: any;
  date: any;
  onNavigate: (arg0: string) => void;
  onView: (arg0: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  view,
  date,
  onNavigate,
  onView,
}) => {
  // There are currently three views hard-coded in here: day, month, and threeDay.
  // Prob better to do this as a config file? But the rendered calendar view differs q significantly
  // so it's not like we will change the views...

  // Navigation Buttons
  const goToBack = () => {
    if (view === "day") {
      date.setDate(date.getDate() - 1);
    } else if (view === "month") {
      date.setMonth(date.getMonth() - 1);
    } else if (view === "threeDay") {
      date.setDate(date.getDate() - 3);
    } else if (view === "week") {
      date.setDate(date.getDate() - 7);
    }
    onNavigate("prev");
  };

  const goToNext = () => {
    if (view === "day") {
      date.setDate(date.getDate() + 1);
    } else if (view === "month") {
      date.setMonth(date.getMonth() + 1);
    } else if (view === "threeDay") {
      date.setDate(date.getDate() + 3);
    } else if (view === "week") {
      date.setDate(date.getDate() + 7);
    }
    onNavigate("next");
  };

  const goToCurrent = () => {
    const now = new Date();
    date.setDate(now.getDate());
    date.setMonth(now.getMonth());
    date.setYear(now.getFullYear());
    onNavigate("current");
  };

  const getTitle = () => {
    const moment_date = moment(date);
    return (
      <Text>
        {view === "day" || view === "threeDay" || view === "week"
          ? moment_date.format("ddd DD MMM")
          : moment_date.format("MMMM YYYY")}
      </Text>
    );
  };

  const options = useBreakpointValue({
    base: {
      Day: "day",
      "3 Day": "threeDay",
      Month: "month",
    },
    md: {
      Day: "day",
      "3 Day": "threeDay",
      Week: "week",
      Month: "month",
    },
  });

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "calendarView",
    defaultValue: "day",
    onChange: (value) => {
      onView(value);
    },
  });

  const group = getRootProps();

  const generateRadioCard = () => {
    if (!options) return;
    return Object.entries(options).map(([key, value], _) => (
      <RadioCard key={key} {...getRadioProps({ value })}>
        {key}
      </RadioCard>
    ));
  };

  return (
    <VStack paddingBottom={3}>
      <HStack
        {...group}
        spacing={{
          base: 3,
          md: 10,
        }}
      >
        {generateRadioCard()}
      </HStack>
      <HStack justifyContent={"space-around"}>
        <IconButton
          colorScheme="teal"
          aria-label="Back"
          icon={<FaArrowLeft />}
          onClick={goToBack}
        />
        <Button onClick={goToCurrent}> Today </Button>
        <IconButton
          colorScheme="teal"
          aria-label="Next"
          icon={<FaArrowRight />}
          onClick={goToNext}
        />
      </HStack>
      <Text>{getTitle()}</Text>
    </VStack>
  );
};

export default Toolbar;
