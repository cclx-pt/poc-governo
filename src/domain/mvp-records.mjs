export const COMMUNITIES = Object.freeze(['sede','almada','moita','barreiro','coruche','caldas-da-rainha','porto','acores']);
export const STATES = Object.freeze(['draft','submitted','approved','rejected','published','withdrawn']);
export const CLASSIFICATIONS = Object.freeze(['public','internal','restricted','confidential']);
const DEFAULTS = Object.freeze({general:'internal',local:'restricted',process:'internal',decision:'restricted'});
export function validateProposal(input) {
  const errors=[];
  if (!input || typeof input !== 'object') return ['Registo inválido'];
  if (!['general','local','process'].includes(input.type)) errors.push('Tipo inválido');
  if (typeof input.title !== 'string' || input.title.trim().length < 3 || input.title.length > 120) errors.push('Título inválido');
  if (typeof input.summary !== 'string' || input.summary.trim().length < 5 || input.summary.length > 2000) errors.push('Descrição inválida');
  if (input.type === 'general' && input.communityId !== 'geral') errors.push('Cultura Geral exige âmbito geral');
  if (input.type !== 'general' && !COMMUNITIES.includes(input.communityId)) errors.push('Comunidade inválida');
  return errors;
}
export function newProposal(input,{id,actorUid,now}) {
  const errors=validateProposal(input);
  if(errors.length) return {ok:false,errors};
  if(!id || !actorUid || !Number.isFinite(now)) return {ok:false,errors:['Metadados inválidos']};
  return {ok:true,record:{id,type:input.type,title:input.title.trim(),summary:input.summary.trim(),
    communityId:input.communityId,classification:DEFAULTS[input.type],state:'draft',
    version:1,createdAt:now,updatedAt:now,createdByUid:actorUid,history:[{action:'created',by:actorUid,at:now,version:1}]}};
}
const ALLOWED = Object.freeze({draft:['submitted'],submitted:['approved','rejected'],approved:['published'],published:['withdrawn'],rejected:['draft'],withdrawn:['draft']});
export function transitionProposal(record,to,{actorUid,now,decisionId,publicationApproval}) {
  if(!record || !STATES.includes(record.state) || !ALLOWED[record.state]?.includes(to)) return {ok:false,reason:'Transição inválida'};
  if(!actorUid || !Number.isFinite(now)) return {ok:false,reason:'Metadados inválidos'};
  if((to==='approved'||to==='rejected') && !decisionId) return {ok:false,reason:'Decisão institucional obrigatória'};
  if(to==='published' && (record.classification!=='public' || publicationApproval?.recordId!==record.id
      || publicationApproval?.version!==record.version || publicationApproval?.approved!==true))
    return {ok:false,reason:'Publicação requer autorização específica para a versão aprovada'};
  const version=record.version+1;
  return {ok:true,record:{...record,state:to,version,updatedAt:now,
    history:[...(record.history??[]),{action:to,by:actorUid,at:now,version,
      ...(decisionId?{decisionId}:{}),...(to==='published'?{publicationApprovalId:publicationApproval.id}: {})}]}};
}
export function publicProjection(record) {
  if(record?.state!=='published'||record.classification!=='public'||!record.history?.some(h=>h.action==='published'&&h.publicationApprovalId)) return null;
  return {id:record.id,title:record.title,summary:record.summary,type:record.type,version:record.version};
}
