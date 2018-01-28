import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import TopicList from '../views/topic-list/index';
import TopicDetail from '../views/topic-detail/index';

export default () => [
  <Route key="1" path="/" render={() => <Redirect to="/list" />} exact />,
  <Route key="2" path="/list" component={TopicList} />,
  <Route key="3" path="/detail" component={TopicDetail} />
];
