import {test,expect,type Page} from '@playwright/test';

// Real Chromium touch events (not mouse drag). Coordinates are CSS viewport px.
async function touch(page:Page, x:number,y:number, dx:number,dy:number,steps=10,delay=15,abort=false){
  const cdp=await page.context().newCDPSession(page);
  try{
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y,id:1}]});
    for(let i=1;i<=steps;i++){
      await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+dx*i/steps,y:y+dy*i/steps,id:1}]});
      if(delay)await page.waitForTimeout(delay);
    }
    await cdp.send('Input.dispatchTouchEvent',{type:abort?'touchCancel':'touchEnd',touchPoints:[]});
  } finally {await cdp.detach();}
}
async function study(page:Page){
  await page.goto('/');
  await page.getByRole('button',{name:'学習を始める'}).click();
  await expect(page.locator('.reading-page .vocab-head h1')).toBeVisible();
}
test.describe('touch motion on Android-sized viewport',()=>{
  test.use({hasTouch:true,isMobile:true,viewport:{width:390,height:844}});
  test('slow swipe follows finger; neighbor enters; canceled swipe snaps back',async({page})=>{
    await study(page);
    const box=await page.locator('.reading-scroll').boundingBox();
    expect(box).toBeTruthy();
    const y=box!.y+185;
    await touch(page,310,y,-150,0,12,20);
    await expect(page.locator('.reading-scroll')).toHaveAttribute('data-card-id',/ev-/);
    await expect(page.locator('.study-position strong')).toContainText(/2\s*\/\s*20/);
    await expect(page.locator('.reading-page .vocab-head h1')).toHaveText('be');
    await touch(page,285,y,-39,1,12,26);
    await expect(page.locator('.study-position strong')).toContainText(/2\s*\/\s*20/);
    await expect.poll(()=>page.locator('.swipe-track').evaluate(el=>new DOMMatrixReadOnly(getComputedStyle(el).transform).m41)).toBe(0);
    await touch(page,295,y,-70,0,5,8,true);
    await expect(page.locator('.study-position strong')).toContainText(/2\s*\/\s*20/);
  });
  test('quick consecutive flicks do not duplicate or skip progress; reverse gesture',async({page})=>{
    await study(page);
    const box=await page.locator('.reading-scroll').boundingBox();
    const y=box!.y+170;
    for(let i=2;i<=6;i++){
      await touch(page,315,y,-155,1,5,5);
      await expect(page.locator('.study-position strong')).toContainText(new RegExp(i+'\\s*/\\s*20'));
    }
    await touch(page,80,y,155,0,5,5);
    await expect(page.locator('.study-position strong')).toContainText(/5\s*\/\s*20/);
    await page.reload();
    await expect(page.locator('.study-position strong')).toBeVisible();
    await expect(page.locator('.study-position strong')).toContainText(/5\s*\/\s*20/);
    expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('easyvoca.progress.v1')||'{}').revision)).toBeGreaterThan(0);
  });
  test('native vertical and diagonal scroll do not change cards, responsive diagram remains fully visible without horizontal scroll',async({page})=>{
    await study(page);
    const box=await page.locator('.reading-scroll').boundingBox();
    const y=box!.y+Math.min(box!.height-50,340);
    await touch(page,235,y,0,-170,13,10);
    await expect(page.locator('.study-position strong')).toContainText(/1\s*\/\s*20/);
    await expect.poll(()=>page.locator('.reading-scroll').evaluate(el=>el.scrollTop)).toBeGreaterThan(5);
    await touch(page,280,y,-52,-145,12,10);
    await expect(page.locator('.study-position strong')).toContainText(/1\s*\/\s*20/);
    const diagram=page.locator('.reading-page .concept-wrap');
    await expect(diagram).toContainText('中心');
    await diagram.scrollIntoViewIfNeeded();
    const metrics=await diagram.evaluate(el=>{
      const outer=el.getBoundingClientRect();
      const nodes=[...el.querySelectorAll('.concept-node')].map(node=>{
        const rect=node.getBoundingClientRect();
        return {left:rect.left,right:rect.right,fontSize:parseFloat(getComputedStyle(node).fontSize)};
      });
      return {scrollWidth:el.scrollWidth,clientWidth:el.clientWidth,left:outer.left,right:outer.right,nodes};
    });
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth+1);
    expect(metrics.nodes.length).toBe(3);
    for(const node of metrics.nodes){
      expect(node.left).toBeGreaterThanOrEqual(metrics.left-1);
      expect(node.right).toBeLessThanOrEqual(metrics.right+1);
      expect(node.fontSize).toBeGreaterThanOrEqual(12);
    }
    const d=await diagram.boundingBox();expect(d).toBeTruthy();
    const dx=d!.x+Math.min(d!.width-30,230),dy=d!.y+Math.min(d!.height-20,70);
    await touch(page,dx,dy,-140,0,11,12);
    await expect(page.locator('.study-position strong')).toContainText(/2\s*\/\s*20/);
  });
  test('reduced motion preserves touch navigation without prolonged transitions',async({page})=>{
    await page.emulateMedia({reducedMotion:'reduce'});
    await study(page);
    const b=await page.locator('.reading-scroll').boundingBox();
    await touch(page,315,b!.y+170,-160,0,8,11);
    await expect(page.locator('.study-position strong')).toContainText(/2\s*\/\s*20/);
  });
});
test('search filters and scroll position survive opening detail and returning',async({page})=>{
  await page.goto('/');
  await page.getByRole('button',{name:'検索',exact:true}).click();
  await page.getByRole('searchbox',{name:'単語や日本語の意味で検索'}).fill('a');
  await expect(page.locator('.result-item').nth(15)).toBeVisible();
  await page.locator('.result-item').nth(15).scrollIntoViewIfNeeded();
  const before=await page.locator('main').evaluate(el=>el.scrollTop);
  expect(before).toBeGreaterThan(30);
  await page.locator('.result-item').nth(15).click();
  await expect(page.locator('.reading-page .vocab-head h1')).toBeVisible();
  await page.getByRole('button',{name:'戻る',exact:true}).click();
  await expect(page.getByRole('searchbox',{name:'単語や日本語の意味で検索'})).toHaveValue('a');
  await expect.poll(()=>page.locator('main').evaluate(el=>el.scrollTop)).toBeGreaterThan(before-12);
});
test('tablet viewport keeps navigation and study scroll usable',async({page})=>{
  await page.setViewportSize({width:820,height:1100});
  await study(page);
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.study-position strong')).toContainText(/2\s*\/\s*20/);
  const width=await page.locator('.reading-page').evaluate(el=>el.getBoundingClientRect().width);
  expect(width).toBeGreaterThan(600);
});
