import React from 'react';
import { cn } from '../utils/cn';

class Loader extends React.PureComponent {
  render() {
    return (
      <div aria-label="load content" className="flex justify-center">
        <div className="relative mx-auto h-24 w-32">
          <div
            className={cn(
              'absolute bottom-8 left-12 h-8 w-8',
              'animate-[loading-bounce_0.5s_ease-in-out_infinite_alternate] rounded-full bg-blue-700'
            )}
          ></div>
          <div
            className={cn(
              'absolute top-0 right-0 h-2 w-12 animate-[loading-step_1s_ease-in-out_infinite]',
              'rounded-b-sm shadow-blue-200'
            )}
          ></div>
        </div>
      </div>
    );
  }
}

export default Loader;
