import { Route } from '@angular/router';
import { ProtectedComponent } from './protected.component';
import { ProfileComponent } from '../profile/profile.component';

export const PROTECTED_FEATURE_ROUTES: Route[] = [
  { path: '', component: ProtectedComponent },
  { path: 'profile', component: ProfileComponent },
];
