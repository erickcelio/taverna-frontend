import ChatPage from '../pages/chat'
import GroupPage from '../pages/group'
import HomePage from '../pages/home'
import SettingsPage from '../pages/settings'
import TaskPage from '../pages/task'
import { faCog, faCommentDots, faHome, faTasks, faUsers } from '@fortawesome/free-solid-svg-icons'

export default [
  {
    path: '/home',
    name: 'home',
    icon: 'home',
    component: HomePage
  },
  {
    path: '/group',
    name: 'group',
    icon: 'team',
    component: GroupPage
  },
  {
    path: '/chat',
    name: 'chat',
    icon: 'message',
    component: ChatPage
  },
  {
    path: '/tasks',
    name: 'tasks',
    icon: 'profile',
    component: TaskPage
  },
  {
    path: '/settings',
    name: 'settings',
    icon: 'setting',
    component: SettingsPage
  }
]
