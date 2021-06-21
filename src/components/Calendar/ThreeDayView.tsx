import TimeGrid from 'react-big-calendar/lib/TimeGrid';
import { Navigate } from 'react-big-calendar'
import * as dates from 'date-arithmetic'
import React from 'react';

interface OwnProps {
    date : Date
}

class ThreeDayView extends React.Component<OwnProps> {
    render() {
      const rangeFn = (date : Date) => {
            let start = date
            let end = dates.add(start, 2, 'day')
        
            let current = start
            let range = []
        
            while (dates.lte(current, end, 'day')) {
            range.push(current)
            current = dates.add(current, 1, 'day')
            }
        
            return range
        }
        let { date } = this.props;
        let range = rangeFn(date);
        return <TimeGrid
                    {...this.props}
                    range={range}
                    eventOffset={15}
                />
    }

    static title = (date: Date) => {
        return `Date: ${date.toLocaleDateString()}`
    }

    static navigate = (date, action) => {
        switch (action) {
          case Navigate.prev:
            return dates.add(date, -3, 'day')
      
          case Navigate.next:
            return dates.add(date, 3, 'day')
      
          default:
            return date
        }
      }
}

export default ThreeDayView;
