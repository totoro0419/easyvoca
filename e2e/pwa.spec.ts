import {test,expect} from '@playwright/test';

test('自動保存完了後、5,111件・図・検索・復習・記録がオフラインで動作する',async({page,context})=>{
  test.setTimeout(165000);
  await page.goto('/');
  await expect(page.getByRole('heading',{name:/英単語の、/})).toBeVisible();
  await page.evaluate(async()=>{
    if(!('serviceWorker'in navigator))throw new Error('Service Worker unsupported');
    await navigator.serviceWorker.ready;
  });
  // Automatic, nonblocking background download. Do not require manual clicks.
  await expect(page.locator('.offline-indicator')).toContainText('オフライン利用可能',{timeout:95000});
  const verified=await page.evaluate(async()=>{
    const meta=JSON.parse(localStorage.getItem('easyvoca.offline.complete.v2')||'null');
    if(!meta)return {count:0,chunks:0,total:0};
    const cache=await caches.open('easyvoca-offline-'+meta.version);
    const catalog=await (await cache.match('/easyvoca/generated/catalog.json'))!.json() as {candidate_id:string;word:string;hidden_meaning_ja:string}[];
    let count=0;
    for(let i=0;i<meta.chunks;i++){
      const url='/easyvoca/generated/chunks/chunk-'+String(i).padStart(3,'0')+'.json';
      const response=await cache.match(url);
      if(!response)throw new Error('Missing chunk '+i);
      const rows=await response.json() as {candidate_id:string;diagram_svg:string;global_order:number}[];
      for(const row of rows){if(row.candidate_id!==catalog[count]?.candidate_id||row.global_order!==count+1||!row.diagram_svg?.includes('<svg'))throw new Error('SVG identity error '+count);count++;}
    }
    return {count,chunks:meta.chunks,total:catalog.length,
      samples:[catalog[0],catalog[Math.floor(catalog.length/2)],catalog[catalog.length-1]]};
  });
  expect(verified.count).toBe(5111);
  expect(verified.total).toBe(5111);
  expect(verified.chunks).toBe(26);
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading',{name:/英単語の、/})).toBeVisible({timeout:20000});
  await page.getByRole('button',{name:'学習を始める'}).click();
  await expect(page.locator('.reading-page .vocab-head h1')).toHaveText('the');
  await expect(page.locator('.reading-page .svg-diagram-image')).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.study-position strong')).toContainText(/2\s*\/\s*20/);
  for(const sample of verified.samples!){
    await page.getByRole('button',{name:'検索',exact:true}).click();
    const search=page.getByRole('searchbox',{name:'単語や日本語の意味で検索'});
    await search.fill(sample.word);
    const item=page.locator('.result-item').filter({hasText:sample.hidden_meaning_ja}).first();
    await expect(item).toBeVisible({timeout:20000});
    await item.click();
    await expect(page.locator('.reading-page .vocab-head h1')).toHaveText(sample.word);
    await expect(page.locator('.reading-page .svg-diagram-image')).toBeVisible();
    if(sample===verified.samples![1]){
      await page.getByRole('button',{name:'お気に入りに追加'}).click();
      await expect(page.getByRole('button',{name:'お気に入りを解除'})).toBeVisible();
    }
    await page.getByRole('button',{name:'戻る',exact:true}).click();
  }
  await page.getByRole('button',{name:'復習',exact:true}).click();
  await expect(page.locator('.quiz-option')).toHaveCount(4);
  await page.locator('.quiz-option').first().click();
  await expect(page.locator('.quiz-feedback')).toBeVisible();
  const revisionsBefore=await page.evaluate(()=>JSON.parse(localStorage.getItem('easyvoca.progress.v1')||'{}').revision);
  expect(revisionsBefore).toBeGreaterThan(3);
  await page.reload();
  await page.getByRole('button',{name:'検索',exact:true}).click();
  const mid=verified.samples![1];
  await page.getByRole('searchbox',{name:'単語や日本語の意味で検索'}).fill(mid.word);
  await page.locator('.result-item').filter({hasText:mid.hidden_meaning_ja}).first().click();
  await expect(page.getByRole('button',{name:'お気に入りを解除'})).toBeVisible();
  const manifest=await page.evaluate(async()=>{
    const res=await fetch('/easyvoca/manifest.webmanifest');
    return res.json() as Promise<{display:string;start_url:string;scope:string;icons:unknown[]}>;
  });
  expect(manifest.display).toBe('standalone');
  expect(manifest.start_url).toBe('/easyvoca/');
  expect(manifest.scope).toBe('/easyvoca/');
  expect(manifest.icons.length).toBeGreaterThanOrEqual(2);
  await context.setOffline(false);
  await page.reload();
  await expect(page.locator('.reading-page .vocab-head h1')).toBeVisible();
  await page.getByRole('button',{name:'設定'}).click();
  await expect(page.getByText('オフライン利用可能').first()).toBeVisible({timeout:15000});
});

test('20件の閲覧後に完了し次の20件を開始できる',async({page})=>{
  await page.goto('/');
  await page.getByRole('button',{name:'学習を始める'}).click();
  await expect(page.locator('.reading-page .vocab-head h1')).toBeVisible();
  for(let i=1;i<=20;i++){
    await page.keyboard.press('ArrowRight');
    if(i<20)await expect(page.locator('.study-position strong')).toContainText(new RegExp((i+1)+'\\s*/\\s*20'));
  }
  await expect(page.getByRole('heading',{name:/20件、おつかれさまでした/})).toBeVisible();
  await page.getByRole('button',{name:'次の20件へ'}).click();
  await expect(page.locator('.study-position strong')).toContainText(/1\s*\/\s*20/);
  await expect(page.locator('.reading-page .vocab-head h1')).toBeVisible();
});
