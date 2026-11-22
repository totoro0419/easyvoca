import {test,expect} from '@playwright/test';

test('ホームから学習、矢印キー、進捗保存と再起動後の再開',async({page})=>{
  await page.goto('/');
  await expect(page.getByRole('heading',{name:/英単語の、/})).toBeVisible();
  await page.getByRole('button',{name:'学習を始める'}).click();
  await expect(page.locator('.vocab-head h1')).toHaveText('the');
  await expect(page.locator('.study-position strong')).toContainText(/1\s*\/\s*20/);
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.study-position strong')).toContainText(/2\s*\/\s*20/);
  await expect(page.locator('.vocab-head h1')).toBeVisible();
  await page.reload();
  await page.getByRole('button',{name:'続きから学習'}).click();
  await expect(page.locator('.study-position strong')).toContainText(/2\s*\/\s*20/);
  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('.study-position strong')).toContainText(/1\s*\/\s*20/);
  await expect(page.locator('.diagram-svg svg')).toBeVisible({timeout:25000});
});

test('検索、別語義の閲覧、復習の4択と結果保存',async({page})=>{
  await page.goto('/');
  await page.getByRole('button',{name:'検索',exact:true}).click();
  const search=page.getByRole('searchbox',{name:'単語や日本語の意味で検索'});
  await search.fill('the');
  await expect(page.locator('.result-item').first()).toBeVisible();
  await page.locator('.result-item').first().click();
  await expect(page.locator('.vocab-head h1')).toBeVisible();
  await page.getByRole('button',{name:'戻る'}).click();
  await page.getByRole('button',{name:'復習',exact:true}).click();
  await expect(page.locator('.quiz-word h2')).toBeVisible();
  await expect(page.locator('.quiz-option')).toHaveCount(4);
  await page.locator('.quiz-option').first().click();
  await expect(page.locator('.quiz-feedback')).toBeVisible();
  await page.getByRole('button',{name:'次の問題へ'}).click();
  await expect(page.locator('.review-empty')).toBeVisible();
  await page.reload();
  await page.getByRole('button',{name:'復習',exact:true}).click();
  await expect(page.locator('.review-empty')).toBeVisible();
});

test('モバイルで左右ドラッグと縦スクロール',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  await page.getByRole('button',{name:'学習を始める'}).click();
  await expect(page.locator('.vocab-head h1')).toBeVisible();
  const box=await page.locator('.reading-scroll').boundingBox();
  expect(box).not.toBeNull();
  const x=box!.x+Math.min(box!.width-20,300), y=box!.y+Math.min(box!.height-30,220);
  await page.mouse.move(x,y);
  await page.mouse.down();
  await page.mouse.move(x-170,y+4,{steps:10});
  await page.mouse.up();
  await expect(page.locator('.study-position strong')).toContainText(/2\s*\/\s*20/);
  await page.mouse.wheel(0,360);
  await expect(page.locator('.study-position strong')).toContainText(/2\s*\/\s*20/);
  await page.screenshot({path:'test-results/mobile-study.png'});
});
