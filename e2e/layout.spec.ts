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
  await expect(page.locator('.reading-page .svg-diagram-wrap')).toBeVisible();
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
        const wrap=document.querySelector('.reading-page .svg-diagram-wrap')!;
        const scroll=document.querySelector('.reading-scroll')!;
        const img=wrap.querySelector('img')!;
        const rect=wrap.getBoundingClientRect();
        const bounds=img.getBoundingClientRect();
        return {overX:Math.max(0,wrap.scrollWidth-wrap.clientWidth),
          scrollNeeded:Math.max(0,scroll.scrollHeight-scroll.clientHeight),
          leftOk:bounds.left>=rect.left-1,rightOk:bounds.right<=rect.right+1,
          loaded:img.complete&&img.naturalWidth>0&&bounds.height>0};
      });
      expect(measure.overX).toBeLessThanOrEqual(1);
      expect(measure.leftOk&&measure.rightOk&&measure.loaded).toBe(true);
      await expect(page.locator('.reading-page .svg-diagram-wrap')).toHaveAttribute('data-card-id',sample.candidate_id);
      report[size.width+'x'+size.height+' '+sample.category]=measure.scrollNeeded;
      if(sample.category==='short'){
        if(size.width<=412)expect(measure.scrollNeeded,'Short card should fit phone '+size.width+'x'+size.height).toBeLessThanOrEqual(16);
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


test('4ノードの例外的な図でも、分岐を保持したままスマホ幅に収める',async({page})=>{
  await page.setViewportSize({width:360,height:740});
  await page.goto('/');
  await page.getByRole('button',{name:'検索',exact:true}).click();
  await page.getByRole('searchbox',{name:'単語や日本語の意味で検索'}).fill('sole');
  const item=page.locator('.result-item').filter({hasText:'足の裏、靴の底'}).first();
  await expect(item).toBeVisible();
  await item.click();
  const tree=page.locator('.reading-page .svg-diagram-wrap');
  await expect(tree.locator('img')).toHaveAttribute('src',/^data:image\/svg\+xml/);
  const metrics=await tree.evaluate(el=>({
    over:el.scrollWidth-el.clientWidth,
    loaded:el.querySelector('img')!.complete&&el.querySelector('img')!.naturalWidth>0
  }));
  expect(metrics.over).toBeLessThanOrEqual(1);
  expect(metrics.loaded).toBe(true);
  await page.screenshot({path:'test-results/layout-exception-4nodes.png'});
});
