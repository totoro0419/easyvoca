import {test,expect,type Page} from '@playwright/test';

type Sample={candidate_id:string;word:string;hidden_meaning_ja:string;category:string};
async function chooseExamples(page:Page):Promise<Sample[]>{
  return page.evaluate(async()=>{
    type Card={candidate_id:string;word:string;hidden_meaning_ja:string;example_en:string;core_image_explanation_ja:string;usage_notes?:string[]|string};
    const cards:Card[]=[];
    for(let n=0;n<26;n++){
      const r=await fetch('/easyvoca/generated/chunks/chunk-'+String(n).padStart(3,'0')+'.json');
      cards.push(...await r.json() as Card[]);
    }
    const total=(c:Card)=>c.word.length+c.hidden_meaning_ja.length+c.example_en.length+c.core_image_explanation_ja.length;
    const sorted=[...cards].sort((a,b)=>total(a)-total(b));
    const choose=(category:string,c:Card)=>({category,candidate_id:c.candidate_id,word:c.word,hidden_meaning_ja:c.hidden_meaning_ja});
    const longest=(key:'example_en'|'hidden_meaning_ja'|'core_image_explanation_ja')=>
      cards.reduce((a,b)=>b[key].length>a[key].length?b:a);
    const notes=(c:Card)=>Array.isArray(c.usage_notes)?c.usage_notes.join(' ').length:(c.usage_notes||'').length;
    const withUsage=cards.reduce((a,b)=>notes(b)>notes(a)?b:a);
    return [
      choose('short',sorted[0]),
      choose('median',sorted[Math.floor(sorted.length/2)]),
      choose('longEnglish',longest('example_en')),
      choose('longMeaning',longest('hidden_meaning_ja')),
      choose('longCore',longest('core_image_explanation_ja')),
      choose('usage',withUsage)
    ];
  });
}
async function openSample(page:Page,sample:Sample){
  await page.getByRole('button',{name:'検索',exact:true}).click();
  const search=page.getByRole('searchbox',{name:'単語や日本語の意味で検索'});
  await search.fill(sample.word);
  const result=page.locator('.result-item').filter({hasText:sample.hidden_meaning_ja}).first();
  await expect(result).toBeVisible({timeout:12000});
  await result.click();
  await expect(page.locator('.reading-page .concept-wrap')).toBeVisible();
}
test('6種類の実教材を5画面幅で計測し、図が横にはみ出さず全文が表示される',async({page})=>{
  test.setTimeout(190000);
  await page.goto('/');
  const examples=await chooseExamples(page);
  expect(examples).toHaveLength(6);
  const sizes=[{width:360,height:740},{width:390,height:844},{width:412,height:915},{width:820,height:1100},{width:1280,height:800}];
  const report:Record<string,number>={};
  for(const size of sizes){
    await page.setViewportSize(size);
    for(const sample of examples){
      await openSample(page,sample);
      const measure=await page.evaluate(()=>{
        const wrap=document.querySelector('.reading-page .concept-wrap')!;
        const scroll=document.querySelector('.reading-scroll')!;
        const nodes=[...wrap.querySelectorAll('.concept-node')];
        const rect=wrap.getBoundingClientRect();
        const bounds=nodes.map(n=>n.getBoundingClientRect());
        return {
          overX:Math.max(0,wrap.scrollWidth-wrap.clientWidth),
          scrollNeeded:Math.max(0,scroll.scrollHeight-scroll.clientHeight),
          nodeCount:nodes.length,
          leftOk:bounds.every(r=>r.left>=rect.left-1),
          rightOk:bounds.every(r=>r.right<=rect.right+1),
          textOk:nodes.every(n=>parseFloat(getComputedStyle(n.querySelector('.concept-detail')||n).fontSize)>=12),
          validHeight:bounds.every(r=>r.height>10)
        };
      });
      expect(measure.nodeCount).toBeGreaterThanOrEqual(3);
      expect(measure.overX).toBeLessThanOrEqual(1);
      expect(measure.leftOk&&measure.rightOk&&measure.textOk&&measure.validHeight).toBe(true);
      report[size.width+'x'+size.height+' '+sample.category]=measure.scrollNeeded;
      if(sample.category==='short'){
        expect(measure.scrollNeeded,'Short card should fit viewport '+size.width+'x'+size.height).toBeLessThanOrEqual(16);
        await page.screenshot({path:'test-results/layout-'+size.width+'x'+size.height+'-short.png'});
      }
      if(size.width===390&&sample.category==='median'){
        expect(measure.scrollNeeded,'Ordinary card should fit 390x844').toBeLessThanOrEqual(16);
        await page.screenshot({path:'test-results/layout-390x844-median.png'});
      }
      await page.getByRole('button',{name:'戻る',exact:true}).click();
    }
  }
  console.log('Actual rendered vertical overflow (CSS px):',JSON.stringify(report));
});
