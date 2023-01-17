import { RouteMeta, RouteRecordRaw } from 'vue-router';
import { Permission, User } from '../types';

export interface ModuleConfig {
	id: string;
	name: string;
	icon: string;
	color?: string;

	routes: RouteRecordRaw[];
	hidden?: boolean;
	meta?: RouteMeta;
	preRegisterCheck?: (user: User, permissions: Permission[]) => Promise<boolean> | boolean;
}
