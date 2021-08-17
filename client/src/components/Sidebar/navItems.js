export const navItems = [
	{
		label: 'Home',
		path: 'home',
		icon: 'home',
		allowedRoles: ['admin', 'facilitator', 'student'],
	},
	{
		label: 'Dashboard',
		path: 'dashboard',
		icon: 'dashboard',
		allowedRoles: ['admin', 'facilitator'],
	},
	{
		label: 'Users',
		path: 'user',
		icon: 'supervised_user_circle',
		allowedRoles: ['admin'],
	},
	{
		label: 'Schedule',
		path: 'match',
		icon: 'pending_actions',
		allowedRoles: ['facilitator'],
	},
	{
		label: 'Teams',
		path: 'team',
		icon: 'groups',
		allowedRoles: ['admin'],
	},
	{
		label: 'Settings',
		path: 'auth-settings',
		icon: 'settings',
		allowedRoles: ['admin', 'facilitator'],
	},
];
