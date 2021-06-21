import { Button, HStack, Text, VStack, IconButton, useRadioGroup} from "@chakra-ui/react";
import { RadioCard } from "~/components/Calendar/RadioCard";
import { FaArrowLeft, FaArrowRight} from "react-icons/fa";
import moment from 'moment';

interface ToolbarProps {
  view: any,
  views: any,
  label: any,
  date: any,
  onNavigate: (arg0 : string) => void,
  onView: (arg0 : string) => void,
}
  
const Toolbar : React.FC<ToolbarProps> = ({view, date, onNavigate, onView}) => {
  // There are currently three views hard-coded in here: day, month, and threeDay. 
  // Prob better to do this as a config file? But the rendered calendar view differs q significantly
  // so it's not like we will change the views...

  // Navigation Buttons
  const goToBack = () => {
    if ( view === 'day') {
      date.setDate(date.getDate() - 1);
    } else if ( view === 'month') {
      date.setMonth(date.getMonth() - 1);
    } else {
      date.setDate(date.getDate() - 3);
    }
    onNavigate('prev');
  };

  const goToNext = () => {
    if ( view === 'day') {
      date.setDate(date.getDate() + 1);
    } else if ( view === 'month') {
      date.setMonth(date.getMonth() + 1);
    } else {
      date.setDate(date.getDate() + 3);
    }
    onNavigate('next');
  };

  const goToCurrent = () => {
    const now = new Date();
    date.setDate(now.getDate());
    date.setMonth(now.getMonth());
    date.setYear(now.getFullYear());
    onNavigate('current');
  };

  const getTitle = () => {
    const moment_date = moment(date);
    return (
      <Text>
        {view === 'day' || view === "threeDay"
          ? moment_date.format("ddd DD MMM")
          : moment_date.format("MMMM YYYY")
        }
      </Text>
    )
  }

  const options = ["Day", "Month", "3 Day"]

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "calendarView",
    defaultValue: "Day",
    onChange: (value) => onView(value === 'Day' ? 'day' : value === 'Month' ? 'month' : "threeDay")
  })

  const group = getRootProps()
  
  return (
    <VStack paddingBottom={3}>
      <HStack {...group}>
        {options.map(
          value => 
            <RadioCard
              key={value}
              {...getRadioProps({ value })}>
              {value}
            </RadioCard>
          )
        }
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
          onClick={goToNext}/>
      </HStack>
      <Text>
        {getTitle()}
      </Text>
    </VStack>
  );
};

export default Toolbar;