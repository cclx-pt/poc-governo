import { onRequest } from 'firebase-functions/v2/https';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { createHash } from 'node:crypto';
import { GENERIC_LOGIN_RESPONSE } from './guards.mjs';
import { requestLoginLink, redeemLoginLink } from './login-service.mjs';

initializeApp();
const db = getFirestore();
const auth = getAuth();
const hash = value => createHash('sha256').update(value).digest('hex');
function reply(res, status, body) {
  res.set('Cache-Control','no-store');
  return res.status(status).json(body);
}
function originAllowed(req,res) {
  const origin = req.headers.origin;
  const allowed = process.env.PUBLIC_APP_URL;
  if (origin && (!allowed || new URL(allowed).origin !== origin)) return false;
  if (origin) {
    res.set('Access-Control-Allow-Origin',origin);
    res.set('Vary','Origin');
  }
  return true;
}
async function consumeLimit(key, max, windowMs) {
  const ref = db.collection('authRateLimits').doc(hash(key));
  return db.runTransaction(async tx => {
    const snap=await tx.get(ref);
    const now=Date.now();
    const current=snap.exists?snap.data():null;
    const resetAt=current?.resetAt > now ? current.resetAt : now+windowMs;
    const count=current?.resetAt > now ? current.count ?? 0 : 0;
    if(count>=max) return false;
    tx.set(ref,{count:count+1,resetAt});
    return true;
  });
}
async function getUserByUid(uid) {
  const snap=await db.collection('usersByUid').doc(uid).get();
  return snap.exists ? snap.data() : null;
}
export const requestAccessLink = onRequest({region:'europe-west1',invoker:'public',maxInstances:5}, async(req,res)=>{
  if (!originAllowed(req,res)) return reply(res,403,{message:'Pedido não autorizado'});
  if(req.method==='OPTIONS') return res.status(204).send('');
  if(req.method!=='POST') return reply(res,405,GENERIC_LOGIN_RESPONSE);
  const email=req.body?.email;
  const ipHash=hash(String(req.ip || 'unknown'));
  const result=await requestLoginLink(email,{
    baseUrl:process.env.PUBLIC_APP_URL,
    allowAttempt:async key=>{
      const ipAllowed=await consumeLimit('ip:'+ipHash,30,60*60*1000);
      const emailAllowed=await consumeLimit('email:'+key,3,60*60*1000);
      return ipAllowed && emailAllowed;
    },
    findUser:async key=>{
      const snap=await db.collection('userDirectory').doc(key).get();
      return snap.exists ? snap.data() : null;
    },
    storeChallenge:async challenge=>db.collection('loginChallenges').doc(challenge.challengeId).create({...challenge,used:false,createdAt:Date.now()}),
    // Requires a configured Firebase Trigger Email extension; no extension => no delivery.
    sendLink:async(email,link)=>db.collection('mail').add({to:[email],message:{
      subject:'Acesso ao Governo CCLX',
      text:'Para entrar no Governo CCLX, utiliza este link de acesso único (válido durante 15 minutos): '+link
    }}),
    audit:async event=>db.collection('auditEvents').add({...event,at:Date.now()})
  });
  return reply(res,200,result);
});
export const exchangeAccessLink = onRequest({region:'europe-west1',invoker:'public',maxInstances:5},async(req,res)=>{
  if(!originAllowed(req,res)) return reply(res,403,{message:'Pedido não autorizado'});
  if(req.method==='OPTIONS') return res.status(204).send('');
  if(req.method!=='POST') return reply(res,405,{message:'Método não permitido'});
  try {
    const customToken=await redeemLoginLink(req.body ?? {},{
      consumeChallenge:async(id,digest,now)=>{
        const ref=db.collection('loginChallenges').doc(id);
        return db.runTransaction(async tx=>{
          const snap=await tx.get(ref);
          if(!snap.exists) return null;
          const c=snap.data();
          if(c.used || c.expiresAt<=now || c.tokenHash!==digest) return null;
          tx.update(ref,{used:true,usedAt:now});
          return {uid:c.uid};
        });
      },
      findUserByUid:getUserByUid,
      createCustomToken:uid=>auth.createCustomToken(uid)
    });
    if(!customToken) return reply(res,401,{message:'Link inválido ou expirado'});
    return reply(res,200,{customToken});
  } catch {
    return reply(res,401,{message:'Link inválido ou expirado'});
  }
});
