import test from 'node:test';
import assert from 'node:assert/strict';
import { validateNewMember,canDisableMember } from '../src/user-service.mjs';
const local={status:'active',roles:['community_admin'],adminCommunityIds:['almada']};
test('admin local pode propor membro da sua comunidade',()=>{
 const r=validateNewMember({email:' Test@Example.com ',communityId:'almada',roles:['member']},local);
 assert.deepEqual(r.errors,[]);
 assert.equal(r.normalized,'test@example.com');
});
test('admin local não pode escalar privilégios nem atuar noutra comunidade',()=>{
 assert.ok(validateNewMember({email:'test@example.com',communityId:'moita',roles:['member']},local).errors.length);
 assert.ok(validateNewMember({email:'test@example.com',communityId:'almada',roles:['platform_master']},local).errors.length);
 assert.ok(validateNewMember({email:'test@example.com',communityId:'almada',roles:['cl_member']},local).errors.length);
});
test('admin local não pode desativar CL ou Master',()=>{
 assert.equal(canDisableMember(local,{communityId:'almada',roles:['member']}),true);
 assert.equal(canDisableMember(local,{communityId:'almada',roles:['cl_member']}),false);
 assert.equal(canDisableMember(local,{communityId:'almada',roles:['platform_master']}),false);
 assert.equal(canDisableMember(local,{communityId:'moita',roles:['member']}),false);
});
