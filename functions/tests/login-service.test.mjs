import test from 'node:test';
import assert from 'node:assert/strict';
import { requestLoginLink } from '../src/login-service.mjs';
const active={id:'u1',email:'member@example.com',status:'active'};
function harness(user=active, throttle=true) {
  const calls=[];
  return {calls,deps:{
    allowAttempt:async()=>{calls.push('limit');return throttle;},
    findUser:async()=>{calls.push('lookup');return user;},
    createLink:async()=>{calls.push('create');return 'https://example.test/link';},
    sendLink:async()=>{calls.push('send');},
    audit:async()=>{}
  }};
}
test('apenas utilizadores ativos recebem link',async()=>{
  const ok=harness(); const answer=await requestLoginLink(active.email,ok.deps);
  assert.deepEqual(ok.calls,['limit','lookup','create','send']);
  for (const user of [null,{...active,status:'disabled'},{...active,status:'invited'}]) {
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
  const a=harness();
  a.deps.sendLink=async()=>{throw Error('email provider failure');};
  const known=await requestLoginLink(active.email,a.deps);
  const unknown=await requestLoginLink(active.email,harness(null).deps);
  assert.deepEqual(known,unknown);
});
