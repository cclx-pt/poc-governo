import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

type Classification = 'public' | 'internal' | 'restricted' | 'confidential';
type State = 'draft' | 'submitted' | 'approved' | 'rejected' | 'published';
type Proposal = { id: string; title: string; summary: string; community: string; classification: Classification; state: State; type: 'general' | 'local'; version: number };
type Member = { id: string; name: string; community: string; role: 'member' | 'community_admin' | 'cl_member' };
type DemoData = { proposals: Proposal[]; members: Member[] };
const communities = ['Sede','Almada','Moita','Barreiro','Coruche','Caldas da Rainha','Porto','Açores'];
const seed: DemoData = {
  proposals: [
    {id:'C-001',title:'Princípios da cultura CCLX',summary:'Referência institucional ilustrativa para a cultura comum.',community:'Geral',classification:'internal',state:'approved',type:'general',version:1},
    {id:'C-002',title:'Acolhimento de novos participantes',summary:'Exemplo de proposta de adaptação local, sujeita à decisão do CL.',community:'Almada',classification:'restricted',state:'submitted',type:'local',version:1},
    {id:'C-003',title:'Missão e identidade',summary:'Conteúdo fictício preparado exclusivamente para demonstrar o portal público.',community:'Geral',classification:'public',state:'published',type:'general',version:1}
  ],
  members: [
    {id:'U-001',name:'Utilizador de demonstração',community:'Sede',role:'cl_member'},
    {id:'U-002',name:'Administrador local (exemplo)',community:'Almada',role:'community_admin'}
  ]
};
const key='governo-cclx-demo-v1';
function initialData():DemoData {
  try {
    const raw=localStorage.getItem(key);
    if(raw) {
      const parsed:unknown=JSON.parse(raw);
      if(parsed && typeof parsed==='object' && 'proposals' in parsed && 'members' in parsed
        && Array.isArray(parsed.proposals) && Array.isArray(parsed.members)) return parsed as DemoData;
    }
  } catch { /* browser storage unavailable */ }
  return seed;
}
const labels:Record<Classification,string>={public:'Público',internal:'Interno',restricted:'Restrito',confidential:'Confidencial'};
const states:Record<State,string>={draft:'Rascunho',submitted:'Em apreciação pelo CL',approved:'Aprovado pelo CL',rejected:'Rejeitado',published:'Publicado'};
const roleLabels:Record<Member['role'],string>={member:'Membro',community_admin:'Administrador local',cl_member:'Membro do CL'};
function nextId(prefix:string) { return prefix+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,6); }
export function PublicDemo({data}:{data:DemoData}) {
  const published=data.proposals.filter(p=>p.classification==='public'&&p.state==='published');
  return <div className="mvp-panel"><p className="eyebrow">PORTAL PÚBLICO · DEMONSTRAÇÃO</p><h2>Conhecer a CCLX</h2><p>Esta página simula a consulta pública, sem autenticação. Contém apenas textos fictícios aprovados para demonstração.</p>
    <div className="mvp-cards">{published.map(p=><article key={p.id}><span className="mvp-meta">INFORMAÇÃO PÚBLICA</span><h3>{p.title}</h3><p>{p.summary}</p></article>)}</div>
    {!published.length&&<p>Não existem conteúdos publicados.</p>}
    <p className="note">Os dados desta demonstração estão guardados apenas neste navegador. O portal público real terá uma base de dados separada e controlos de publicação no servidor.</p>
  </div>;
}
export function MvpDemo({view='workspace'}:{view?:'workspace'|'public'}) {
  const [data,setData]=useState<DemoData>(initialData);
  const [tab,setTab]=useState<'proposals'|'members'>('proposals');
  const [title,setTitle]=useState('');
  const [summary,setSummary]=useState('');
  const [community,setCommunity]=useState('Almada');
  const [type,setType]=useState<'general'|'local'>('local');
  const [memberName,setMemberName]=useState('');
  const [memberCommunity,setMemberCommunity]=useState('Almada');
  const [notice,setNotice]=useState('');
  useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(data));}catch{/* storage unavailable */}},[data]);
  function addProposal(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(!title.trim()||!summary.trim()) return;
    const item:Proposal={id:nextId('C'),title:title.trim(),summary:summary.trim(),community:type==='general'?'Geral':community,classification:type==='general'?'internal':'restricted',state:'draft',type,version:1};
    setData(prev=>({...prev,proposals:[item,...prev.proposals]}));setTitle('');setSummary('');setNotice('Proposta criada como rascunho.');
  }
  function changeState(id:string,state:State) {
    setData(prev=>({...prev,proposals:prev.proposals.map(p=>p.id===id?{...p,state,version:p.version+1}:p)}));
    setNotice('Estado atualizado apenas na demonstração.');
  }
  function changeClassification(id:string,classification:Classification) {
    setData(prev=>({...prev,proposals:prev.proposals.map(p=>p.id===id?{...p,classification,state:'draft',version:p.version+1}:p)}));
    setNotice('Classificação alterada na simulação; a publicação foi retirada. Na aplicação real, reduzir a restrição exige aprovação.');
  }
  function addMember(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();if(!memberName.trim())return;
    setData(prev=>({...prev,members:[...prev.members,{id:nextId('U'),name:memberName.trim(),community:memberCommunity,role:'member'}]}));
    setMemberName('');setNotice('Membro fictício adicionado. Nenhum convite ou email é enviado.');
  }
  function reset() {setData(seed);setNotice('Dados fictícios repostos.');}
  if(view==='public') return <PublicDemo data={data}/>;
  return <div className="mvp-panel">
    <div className="mvp-banner"><strong>AMBIENTE DE DEMONSTRAÇÃO</strong><span>Sem autenticação real · sem Firebase · não introduzir dados pessoais</span></div>
    <div className="mvp-heading"><div><p className="eyebrow">MVP / ESPAÇO DE TESTES</p><h2>Experimentar o Governo CCLX</h2><p>Cria propostas, simula decisões do CL e observa que conteúdos ficam visíveis no portal público.</p></div><button type="button" className="mvp-button secondary" onClick={reset}>Repor demonstração</button></div>
    <div className="mvp-stats"><article><strong>{data.proposals.length}</strong><span>Propostas</span></article><article><strong>{data.proposals.filter(p=>p.state==='submitted').length}</strong><span>Em apreciação</span></article><article><strong>{data.proposals.filter(p=>p.state==='published'&&p.classification==='public').length}</strong><span>Públicas</span></article><article><strong>{data.members.length}</strong><span>Membros fictícios</span></article></div>
    <div className="mvp-tabs"><button type="button" className={tab==='proposals'?'selected':''} onClick={()=>setTab('proposals')}>Cultura e decisões</button><button type="button" className={tab==='members'?'selected':''} onClick={()=>setTab('members')}>Utilizadores</button><Link to="/portal-publico">Ver portal público →</Link></div>
    {notice&&<p role="status" className="mvp-notice">{notice}</p>}
    {tab==='proposals'?<><form className="mvp-form" onSubmit={addProposal}><h3>Nova proposta</h3><div className="mvp-form-grid"><label>Tipo<select value={type} onChange={e=>setType(e.target.value as 'general'|'local')}><option value="local">Variante local</option><option value="general">Cultura Geral</option></select></label><label>Comunidade<select value={community} disabled={type==='general'} onChange={e=>setCommunity(e.target.value)}>{communities.map(c=><option key={c}>{c}</option>)}</select></label></div><label>Título<input required maxLength={120} value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título da proposta"/></label><label>Descrição<textarea required maxLength={1200} rows={3} value={summary} onChange={e=>setSummary(e.target.value)} placeholder="Descreve a proposta (apenas dados fictícios)"/></label><button className="mvp-button" type="submit">Criar proposta</button></form>
    <h3>Propostas e decisões</h3><div className="mvp-cards">{data.proposals.map(p=><article key={p.id}><div className="mvp-row"><span className="mvp-meta">{p.id} · {p.community} · v{p.version}</span><span className="mvp-chip">{labels[p.classification]}</span></div><h3>{p.title}</h3><p>{p.summary}</p><p className="mvp-state">{states[p.state]}</p><div className="mvp-actions">
      {p.state==='draft'&&<button type="button" onClick={()=>changeState(p.id,'submitted')}>Submeter ao CL</button>}
      {p.state==='submitted'&&<><button type="button" onClick={()=>changeState(p.id,'approved')}>Simular aprovação CL</button><button type="button" onClick={()=>changeState(p.id,'rejected')}>Rejeitar</button></>}
      {p.state==='approved'&&p.classification==='public'&&<button type="button" onClick={()=>changeState(p.id,'published')}>Simular publicação</button>}
      {p.state==='published'&&<button type="button" onClick={()=>changeState(p.id,'draft')}>Retirar publicação</button>}
      <label>Classificação<select value={p.classification} onChange={e=>changeClassification(p.id,e.target.value as Classification)}>{Object.entries(labels).map(([value,label])=><option value={value} key={value}>{label}</option>)}</select></label>
    </div></article>)}</div></>:<><form className="mvp-form" onSubmit={addMember}><h3>Adicionar membro fictício</h3><label>Nome de demonstração<input required maxLength={100} value={memberName} onChange={e=>setMemberName(e.target.value)} placeholder="Ex.: Membro de teste"/></label><label>Comunidade<select value={memberCommunity} onChange={e=>setMemberCommunity(e.target.value)}>{communities.map(c=><option key={c}>{c}</option>)}</select></label><button className="mvp-button" type="submit">Adicionar membro</button></form><div className="mvp-cards">{data.members.map(m=><article key={m.id}><span className="mvp-meta">{m.id} · {m.community}</span><h3>{m.name}</h3><p>{roleLabels[m.role]}</p></article>)}</div></>}
    <p className="note">Todas as operações nesta página são simulações locais, sem autorização institucional efetiva. Não introduzir nomes reais nem dados confidenciais. O armazenamento local pode ser apagado pelo navegador.</p>
  </div>;
}
