import {test,expect} from '@playwright/test';

test('公開ビルドのPWAで全教材保存とオフライン起動・学習',async({page,context})=>{
  await page.goto('/');
  await expect(page.getByRole('heading',{name:/英単語の、/})).toBeVisible();
  await page.evaluate(async()=>{if(!('serviceWorker' in navigator))throw new Error('Service Worker unsupported');await navigator.serviceWorker.ready;});
  await page.reload();
  await page.getByRole('button',{name:'設定'}).click();
  await page.getByRole('button',{name:'すべての教材を端末に保存'}).click();
  await expect(page.getByRole('button',{name:'全教材を保存済み'})).toBeVisible({timeout:65000});
  await page.getByRole('button',{name:'閉じる'}).click();
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole('heading',{name:/英単語の、/})).toBeVisible({timeout:25000});
  await page.getByRole('button',{name:'学習を始める'}).click();
  await expect(page.locator('.vocab-head h1')).toHaveText('the',{timeout:20000});
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.study-position strong')).toContainText(/2\s*\/\s*20/);
});

test('20件の閲覧後に完了し次の20件を開始できる',async({page})=>{
  await page.goto('/');
  await page.getByRole('button',{name:'学習を始める'}).click();
  await expect(page.locator('.vocab-head h1')).toBeVisible();
  for(let i=1;i<=20;i++){
    await page.keyboard.press('ArrowRight');
    if(i<20)await expect(page.locator('.study-position strong')).toContainText(new RegExp((i+1)+'\\s*/\\s*20'));
  }
  await expect(page.getByRole('heading',{name:/20件、おつかれさまでした/})).toBeVisible();
  await page.getByRole('button',{name:'次の20件へ'}).click();
  await expect(page.locator('.study-position strong')).toContainText(/1\s*\/\s*20/);
  await expect(page.locator('.vocab-head h1')).toBeVisible();
});
