import React from 'react';

const Text = ({ label = '', text = '' }) => (
  <div className="mb-4">
    <div className="mb-2">
      {label}
    </div>
    <div className="bg-theme-primary rounded-full text-grey-lightest font-hairline h-12 px-6 py-3 leading-normal overflow-x-scroll">
        {text} 
    </div>
  </div>
  
);

export default Text;
