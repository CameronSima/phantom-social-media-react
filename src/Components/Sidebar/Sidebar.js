import React from 'react';
import { CommunityDetails } from './CommunityDetails';

const SideBar = (props) => (
    <div className="col-md-4 sidebar d-none d-md-block">
      <CommunityDetails { ...props } />
    </div>
  )

  export default SideBar;