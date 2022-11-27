import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'На главную',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Карта',
    path: '/map',
    icon: <FaIcons.FaMapMarkerAlt />,
    cName: 'nav-text'
  },
  /*{
    title: 'История вычислений',
    path: '/history',
    icon: <AiIcons.AiOutlineHistory />,
    cName: 'nav-text'
  },*/
  {
    title: 'База квартир',
    path: '/advertisements',
    icon: <AiIcons.AiOutlineDatabase />,
    cName: 'nav-text'
  },
];