import React from 'react';
import Bar from './components';
import Logo from '@/layouts/Logo';
import NavMenu from './items/menu';
import { ApplicationInfo } from '@/types';

interface NavBarMenuData {
  apps: ApplicationInfo[];
}

const renderNavContent = (menuData: ApplicationInfo[]) => {
  return [<Logo key='logo' />, <NavMenu key='menu' apps={menuData} />];
};

const DefaultNavbar: React.FC<NavBarMenuData> = ({ apps }) => {
  return (
    <Bar id={'root-navbar'} view={'default'}>
      {renderNavContent(apps)}
    </Bar>
  );
};

const LoginNavbar: React.FC<{}> = () => {
  return (
    <Bar id={'root-navbar'} view={'login'}>
      <Logo key='logo' />
    </Bar>
  );
};

const Navbar = { default: DefaultNavbar, login: LoginNavbar };

export default Navbar;
