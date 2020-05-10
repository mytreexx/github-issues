import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Welcome from './Welcome/Welcome';
import Issues from './Issues/Issues';


const Main = () => {
  return (
     
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/:userName/:repoName/issues" component={Issues} />
        </Switch>
  );
}

export default Main;
