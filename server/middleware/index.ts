import { deserializeUser } from './deserializeUser';
import { requireUser } from './requireUser';
import { validateRequest } from './validateRequest';
import { requireAdmin } from './requireAdmin';

export const MW = {
  deserializeUser,
  requireUser,
  validateRequest,
  requireAdmin,
};
