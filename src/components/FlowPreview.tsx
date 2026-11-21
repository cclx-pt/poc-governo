import { useCallback, useState } from 'react';
import { ReactFlow, Background, Controls, type Edge, type Node, type OnNodesChange, applyNodeChanges } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  { id: 'a', position: { x: 50, y: 110 }, data: { label: 'Diretriz geral' }, type: 'input' },
  { id: 'b', position: { x: 310, y: 110 }, data: { label: 'Validação institucional' } },
  { id: 'c', position: { x: 610, y: 110 }, data: { label: 'Publicação aprovada' }, type: 'output' },
];
const edges: Edge[] = [{ id: 'ab', source: 'a', target: 'b' }, { id: 'bc', source: 'b', target: 'c' }];
export function FlowPreview() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const onNodesChange: OnNodesChange<Node> = useCallback(changes => setNodes(nds => applyNodeChanges(changes, nds)), []);
  return <div className="flow-wrap" role="region" aria-label="Pré-visualização de processo institucional"><ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} nodesConnectable={false} elementsSelectable={false} fitView><Background gap={18} color="#e5e5e5"/><Controls showInteractive={false}/></ReactFlow></div>;
}
