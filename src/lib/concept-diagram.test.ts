import {describe,it,expect} from 'vitest';
import {parseConceptGraph,splitConceptLabel,type ConceptNode} from './concept-diagram';

const sourceFiles=import.meta.glob<string>('../../content/data/batch_*.jsonl',{query:'?raw',import:'default',eager:true});
function flatten(node:ConceptNode):ConceptNode[]{return [node,...node.children.flatMap(flatten)];}

describe('content-preserving mobile diagram layout',()=>{
  it('parses all 5,111 original Mermaid diagrams, including 4-node exceptions',()=>{
    const paths=Object.keys(sourceFiles).sort();
    expect(paths).toHaveLength(64);
    let total=0,three=0,four=0;
    for(const path of paths){
      for(const line of sourceFiles[path].split(/\r?\n/).filter(Boolean)){
        const record=JSON.parse(line) as {word:string;diagram_mermaid:string};
        const parsed=parseConceptGraph(record.diagram_mermaid);
        expect(parsed,record.word+' in '+path).not.toBeNull();
        const labels=flatten(parsed!).map(n=>n.label);
        const originals=[...record.diagram_mermaid.matchAll(/^\s*[A-Za-z]\w*\["([^"]+)"\]/gm)].map(m=>m[1]);
        // No label may be dropped, abbreviated or combined.
        expect(labels.sort()).toEqual(originals.sort());
        if(labels.length===3)three++;
        else if(labels.length===4)four++;
        else throw new Error('Unexpected graph in '+path+': '+record.word);
        total++;
      }
    }
    expect(total).toBe(5111);
    expect(three).toBe(5102);
    expect(four).toBe(9);
  });
  it('refuses an ambiguous multi-parent graph rather than altering meaning',()=>{
    expect(parseConceptGraph('flowchart LR\n A["one"]\n B["two"]\n C["three"]\n A --> C\n B --> C')).toBeNull();
  });
  it('keeps lengthy labels without clipping or stripping punctuation',()=>{
    const original='見落としやすい意味：見落としやすい、長い日本語の説明（句読点・括弧）';
    expect(splitConceptLabel(original)).toEqual({heading:'見落としやすい意味',detail:'見落としやすい、長い日本語の説明（句読点・括弧）'});
  });
});
