import test from 'node:test';
import assert from 'node:assert/strict';
import {newProposal,transitionProposal,publicProjection,validateProposal} from '../src/domain/mvp-records.mjs';
const ctx={id:'p1',actorUid:'u1',now:1000};
const input={type:'local',title:'Acolhimento local',summary:'Uma proposta de demonstração.',communityId:'almada'};
test('criação de proposta exige âmbito e campos válidos',()=>{
 assert.equal(validateProposal(input).length,0);
 assert.ok(validateProposal({...input,communityId:'outra'}).length);
 assert.ok(validateProposal({...input,title:'x'}).length);
 const result=newProposal(input,ctx);
 assert.equal(result.ok,true);
 assert.equal(result.record.classification,'restricted');
 assert.equal(result.record.state,'draft');
 assert.equal(result.record.history.length,1);
});
test('decisão do CL é distinta de publicação',()=>{
 const base=newProposal(input,ctx).record;
 const submitted=transitionProposal(base,'submitted',{actorUid:'u1',now:2000}).record;
 assert.equal(transitionProposal(submitted,'approved',{actorUid:'u2',now:3000}).ok,false);
 const approved=transitionProposal(submitted,'approved',{actorUid:'u2',now:3000,decisionId:'d1'}).record;
 assert.equal(publicProjection(approved),null);
 assert.equal(transitionProposal(approved,'published',{actorUid:'u2',now:4000}).ok,false);
 const classified={...approved,classification:'public'};
 assert.equal(transitionProposal(classified,'published',{actorUid:'u2',now:4000,publicationApproval:{id:'a1',recordId:'p1',version:2,approved:true}}).ok,false);
 const result=transitionProposal(classified,'published',{actorUid:'u2',now:4000,publicationApproval:{id:'a1',recordId:'p1',version:3,approved:true}});
 assert.equal(result.ok,true);
 assert.deepEqual(publicProjection(result.record),{id:'p1',title:input.title,summary:input.summary,type:'local',version:4});
});
test('não expor conteúdo sem aprovação de publicação no histórico',()=>{
 const record={id:'p1',title:'Teste',summary:'Texto',type:'general',state:'published',classification:'public',version:2,history:[]};
 assert.equal(publicProjection(record),null);
 assert.equal(transitionProposal(record,'submitted',{actorUid:'u',now:1}).ok,false);
});
