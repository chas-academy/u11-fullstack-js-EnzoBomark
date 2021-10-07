import { deserializeUser } from './deserializeUser';
import { requireAdmin } from './requireAdmin';
import { requireUser } from './requireUser';
import { validateRequest } from './validateRequest';

export const MW = {
  deserializeUser,
  requireUser,
  validateRequest,
  requireAdmin,
};
