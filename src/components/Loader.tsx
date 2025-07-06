import React from 'react';

class Loader extends React.PureComponent {
  render() {
    return (
      <div className="flex justify-center">
        <div className="relative w-[120px] h-[90px] mx-auto">
          <div
            className="
          absolute bottom-[30px] left-[50px] h-[30px] w-[30px] rounded-full bg-[#1e3a8a]
          animate-[loading-bounce_0.5s_ease-in-out_infinite_alternate]
        "
          ></div>
          <div
            className="
          absolute right-0 top-0 h-[7px] w-[45px] rounded-[4px]
          shadow-[0_5px_0_#bfdbfe,_-35px_50px_0_#bfdbfe,_-70px_95px_0_#bfdbfe]
          animate-[loading-step_1s_ease-in-out_infinite]
        "
          ></div>
        </div>
      </div>
    );
  }
}

export default Loader;
