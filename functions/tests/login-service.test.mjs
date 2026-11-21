import test from 'node:test';
import assert from 'node:assert/strict';
import { requestLoginLink, redeemLoginLink, hashToken, LINK_TTL_MS } from '../src/login-service.mjs';
const active={id:'u1',uid:'firebase-uid-1',email:'member@example.com',status:'active'};
function harness(user=active, throttle=true) {
  const calls=[]; let link;
  return {calls,getLink:()=>link,deps:{
    allowAttempt:async()=>{calls.push('limit');return throttle;},
    findUser:async()=>{calls.push('lookup');return user;},
    storeChallenge:async()=>{calls.push('store');},
    sendLink:async(_,value)=>{calls.push('send');link=value;},
    audit:async()=>{},
    baseUrl:'https://governo.example.org'
  }};
}
test('apenas utilizadores ativos e previamente registados recebem link',async()=>{
  const ok=harness(); const answer=await requestLoginLink(active.email,ok.deps);
  assert.deepEqual(ok.calls,['limit','lookup','store','send']);
  assert.ok(ok.getLink().startsWith('https://governo.example.org/auth/confirm?'));
  for (const user of [null,{...active,status:'disabled'},{...active,status:'invited'},{...active,uid:null}]) {
    const blocked=harness(user);
    assert.deepEqual(await requestLoginLink(active.email,blocked.deps),answer);
    assert.deepEqual(blocked.calls,['limit','lookup']);
  }
});
test('limite de pedidos impede consulta e envio',async()=>{
  const blocked=harness(active,false);
  await requestLoginLink(active.email,blocked.deps);
  assert.deepEqual(blocked.calls,['limit']);
});
test('falha de envio não revela estado da conta',async()=>{
  const a=harness();a.deps.sendLink=async()=>{throw Error('provider failure');};
  assert.deepEqual(await requestLoginLink(active.email,a.deps),await requestLoginLink(active.email,harness(null).deps));
});
test('resgate de link exige token e challenge válidos e conta ativa',async()=>{
  const token='a'.repeat(43),challengeId='b'.repeat(32);let consumed=false;
  const deps={consumeChallenge:async(id,digest,now)=>{
    if(consumed||id!==challengeId||digest!==hashToken(token)||now>1000+LINK_TTL_MS) return null;
    consumed=true;return {uid:active.uid};
  },findUserByUid:async()=>active,createCustomToken:async uid=>'firebase-custom-token:'+uid,now:()=>1000};
  assert.equal(await redeemLoginLink({challengeId,token},deps),'firebase-custom-token:firebase-uid-1');
  assert.equal(await redeemLoginLink({challengeId,token},deps),null);
  assert.equal(await redeemLoginLink({challengeId,token:'bad'},deps),null);
});
test('resgate recusa conta revogada depois de emitir link',async()=>{
  const token='c'.repeat(43),challengeId='d'.repeat(32);
  const deps={consumeChallenge:async()=>({uid:active.uid}),findUserByUid:async()=>({...active,status:'disabled'}),createCustomToken:async()=>{throw Error('must not run');}};
  assert.equal(await redeemLoginLink({challengeId,token},deps),null);
});
