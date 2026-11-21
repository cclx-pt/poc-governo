/**
 * Bootstrap identity for the first authenticated deployment.
 * This is configuration data only, never an authorization mechanism.
 * Bind roles to a verified identity provider UID on the server before activation.
 */
export const INITIAL_ADMIN = Object.freeze({
  email: 'ricardoribeiro9@gmail.com',
  roles: Object.freeze(['platform_master', 'cl_member']),
  institutionalBody: 'conselho_de_lideranca',
  status: 'pending_identity_verification'
});

export function validateBootstrapAssignment(assignment) {
  const errors = [];
  if (typeof assignment?.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(assignment.email)) errors.push('email inválido');
  if (!Array.isArray(assignment?.roles) || !assignment.roles.includes('platform_master') || !assignment.roles.includes('cl_member')) errors.push('papéis iniciais inválidos');
  if (assignment?.institutionalBody !== 'conselho_de_lideranca') errors.push('órgão institucional inválido');
  if (assignment?.status !== 'pending_identity_verification') errors.push('atribuição não pode ser ativada sem verificação');
  return errors;
}
