/**
 * Pure, conservative POC policy helpers.
 * This is NOT an authorization engine or approved institutional policy.
 */
export const CONTENT_STATES = Object.freeze(['draft','in_review','approved','published','revoked','archived']);
export const CLASSIFICATIONS = Object.freeze(['public','internal','restricted','confidential']);
export function canAppearInPublicProjection(record) {
  return record?.state === 'published'
    && record?.classification === 'public'
    && record?.publicationApproved === true
    && typeof record?.effectiveFrom === 'string'
    && typeof record?.id === 'string';
}
export function needsLocalVariantReview(variant, reference) {
  if (!variant || !reference) return true;
  return variant.referenceId !== reference.id
    || variant.referenceVersion !== reference.version
    || variant.reviewState !== 'confirmed';
}
export function validateProcessGraph(graph) {
  if (!graph || !Array.isArray(graph.nodes) || !Array.isArray(graph.edges)) return ['Estrutura de grafo inválida'];
  const errors = [];
  const ids = new Set();
  for (const node of graph.nodes) {
    if (typeof node.id !== 'string' || !node.id.trim() || ids.has(node.id)) errors.push('Identificador de nó inválido ou duplicado');
    ids.add(node.id);
  }
  for (const edge of graph.edges) {
    if (!ids.has(edge.source) || !ids.has(edge.target)) errors.push('Ligação com origem ou destino inexistente');
    if (edge.source === edge.target) errors.push('Ligação circular ao próprio nó');
  }
  if (graph.nodes.length === 0) errors.push('O processo não contém etapas');
  return errors;
}
