import { NavLink, Route, Routes } from 'react-router-dom';
import { ArrowUpRight, BookOpen, GitBranch, Landmark, Menu, ShieldCheck, Users } from 'lucide-react';
import { useState } from 'react';
import { FlowPreview } from './components/FlowPreview';

const navigation = [
  { to: '/', label: 'Visão P7', icon: Landmark },
  { to: '/estrutura', label: 'Estrutura', icon: Users },
  { to: '/cultura', label: 'Cultura', icon: BookOpen },
  { to: '/processos', label: 'Processos', icon: GitBranch },
  { to: '/acessos', label: 'Acesso e privacidade', icon: ShieldCheck },
];
const communities = ['Sede', 'Almada', 'Moita', 'Barreiro', 'Coruche', 'Caldas da Rainha', 'Porto', 'Açores'];
function Section({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: React.ReactNode }) {
  return <section className="section"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{description}</p>{children}</section>;
}
function Overview() {
  return <Section eyebrow="P7 / REDEFINIR A CULTURA CCLX" title="A cultura é a forma como fazemos as coisas." description="O Governo CCLX propõe clarificar, documentar e comunicar a cultura comum e a autonomia local, sem gerir tarefas ou projetos.">
    <div className="hero-panel"><span>PROPOSTA · POC</span><h2>Uma cultura comum. Diferentes expressões locais.</h2><p>O Governo define o que é comum; a liberdade local desenvolve-se sem contrariar a cultura geral.</p></div>
    <div className="feature-grid"><article><strong>01</strong><h3>Clareza</h3><p>Princípios, competências e expectativas explícitas.</p></article><article><strong>02</strong><h3>Coerência</h3><p>Uma referência institucional partilhada.</p></article><article><strong>03</strong><h3>Liberdade</h3><p>Adaptações locais dentro dos princípios comuns.</p></article></div>
  </Section>;
}
function Structure() {
  return <Section eyebrow="ORGANIZAÇÃO" title="Uma estrutura compreensível." description="Órgãos, comunidades, pessoas e funções. A representação abaixo é ilustrativa; competências e relações de autoridade carecem de validação.">
    <div className="feature-grid"><article><h3>Conselho de Liderança</h3><p>Órgão institucional · competências por validar</p></article><article><h3>Conselho Pastoral</h3><p>Órgão institucional · competências por validar</p></article><article><h3>CAF</h3><p>Conselho Administrativo e Financeiro · competências por validar</p></article></div>
    <h2 className="subheading">Comunidades</h2><div className="tag-grid">{communities.map(c => <span className="tag" key={c}>{c}</span>)}</div>
  </Section>;
}
function Culture() {
  return <Section eyebrow="MODELO DE CULTURA" title="Definir o comum. Preservar a liberdade." description="A cultura local não é ausência de Governo: é autonomia com limites e responsabilidades reconhecidos.">
    <div className="split"><article className="dark-card"><span>01 / REFERÊNCIA</span><h2>Cultura Definida</h2><p>Princípios e diretrizes gerais aprovados, aplicáveis no âmbito estabelecido.</p></article><article className="light-card"><span>02 / AUTONOMIA</span><h2>Cultura Livre</h2><p>Práticas e adaptações locais que não contradizem, substituem ou anulam a Cultura Geral.</p></article></div>
    <p className="note">A classificação, aprovação e resolução de conflitos permanecem decisões institucionais pendentes.</p>
  </Section>;
}
function Processes() {
  return <Section eyebrow="PROCESSOS E DIRETRIZES" title="Documentar como fazemos." description="Exemplo conceptual de fluxo institucional. Não existe atribuição de tarefas, persistência nem motor de execução nesta POC.">
    <FlowPreview /><p className="note">Fluxo demonstrativo e não aprovado. A edição, as variantes locais, o versionamento e a aprovação são funcionalidades futuras.</p>
  </Section>;
}
function Access() {
  return <Section eyebrow="PRIVACIDADE POR DESENHO" title="Publicar apenas o que é aprovado." description="A experiência pública e a área interna são separadas por permissões, âmbito organizacional e classificação da informação.">
    <div className="split"><article className="light-card"><h2>Portal público</h2><p>Apenas conteúdos explicitamente aprovados para divulgação.</p></article><article className="dark-card"><h2>Área interna</h2><p>Autenticação e autorização por função, âmbito, classificação e ação.</p></article></div>
    <p className="note">A autenticação e a persistência ainda não estão implementadas. As regras Firestore negam todos os acessos.</p>
  </Section>;
}
export default function App() {
  const [open, setOpen] = useState(false);
  return <div className="app-shell"><aside className={open ? 'sidebar open' : 'sidebar'}><div className="brand"><div className="mark">△</div><div><b>GOVERNO CCLX</b><small>PROPOSTA · P7</small></div></div><nav aria-label="Navegação principal">{navigation.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}><Icon size={18} aria-hidden="true"/>{label}<ArrowUpRight size={13} className="nav-arrow" aria-hidden="true"/></NavLink>)}</nav><div className="sidebar-footer">POC · SEM DADOS REAIS</div></aside><main className="main"><header className="topbar"><button className="menu-button" onClick={() => setOpen(!open)} aria-label="Abrir ou fechar navegação" aria-expanded={open}><Menu size={22}/></button><span>GOVERNO CCLX <span className="separator">/</span> PROPOSTA DE DESENVOLVIMENTO</span><span className="status">DEMONSTRAÇÃO</span></header><div className="content"><Routes><Route path="/" element={<Overview/>}/><Route path="/estrutura" element={<Structure/>}/><Route path="/cultura" element={<Culture/>}/><Route path="/processos" element={<Processes/>}/><Route path="/acessos" element={<Access/>}/><Route path="*" element={<Overview/>}/></Routes></div></main></div>;
}
