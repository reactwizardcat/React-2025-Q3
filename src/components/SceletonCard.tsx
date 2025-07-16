import React from 'react';

class SceletonCard extends React.PureComponent {
  render() {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
        <div className="h-12 bg-gray-200 rounded-full w-3/4 mx-auto mb-4"></div>

        <div className="space-y-3 mb-4">
          <div className="h-5 bg-gray-200 rounded w-full">
            <div className="h-4 bg-gray-300 rounded w-1/3 inline-block mr-2"></div>
          </div>
          <div className="h-5 bg-gray-200 rounded w-full">
            <div className="h-4 bg-gray-300 rounded w-1/3 inline-block mr-2"></div>
          </div>
          <div className="h-5 bg-gray-200 rounded w-full">
            <div className="h-4 bg-gray-300 rounded w-1/3 inline-block mr-2"></div>
          </div>
        </div>
        <div className="h-80 bg-gray-200 rounded-md overflow-hidden"></div>
      </div>
    );
  }
}

export default SceletonCard;
