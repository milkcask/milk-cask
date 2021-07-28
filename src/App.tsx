import React, { ReactComponentElement } from 'react';

import { Switch, Route, useRouteMatch, useHistory, withRouter } from "react-router-dom";
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider} from 'baseui';

import {
  AppNavBar,
  setItemActive,
  NavItemT
} from "baseui/app-nav-bar";
import {
  ChevronDown,
  Delete,
  Overflow,
} from "baseui/icon";

import Load from './components/Load'
import Editor from './components/Editor';

const engine = new Styletron();

const routedNavItems: NavItemT[] = [
  {icon: Overflow, label: 'Load saves', info: {path: '/load'}, active: true},
  {
    icon: ChevronDown,
    label: 'Player editor',
    navExitIcon: Delete,
    info: {path: '/playerEditor/basic', defaultToFirstChild: true},
    children: [
      {icon: Overflow, label: 'Basic', info: {path: '/playerEditor/basic'}},
      {icon: Overflow, label: 'Bundles', info: {path: '/playerEditor/bundles'}},
      {icon: Overflow, label: 'Inventory', info: {path: '/playerEditor/inventory'}},
    ],
  },
  /*{
    icon: ChevronDown,
    label: 'World Editor',
    navExitIcon: Delete,
    info: {path: '/worldEditor/unused', defaultToFirstChild: true},
    children: [
      {icon: Overflow, label: 'Unused', info: {path: '/worldEditor/unused'}},
    ],
  },*/
  {icon: Overflow, label: 'Review changes', info: {path: '/review'}},
  {icon: Overflow, label: 'Export saves', info: {path: '/export'}},
];


function App() {
  const [mainItems, setMainItems] = React.useState<NavItemT[]>( routedNavItems );
  const [reloaded, setReloaded] = React.useState( true );

  /*const userItems = [
    {icon: Overflow, label: 'Account item1'},
    {icon: Overflow, label: 'Account item2'},
    {icon: Overflow, label: 'Account item3'},
    {icon: Overflow, label: 'Account item4'},
  ];*/

  const history = useHistory();
  if ( reloaded ) {
    history.push('/load')
    setReloaded(false);
  }
  
  function handleMainItemSelect(item: NavItemT) {
    if (item.info.defaultToFirstChild) {
      setMainItems(prev => setItemActive(prev, item.children![0]));
    } else {
      setMainItems(prev => setItemActive(prev, item));
    }
    const path = item.info.path || "/0"
    history.push(path)
  }

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
          <AppNavBar
            title="milk-cask {Stardew Editor}"
            mainItems={mainItems}
            onMainItemSelect={handleMainItemSelect}
            /*userItems={userItems}
            onUserItemSelect={item => console.log('user', item)}
            username="Ale"
            usernameSubtitle="5.0"
            userImgUrl=""*/
          />
          <Switch>
            <Route exact path="/load">
              <Load />
            </Route>
            <Route path="/playerEditor/:id">
              <Editor />
            </Route>
          </Switch>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default withRouter(App);
