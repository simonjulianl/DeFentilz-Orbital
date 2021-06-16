import TimeGrid from 'react-big-calendar/lib/TimeGrid';
import * as dates from 'date-arithmetic'
import React from 'react';

import { Navigate} from 'react-big-calendar';

class listView extends React.Component<{ date: Date }> {
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
        return <TimeGrid {...this.props} range={range} eventOffset={15} />
    }
  
    static navigate = (date: Date, action: Navigate.PREV | Navigate.NEXT | Navigate.DATE) => {
        switch (action) {
        case Navigate.PREVIOUS:
            return dates.add(date, -3, 'day')
    
        case Navigate.NEXT:
            return dates.add(date, 3, 'day')
    
        default:
            return date
        }
    }
  
    static title = (date: Date) => {
        return `Date: ${date.toLocaleDateString()}`
    }
}

export default listView;
