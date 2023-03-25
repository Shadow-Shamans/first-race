import { useState, FC } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { menuLinks } from './constants';



const AppMenu: FC = () => {
  const [current, setCurrent] = useState('mail');
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    navigate(`/${e.key}`)
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={menuLinks}
    />
  );
};

export default AppMenu;
