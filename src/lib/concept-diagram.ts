export interface ConceptNode {
  id:string;
  label:string;
  children:ConceptNode[];
}

// Only convert graphs whose original meaning is preserved exactly: one rooted,
// directed tree. Unknown Mermaid syntax is delegated to the normal renderer.
export function parseConceptGraph(source:string):ConceptNode|null {
  const lines=source.trim().split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
  if(!/^(?:flowchart|graph)\s+(?:LR|RL|TB|TD|BT)$/i.test(lines.shift()??''))return null;
  const nodes=new Map<string,string>(),edges:[string,string][]=[];
  for(const line of lines){
    const node=line.match(/^([A-Za-z]\w*)\s*\[\s*"((?:\\.|[^"\\])*)"\s*\]$/);
    if(node){if(nodes.has(node[1]))return null;nodes.set(node[1],node[2].replace(/\\"/g,'"'));continue;}
    const edge=line.match(/^([A-Za-z]\w*)\s*-->\s*([A-Za-z]\w*)$/);
    if(edge){edges.push([edge[1],edge[2]]);continue;}
    return null;
  }
  if(nodes.size<2||nodes.size>8||edges.length!==nodes.size-1)return null;
  const incoming=new Map<string,number>();
  const children=new Map<string,string[]>();
  for(const [from,to] of edges){
    if(!nodes.has(from)||!nodes.has(to)||from===to)return null;
    incoming.set(to,(incoming.get(to)??0)+1);
    if(incoming.get(to)!>1)return null; // a multi-parent DAG needs Mermaid instead
    children.set(from,[...(children.get(from)??[]),to]);
  }
  const roots=[...nodes.keys()].filter(id=>!incoming.has(id));
  if(roots.length!==1)return null;
  const visited=new Set<string>();
  function walk(id:string):ConceptNode|null{
    if(visited.has(id))return null;
    visited.add(id);
    const descendants:ConceptNode[]=[];
    for(const child of children.get(id)??[]){
      const result=walk(child);
      if(!result)return null;
      descendants.push(result);
    }
    return {id,label:nodes.get(id)!,children:descendants};
  }
  const root=walk(roots[0]);
  return root&&visited.size===nodes.size?root:null;
}

export function splitConceptLabel(label:string):{heading?:string;detail:string}{
  const match=label.match(/^([^：:]{2,17})[：:]\s*(.*)$/s);
  return match?{heading:match[1],detail:match[2]}:{detail:label};
}
