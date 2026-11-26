import {test,expect} from '@playwright/test';

test('PWA uses the approved EV mark for normal and maskable home-screen icons',async({page})=>{
  await page.goto('/easyvoca/');
  const rendered=page.locator('.desktop-rail .brand-logo');
  await expect(rendered).toHaveAttribute('src','/easyvoca/icons/ev-icon-192.png');
  const manifest=await (await page.request.get('/easyvoca/manifest.webmanifest')).json() as {
    id:string;display:string;start_url:string;scope:string;
    icons:Array<{src:string;sizes:string;type:string;purpose:string}>;
  };
  expect(manifest.id).toBe('/easyvoca/');
  expect(manifest.display).toBe('standalone');
  expect(manifest.scope).toBe('/easyvoca/');
  expect(manifest.start_url).toBe('/easyvoca/');
  const expected=[
    ['ev-icon-192.png','192x192','any'],
    ['ev-icon-512.png','512x512','any'],
    ['ev-icon-maskable-192.png','192x192','maskable'],
    ['ev-icon-maskable-512.png','512x512','maskable']
  ];
  for(const [filename,sizes,purpose] of expected){
    const record=manifest.icons.find(x=>x.src.endsWith(filename));
    expect(record,'Missing '+filename).toBeTruthy();
    expect(record!.sizes).toBe(sizes);
    expect(record!.purpose).toBe(purpose);
    expect(record!.type).toBe('image/png');
    const response=await page.request.get('/easyvoca/'+record!.src);
    expect(response.ok(),filename).toBe(true);
    const body=await response.body();
    expect(body.subarray(0,8).toString('hex')).toBe('89504e470d0a1a0a');
    const size=Number(sizes.slice(0,sizes.indexOf('x')));
    expect(body.readUInt32BE(16)).toBe(size);
    expect(body.readUInt32BE(20)).toBe(size);
    expect(body.length).toBeGreaterThan(1500);
  }
  const safe=await page.evaluate(async()=>{
    const response=await fetch('/easyvoca/icons/ev-icon-maskable-512.png');
    const bitmap=await createImageBitmap(await response.blob());
    const canvas=document.createElement('canvas');canvas.width=512;canvas.height=512;
    const ctx=canvas.getContext('2d')!;
    ctx.drawImage(bitmap,0,0);
    const {data}=ctx.getImageData(0,0,512,512);
    let colored=0,outside=0,whiteCorners=0;
    for(let y=0;y<512;y++)for(let x=0;x<512;x++){
      const i=(y*512+x)*4, r=data[i],g=data[i+1],b=data[i+2];
      const coloredPixel=b>r+18&&b>g+6;
      if(coloredPixel){
        colored++;
        if(Math.hypot(x-256,y-256)>0.4*512)outside++;
      }
      if((x<15||x>496)&&(y<15||y>496)&&r>245&&g>245&&b>245)whiteCorners++;
    }
    return {colored,outside,whiteCorners};
  });
  expect(safe.colored).toBeGreaterThan(10000);
  expect(safe.outside).toBe(0);
  expect(safe.whiteCorners).toBeGreaterThan(300);
  const favicon=await page.request.get('/easyvoca/favicon.svg');
  expect(favicon.ok()).toBe(true);
  expect(await favicon.text()).toContain('id="ev-mark"');
  const apple=await page.request.get('/easyvoca/icons/apple-touch-icon.png');
  expect(apple.ok()).toBe(true);
  expect((await apple.body()).readUInt32BE(16)).toBe(180);
});
