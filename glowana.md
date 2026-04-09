<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ascend AI — Purple→Pink Palette Test</title>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
:root {
  --bg: #0F0B1A;
  --surface: #1A1428;
  --surface2: #221A33;
  --purple: #A855F7;
  --hotpink: #EC4899;
  --mpink: #F472B6;
  --softpink: #F9A8D4;
  --text: #F5EEF8;
  --text-muted: #B49CC8;
  --text-dim: #7B6890;
  --good: #4ADE80;
  --meh: #FB923C;
  --bad: #F87171;
  --info: #67E8F9;
  --border: rgba(168,85,247,0.12);
  --border-pink: rgba(236,72,153,0.12);
  --glow: rgba(236,72,153,0.35);
  --glow-purple: rgba(168,85,247,0.3);
  --grad: linear-gradient(135deg, #A855F7, #EC4899);
  --grad-wide: linear-gradient(135deg, #A855F7, #D946EF, #EC4899);
  --grad-soft: linear-gradient(135deg, #A855F7, #F472B6, #F9A8D4);
  --grad-btn: linear-gradient(135deg, #C026D3, #EC4899);
  --ff-d: 'Fredoka', sans-serif;
  --ff-b: 'Quicksand', sans-serif;
}
*{margin:0;padding:0;box-sizing:border-box;}
body{background:var(--bg);color:var(--text);font-family:var(--ff-b);overflow-x:hidden;}
::selection{background:rgba(236,72,153,0.3);}

@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes pulseGlow{0%,100%{box-shadow:0 8px 40px var(--glow)}50%{box-shadow:0 8px 60px rgba(236,72,153,0.5)}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}

/_ HERO _/
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:60px 24px;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;width:500px;height:500px;background:radial-gradient(circle,rgba(236,72,153,0.1) 0%,rgba(168,85,247,0.05) 40%,transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;}
.hero-logo{width:110px;height:110px;background:var(--grad);border-radius:30px;display:flex;align-items:center;justify-content:center;margin-bottom:28px;animation:pulseGlow 3s ease-in-out infinite,float 4s ease-in-out infinite;position:relative;z-index:1;}
.hero-logo span{font-family:var(--ff-d);font-size:36px;font-weight:600;color:#fff;}
.hero h1{font-family:var(--ff-d);font-size:clamp(42px,7vw,68px);font-weight:600;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:12px;z-index:1;position:relative;}
.hero p{font-size:16px;color:var(--text-muted);max-width:480px;line-height:1.7;font-weight:500;z-index:1;position:relative;}

.section{max-width:1100px;margin:0 auto;padding:80px 24px;}
.section-title{font-family:var(--ff-d);font-size:32px;font-weight:600;margin-bottom:6px;}
.section-sub{font-size:15px;color:var(--text-muted);margin-bottom:44px;font-weight:500;line-height:1.6;max-width:560px;}
.label{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--text-dim);margin-bottom:14px;}
.divider{height:1px;background:linear-gradient(90deg,transparent,rgba(236,72,153,0.15),rgba(168,85,247,0.15),transparent);max-width:1100px;margin:0 auto;}

/_ COLORS _/
.color-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:14px;margin-bottom:40px;}
.color-card{border-radius:18px;overflow:hidden;border:1px solid var(--border);transition:transform .3s;}
.color-card:hover{transform:translateY(-3px);}
.color-swatch{height:90px;}
.color-info{padding:12px 14px;background:var(--surface);}
.color-info .name{font-family:var(--ff-d);font-size:13px;font-weight:600;margin-bottom:2px;}
.color-info .hex{font-size:11px;color:var(--text-muted);font-weight:600;}

.gradient-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:40px;}
@media(max-width:600px){.gradient-row{grid-template-columns:1fr;}}
.grad-card{height:100px;border-radius:18px;padding:16px 20px;display:flex;flex-direction:column;justify-content:flex-end;position:relative;overflow:hidden;}
.grad-card .g-name{font-family:var(--ff-d);font-size:14px;font-weight:600;color:#fff;}
.grad-card .g-css{font-size:10px;color:rgba(255,255,255,0.6);margin-top:2px;}

/_ TYPE _/
.type-box{background:var(--surface);border-radius:22px;padding:36px;margin-bottom:20px;border:1px solid var(--border);}

/_ PHONES _/
.phones-scroll{display:flex;gap:20px;overflow-x:auto;padding:10px 0 30px;scroll-snap-type:x mandatory;}
.phones-scroll::-webkit-scrollbar{height:4px;}
.phones-scroll::-webkit-scrollbar-track{background:var(--surface);border-radius:2px;}
.phones-scroll::-webkit-scrollbar-thumb{background:var(--hotpink);border-radius:2px;}
.phone{width:250px;min-width:250px;height:510px;background:var(--bg);border-radius:34px;border:2px solid rgba(236,72,153,0.12);overflow:hidden;flex-shrink:0;scroll-snap-align:start;transition:transform .3s,border-color .3s;}
.phone:hover{transform:translateY(-5px);border-color:rgba(236,72,153,0.3);}
.phone-notch{width:82px;height:24px;background:var(--bg);border-radius:0 0 15px 15px;margin:0 auto;}
.phone-screen{padding:6px 18px 14px;height:calc(100% - 24px);display:flex;flex-direction:column;font-family:var(--ff-b);}
.phone-label{text-align:center;font-family:var(--ff-d);font-size:12px;font-weight:600;color:var(--text-dim);margin-top:10px;}

.p-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;}
.p-title{font-family:var(--ff-d);font-size:17px;font-weight:600;}

.p-score-ring{width:100px;height:100px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:10px auto 12px;}
.p-score-ring span{font-family:var(--ff-d);font-size:36px;font-weight:600;color:#fff;}
.p-score-label{text-align:center;font-family:var(--ff-d);font-size:14px;font-weight:600;margin-bottom:2px;}
.p-score-sub{text-align:center;font-size:10px;font-weight:600;margin-bottom:14px;}

.p-bar-row{display:flex;align-items:center;gap:7px;margin-bottom:7px;}
.p-bar-label{font-size:10px;color:var(--text-muted);width:50px;font-weight:600;flex-shrink:0;}
.p-bar-track{flex:1;height:7px;background:rgba(236,72,153,0.06);border-radius:4px;overflow:hidden;}
.p-bar-fill{height:100%;border-radius:4px;}
.p-bar-val{font-size:10px;font-weight:700;width:24px;text-align:right;flex-shrink:0;}

.p-btn{background:var(--grad-btn);border:none;border-radius:100px;padding:11px;color:#fff;font-family:var(--ff-d);font-size:13px;font-weight:600;text-align:center;box-shadow:0 4px 20px var(--glow);}

.p-nav{display:flex;justify-content:space-around;padding:8px 0 2px;border-top:1px solid var(--border);margin-top:auto;}
.p-nav-item{display:flex;flex-direction:column;align-items:center;gap:3px;}
.p-nav-item svg{width:18px;height:18px;}
.p-nav-item .nt{font-size:8px;font-weight:600;}

.p-card{background:var(--surface);border-radius:14px;padding:10px 12px;margin-bottom:6px;border:1px solid var(--border);display:flex;align-items:center;gap:10px;}
.p-card svg{width:18px;height:18px;flex-shrink:0;}
.p-card-t{font-family:var(--ff-d);font-size:11px;font-weight:600;}
.p-card-d{font-size:9px;color:var(--text-muted);font-weight:500;}

.p-tip{background:linear-gradient(135deg,rgba(236,72,153,0.1),rgba(168,85,247,0.05));border:1px solid rgba(236,72,153,0.15);border-radius:14px;padding:10px 12px;margin-bottom:6px;display:flex;align-items:flex-start;gap:8px;}
.p-tip svg{width:16px;height:16px;margin-top:2px;flex-shrink:0;}
.p-tip .tt{font-family:var(--ff-d);font-size:11px;font-weight:600;margin-bottom:2px;}
.p-tip .td{font-size:9px;color:var(--text-muted);line-height:1.3;}

.p-streak-row{display:flex;justify-content:space-between;gap:4px;margin:8px 0;}
.p-streak-dot{width:28px;height:28px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;}
.p-streak-dot.done{background:var(--grad);color:#fff;}
.p-streak-dot.today{border:2px solid var(--hotpink);color:var(--hotpink);}
.p-streak-dot.future{background:var(--surface);color:var(--text-dim);}

/_ COMPONENTS _/
.comp-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;}
.comp-card{background:var(--surface);border-radius:22px;padding:28px;border:1px solid var(--border);transition:border-color .3s;}
.comp-card:hover{border-color:rgba(236,72,153,0.2);}
.comp-label{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--text-dim);margin-bottom:18px;}

.demo-btn{padding:13px 26px;border-radius:100px;font-family:var(--ff-d);font-size:14px;font-weight:600;border:none;cursor:pointer;text-align:center;transition:all .2s;margin-bottom:10px;display:block;width:100%;}
.demo-btn:hover{transform:translateY(-2px);}

.demo-tag{display:inline-block;padding:5px 14px;border-radius:100px;font-size:11px;font-weight:700;margin:3px;}

.demo-toast{display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:14px;font-size:12px;font-weight:600;margin-bottom:8px;}

.demo-bar-row{display:flex;align-items:center;gap:10px;margin-bottom:12px;}
.demo-bar-label{font-size:12px;font-weight:600;width:65px;color:var(--text-muted);flex-shrink:0;}
.demo-bar-track{flex:1;height:9px;background:rgba(236,72,153,0.06);border-radius:5px;overflow:hidden;}
.demo-bar-fill{height:100%;border-radius:5px;}
.demo-bar-val{font-size:12px;font-weight:700;width:30px;text-align:right;flex-shrink:0;}

/_ SHARE CARD _/
.share-card-demo{display:flex;justify-content:center;padding:20px 0;}
.share-card{width:280px;border-radius:24px;overflow:hidden;position:relative;}
.share-card-inner{padding:36px 24px;text-align:center;position:relative;z-index:1;}

.footer{text-align:center;padding:60px 24px;color:var(--text-dim);font-size:14px;font-weight:500;}
.footer span{font-family:var(--ff-d);font-weight:600;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}

@media(max-width:600px){.section{padding:60px 16px;}.comp-grid{grid-template-columns:1fr;}}
</style>

</head>
<body>

<!-- SVG icon helper -->
<script>
function I(paths,color,sw=2,size=24){
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
}
function IF(paths,color,size=24){return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;}
const ic = {
  scan: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>',
  glow: '<path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>',
  tips: '<path d="M9 21h6M12 3a6 6 0 0 1 6 6c0 2.2-1.2 4.1-3 5.2V17H9v-2.8A6 6 0 0 1 12 3z"/>',
  history: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
  profile: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2m-9-11h2m18 0h2m-4.2-6.8l-1.4 1.4M5.6 18.4l-1.4 1.4m0-15.6l1.4 1.4m12.8 12.8l1.4 1.4"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4m0-11l-6.8 4"/>',
  heart: '<path d="M12 21S4 14.5 4 8.5C4 5.4 6.4 3 9.5 3c1.7 0 2.8.8 3.5 1.5C13.7 3.8 14.8 3 16.5 3 19.6 3 22 5.4 22 8.5 22 14.5 12 21 12 21z"/>',
  bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/>',
  fire: '<path d="M12 22c4-3.5 7-7.5 7-11a7 7 0 0 0-14 0c0 3.5 3 7.5 7 11z"/><circle cx="12" cy="11" r="2"/>',
  drop: '<path d="M12 22c4-3 7-6.5 7-10a7 7 0 0 0-14 0c0 3.5 3 7 7 10z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2m-8-10h2m16 0h2m-3.3-6.7l-1.4 1.4M5.7 18.3l-1.4 1.4m0-13.4l1.4 1.4m12.6 12.6l1.4 1.4"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 12 3a7 7 0 0 0 0 9.8z"/>',
  crown: '<path d="M2 20h20M4 16l2-12 4 5 2-5 2 5 4-5 2 12"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  arrow: '<path d="M7 17l5-5-5-5"/>'
};
</script>

<!-- HERO -->
<section class="hero">
  <div class="hero-logo"><span>A</span></div>
  <h1>ascend ai</h1>
  <p>purple → pink palette test. same bubbly identity, new color energy. see how it feels across every screen and component.</p>
</section>

<div class="divider"></div>

<!-- PALETTE -->
<section class="section">
  <div class="section-title">the new palette</div>
  <div class="section-sub">purple base shifting into hot pink. warmer, more energetic, more beauty-coded than pure purple.</div>

  <div class="label">primary colors</div>
  <div class="color-grid">
    <div class="color-card"><div class="color-swatch" style="background:#A855F7;"></div><div class="color-info"><div class="name" style="color:var(--text);">Purple</div><div class="hex">#A855F7 — base</div></div></div>
    <div class="color-card"><div class="color-swatch" style="background:#EC4899;"></div><div class="color-info"><div class="name" style="color:var(--text);">Hot Pink</div><div class="hex">#EC4899 — CTA / gradient</div></div></div>
    <div class="color-card"><div class="color-swatch" style="background:#F472B6;"></div><div class="color-info"><div class="name" style="color:var(--text);">Medium Pink</div><div class="hex">#F472B6 — active elements</div></div></div>
    <div class="color-card"><div class="color-swatch" style="background:#F9A8D4;"></div><div class="color-info"><div class="name" style="color:var(--text);">Soft Pink</div><div class="hex">#F9A8D4 — highlights / text</div></div></div>
  </div>

  <div class="label">supporting colors</div>
  <div class="color-grid">
    <div class="color-card"><div class="color-swatch" style="background:#0F0B1A;"></div><div class="color-info"><div class="name" style="color:var(--text);">Background</div><div class="hex">#0F0B1A</div></div></div>
    <div class="color-card"><div class="color-swatch" style="background:#1A1428;"></div><div class="color-info"><div class="name" style="color:var(--text);">Surface</div><div class="hex">#1A1428</div></div></div>
    <div class="color-card"><div class="color-swatch" style="background:#221A33;"></div><div class="color-info"><div class="name" style="color:var(--text);">Surface 2</div><div class="hex">#221A33</div></div></div>
    <div class="color-card"><div class="color-swatch" style="background:#F5EEF8;"></div><div class="color-info"><div class="name" style="color:var(--text);">Text</div><div class="hex">#F5EEF8</div></div></div>
    <div class="color-card"><div class="color-swatch" style="background:#B49CC8;"></div><div class="color-info"><div class="name" style="color:var(--text);">Muted</div><div class="hex">#B49CC8</div></div></div>
    <div class="color-card"><div class="color-swatch" style="background:#4ADE80;"></div><div class="color-info"><div class="name" style="color:var(--text);">Good</div><div class="hex">#4ADE80</div></div></div>
    <div class="color-card"><div class="color-swatch" style="background:#FB923C;"></div><div class="color-info"><div class="name" style="color:var(--text);">Caution</div><div class="hex">#FB923C</div></div></div>
    <div class="color-card"><div class="color-swatch" style="background:#F87171;"></div><div class="color-info"><div class="name" style="color:var(--text);">Alert</div><div class="hex">#F87171</div></div></div>
  </div>

  <div class="label">gradients</div>
  <div class="gradient-row">
    <div class="grad-card" style="background:linear-gradient(135deg,#A855F7,#EC4899);"><div class="g-name">Primary</div><div class="g-css">#A855F7 → #EC4899</div></div>
    <div class="grad-card" style="background:linear-gradient(135deg,#C026D3,#EC4899);"><div class="g-name">Button / CTA</div><div class="g-css">#C026D3 → #EC4899</div></div>
    <div class="grad-card" style="background:linear-gradient(135deg,#A855F7,#D946EF,#EC4899);"><div class="g-name">Wide spectrum</div><div class="g-css">#A855F7 → #D946EF → #EC4899</div></div>
    <div class="grad-card" style="background:linear-gradient(135deg,#A855F7,#F472B6,#F9A8D4);"><div class="g-name">Soft fade</div><div class="g-css">#A855F7 → #F472B6 → #F9A8D4</div></div>
  </div>
</section>

<div class="divider"></div>

<!-- APP SCREENS -->
<section class="section">
  <div class="section-title">app screens</div>
  <div class="section-sub">every key screen with the purple→pink palette applied. scroll to see results, tips, paywall, history, share card, and profile.</div>

  <div class="phones-scroll" id="phones"></div>
</section>

<div class="divider"></div>

<!-- COMPONENTS -->
<section class="section">
  <div class="section-title">components</div>
  <div class="section-sub">buttons, bars, tags, toasts, and cards — all reskinned with the new palette.</div>
  <div class="comp-grid" id="comps"></div>
</section>

<div class="divider"></div>

<!-- SHARE CARD -->
<section class="section">
  <div class="section-title">shareable score card</div>
  <div class="section-sub">the thing people will screenshot on tiktok. this is the single most important visual in your app.</div>
  <div class="share-card-demo">
    <div class="share-card" style="background:linear-gradient(135deg,#A855F7,#D946EF,#EC4899);box-shadow:0 16px 60px rgba(236,72,153,0.3),0 8px 30px rgba(168,85,247,0.2);">
      <div class="share-card-inner">
        <div style="font-family:var(--ff-d);font-size:11px;font-weight:600;color:rgba(255,255,255,0.7);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:10px;">my glow score</div>
        <div style="font-family:var(--ff-d);font-size:64px;font-weight:600;color:#fff;line-height:1;">8.4</div>
        <div style="font-size:12px;color:rgba(255,255,255,0.8);font-weight:500;margin:10px 0 24px;">skin 8.7 · clarity 8.2 · texture 8.0 · symmetry 8.5</div>
        <div style="width:40px;height:2px;background:rgba(255,255,255,0.3);margin:0 auto 18px;border-radius:1px;"></div>
        <div style="font-family:var(--ff-d);font-size:15px;font-weight:500;color:rgba(255,255,255,0.8);">ascend ai</div>
      </div>
    </div>
  </div>
</section>

<div class="divider"></div>

<!-- VERDICT -->
<section class="section">
  <div class="section-title">palette verdict</div>
  <div class="section-sub">how the purple→pink compares to the original pure purple identity.</div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:40px;">
    <div style="background:var(--surface);border-radius:20px;padding:24px;border:1px solid rgba(74,222,128,0.15);">
      <div style="font-family:var(--ff-d);font-size:15px;font-weight:600;color:var(--good);margin-bottom:10px;">what works</div>
      <div style="font-size:13px;color:var(--text-muted);line-height:1.7;font-weight:500;">
        warmer and more beauty-coded than pure purple. the pink gradient screams "beauty app" immediately — no ambiguity. hot pink CTAs have higher visual contrast against the dark background, which helps conversion. the purple→pink spectrum gives you more gradient range for visual variety across screens. share cards look more vibrant and tiktok-friendly.
      </div>
    </div>
    <div style="background:var(--surface);border-radius:20px;padding:24px;border:1px solid rgba(251,146,60,0.15);">
      <div style="font-family:var(--ff-d);font-size:15px;font-weight:600;color:var(--meh);margin-bottom:10px;">watch out for</div>
      <div style="font-size:13px;color:var(--text-muted);line-height:1.7;font-weight:500;">
        too much pink can skew feminine — if you want the app to feel gender-neutral, use purple as the dominant and pink as the accent only. the soft pink (#F9A8D4) can feel washed out at small sizes — test it at 10-12px for readability. make sure the hot pink CTA buttons don't clash with your error red (#F87171) — they're close in hue.
      </div>
    </div>
  </div>

  <div style="background:var(--surface);border-radius:20px;padding:24px;border:1px solid var(--border);">
    <div style="font-family:var(--ff-d);font-size:15px;font-weight:600;color:var(--softpink);margin-bottom:10px;">my take</div>
    <div style="font-size:13px;color:var(--text-muted);line-height:1.7;font-weight:500;">
      this palette is stronger than the original pure purple for a glow-up app. the purple→pink gradient immediately reads as "beauty" which saves you from needing to explain what the app is in screenshots. the hot pink CTAs pop harder which matters on a hard paywall. I'd keep purple as the dominant color (backgrounds, nav, secondary elements) and let pink own the action layer (buttons, progress fills, score ring, share card). that way you get the best of both.
    </div>
  </div>
</section>

<footer class="footer">
  <span>ascend ai</span> — purple→pink palette test v1.0
</footer>

<script>
// Build phone screens
const phonesEl = document.getElementById('phones');

function nav(active, style='line') {
  const cols = ['#F9A8D4','#7B6890','#7B6890','#7B6890'];
  const tcols = [...cols];
  cols.fill('#7B6890'); cols[active] = '#F9A8D4';
  tcols.fill('#7B6890'); tcols[active] = '#F9A8D4';
  const icons = [ic.scan, ic.tips, ic.history, ic.profile];
  const names = ['scan','tips','history','profile'];
  return `<div class="p-nav">${icons.map((ic,i)=>`<div class="p-nav-item${i===active?' active':''}">${I(ic,cols[i],2,18)}<span class="nt" style="color:${tcols[i]}">${names[i]}</span></div>`).join('')}</div>`;
}

const screens = [
  // Splash
  `<div class="phone"><div class="phone-notch"></div><div class="phone-screen" style="align-items:center;justify-content:center;text-align:center;">
    <div style="width:64px;height:64px;background:var(--grad);border-radius:20px;display:flex;align-items:center;justify-content:center;margin-bottom:18px;box-shadow:0 8px 30px var(--glow);"><span style="font-family:var(--ff-d);font-size:28px;font-weight:600;color:#fff;">A</span></div>
    <div style="font-family:var(--ff-d);font-size:24px;font-weight:600;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:6px;">ascend ai</div>
    <div style="font-size:11px;color:var(--text-muted);font-weight:500;margin-bottom:28px;padding:0 16px;line-height:1.5;">your ai-powered glow up companion</div>
    <div class="p-btn" style="width:100%;">get started</div>
    <div style="font-size:10px;color:var(--text-dim);margin-top:10px;font-weight:500;">already have an account? <span style="color:var(--hotpink);">sign in</span></div>
  </div></div>`,

  // Selfie
  `<div class="phone"><div class="phone-notch"></div><div class="phone-screen">
    <div class="p-header"><span style="font-size:11px;color:var(--text-dim);font-weight:600;">step 1 of 2</span><span style="font-size:11px;color:var(--hotpink);font-weight:600;">skip</span></div>
    <div style="font-family:var(--ff-d);font-size:20px;font-weight:600;text-align:center;margin:16px 0 6px;">take a selfie</div>
    <div style="font-size:11px;color:var(--text-muted);text-align:center;font-weight:500;margin-bottom:16px;line-height:1.5;">good lighting, no filters — just the real you!</div>
    <div style="flex:1;background:var(--surface);border-radius:22px;display:flex;align-items:center;justify-content:center;border:2px dashed rgba(236,72,153,0.15);margin-bottom:14px;">
      <div style="text-align:center;">${I(ic.scan,'#7B6890',1.5,40)}<div style="font-size:10px;color:var(--text-dim);font-weight:500;margin-top:8px;">tap to open camera</div></div>
    </div>
    <div class="p-btn">take photo</div>
  </div></div>`,

  // Scanning
  `<div class="phone"><div class="phone-notch"></div><div class="phone-screen" style="align-items:center;justify-content:center;text-align:center;">
    <div style="width:90px;height:90px;border-radius:50%;border:3px solid var(--border);border-top-color:var(--hotpink);margin-bottom:20px;animation:spin 1.5s linear infinite;"></div>
    <div style="font-family:var(--ff-d);font-size:18px;font-weight:600;margin-bottom:6px;">analyzing your glow...</div>
    <div style="font-size:11px;color:var(--text-muted);font-weight:500;line-height:1.5;padding:0 12px;">our ai is scanning your skin texture, clarity, and symmetry</div>
  </div></div>`,

  // Paywall
  `<div class="phone"><div class="phone-notch"></div><div class="phone-screen">
    <div style="text-align:right;"><span style="font-size:10px;color:var(--text-dim);font-weight:600;">restore</span></div>
    <div style="text-align:center;margin:8px 0 6px;"><div style="font-family:var(--ff-d);font-size:20px;font-weight:600;">unlock your results</div><div style="font-size:10px;color:var(--text-muted);font-weight:500;margin-top:3px;">see your full glow analysis</div></div>
    <div style="display:flex;flex-direction:column;gap:5px;margin:12px 0;">
      ${['full glow score breakdown','personalized improvement tips','unlimited daily scans'].map(t=>`<div style="display:flex;align-items:center;gap:7px;padding:7px 10px;background:var(--surface);border-radius:10px;"><div style="width:20px;height:20px;border-radius:6px;background:rgba(74,222,128,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;">${I(ic.check,'#4ADE80',2.5,12)}</div><span style="font-size:10px;font-weight:500;">${t}</span></div>`).join('')}
    </div>
    <div style="background:linear-gradient(135deg,rgba(168,85,247,0.12),rgba(236,72,153,0.1));border:1.5px solid var(--hotpink);border-radius:14px;padding:12px;text-align:center;margin-bottom:6px;">
      <div style="font-family:var(--ff-d);font-size:11px;font-weight:600;color:var(--hotpink);margin-bottom:2px;">most popular</div>
      <div style="font-family:var(--ff-d);font-size:20px;font-weight:600;">$4.99<span style="font-size:12px;color:var(--text-muted);"> /week</span></div>
    </div>
    <div style="display:flex;gap:6px;margin-bottom:10px;">
      <div style="flex:1;background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:9px;text-align:center;"><div style="font-family:var(--ff-d);font-size:13px;font-weight:600;">$9.99</div><div style="font-size:9px;color:var(--text-dim);font-weight:500;">/month</div></div>
      <div style="flex:1;background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:9px;text-align:center;"><div style="font-family:var(--ff-d);font-size:13px;font-weight:600;">$39.99</div><div style="font-size:9px;color:var(--text-dim);font-weight:500;">/year</div></div>
    </div>
    <div class="p-btn">continue</div>
    <div style="font-size:8px;color:var(--text-dim);text-align:center;margin-top:6px;font-weight:500;">3-day free trial, cancel anytime</div>
  </div></div>`,

  // Results
  `<div class="phone"><div class="phone-notch"></div><div class="phone-screen">
    <div class="p-header"><span class="p-title">your results</span>${I(ic.share,'#B49CC8',2,18)}</div>
    <div class="p-score-ring" style="background:var(--grad);box-shadow:0 8px 40px var(--glow),0 4px 20px var(--glow-purple);"><span>7.8</span></div>
    <div class="p-score-label" style="color:var(--softpink);">your glow score</div>
    <div class="p-score-sub" style="color:var(--hotpink);">looking good today!</div>
    <div class="p-bar-row"><span class="p-bar-label">Skin</span><div class="p-bar-track"><div class="p-bar-fill" style="width:82%;background:linear-gradient(90deg,#A855F7,#F472B6);"></div></div><span class="p-bar-val" style="color:var(--softpink);">8.2</span></div>
    <div class="p-bar-row"><span class="p-bar-label">Clarity</span><div class="p-bar-track"><div class="p-bar-fill" style="width:75%;background:linear-gradient(90deg,#A855F7,#F472B6);"></div></div><span class="p-bar-val" style="color:var(--softpink);">7.5</span></div>
    <div class="p-bar-row"><span class="p-bar-label">Texture</span><div class="p-bar-track"><div class="p-bar-fill" style="width:70%;background:linear-gradient(90deg,#A855F7,#F472B6);"></div></div><span class="p-bar-val" style="color:var(--softpink);">7.0</span></div>
    <div class="p-bar-row"><span class="p-bar-label">Symmetry</span><div class="p-bar-track"><div class="p-bar-fill" style="width:88%;background:linear-gradient(90deg,#A855F7,#F472B6);"></div></div><span class="p-bar-val" style="color:var(--softpink);">8.8</span></div>
    <div class="p-btn" style="margin-top:8px;">${I(ic.glow,'#fff',2,14)} see improvement tips</div>
    ${nav(0)}
  </div></div>`,

  // Tips
  `<div class="phone"><div class="phone-notch"></div><div class="phone-screen">
    <div class="p-header"><span class="p-title">tips for you</span><span style="font-size:10px;color:var(--hotpink);font-weight:600;">3 tips</span></div>
    <div style="font-size:10px;color:var(--text-muted);font-weight:500;margin-bottom:10px;">based on your scan results</div>
    <div class="p-tip">${I(ic.drop,'#F472B6',2,16)}<div><div class="tt">hydrate more</div><div class="td">drink 2-3L water daily for better skin clarity and texture</div></div></div>
    <div class="p-tip">${I(ic.sun,'#F472B6',2,16)}<div><div class="tt">sunscreen daily</div><div class="td">UV protection prevents 80% of visible skin aging</div></div></div>
    <div class="p-tip">${I(ic.moon,'#F472B6',2,16)}<div><div class="tt">night routine</div><div class="td">cleanse + moisturize before bed for better texture scores</div></div></div>
    <div class="p-card">${I(ic.glow,'#4ADE80',2,18)}<div class="p-card-text"><div class="p-card-t">clarity trending up</div><div class="p-card-d">+0.4 this week — keep going!</div></div></div>
    ${nav(1)}
  </div></div>`,

  // History
  `<div class="phone"><div class="phone-notch"></div><div class="phone-screen">
    <div class="p-header"><span class="p-title">your history</span><span style="font-size:10px;color:var(--hotpink);font-weight:600;">7 scans</span></div>
    <div style="font-size:10px;color:var(--text-muted);font-weight:500;margin-bottom:6px;">streak this week</div>
    <div class="p-streak-row">
      <div class="p-streak-dot done">M</div><div class="p-streak-dot done">T</div><div class="p-streak-dot done">W</div><div class="p-streak-dot done">T</div><div class="p-streak-dot today">F</div><div class="p-streak-dot future">S</div><div class="p-streak-dot future">S</div>
    </div>
    <div class="p-card"><div style="width:40px;height:40px;border-radius:50%;border:3px solid rgba(236,72,153,0.15);display:flex;align-items:center;justify-content:center;font-family:var(--ff-d);font-size:13px;font-weight:600;color:var(--softpink);flex-shrink:0;">7.8</div><div class="p-card-text"><div class="p-card-t">today</div><div class="p-card-d">skin 8.2 · clarity 7.5 · texture 7.0</div></div><span style="font-size:10px;color:var(--good);font-weight:600;">+0.3</span></div>
    <div class="p-card"><div style="width:40px;height:40px;border-radius:50%;border:3px solid rgba(168,85,247,0.08);display:flex;align-items:center;justify-content:center;font-family:var(--ff-d);font-size:13px;font-weight:600;color:var(--text-muted);flex-shrink:0;">7.5</div><div class="p-card-text"><div class="p-card-t" style="color:var(--text-muted);">yesterday</div><div class="p-card-d">skin 8.0 · clarity 7.2 · texture 6.8</div></div><span style="font-size:10px;color:var(--good);font-weight:600;">+0.2</span></div>
    <div class="p-card"><div style="width:40px;height:40px;border-radius:50%;border:3px solid rgba(168,85,247,0.08);display:flex;align-items:center;justify-content:center;font-family:var(--ff-d);font-size:13px;font-weight:600;color:var(--text-muted);flex-shrink:0;">7.3</div><div class="p-card-text"><div class="p-card-t" style="color:var(--text-muted);">wednesday</div><div class="p-card-d">skin 7.8 · clarity 7.0 · texture 6.5</div></div><span style="font-size:10px;color:var(--meh);font-weight:600;">-0.1</span></div>
    ${nav(2)}
  </div></div>`,

  // Profile
  `<div class="phone"><div class="phone-notch"></div><div class="phone-screen">
    <div class="p-header"><span class="p-title">profile</span>${I(ic.settings,'#B49CC8',2,18)}</div>
    <div style="text-align:center;margin-bottom:10px;"><div style="width:48px;height:48px;border-radius:50%;background:var(--grad);margin:0 auto 6px;display:flex;align-items:center;justify-content:center;"><span style="font-family:var(--ff-d);font-size:20px;font-weight:600;color:#fff;">A</span></div><div style="font-family:var(--ff-d);font-size:14px;font-weight:600;">aidaros</div><div style="font-size:9px;color:var(--text-muted);font-weight:500;">member since april 2026</div></div>
    <div style="display:flex;gap:6px;margin-bottom:10px;">
      <div style="flex:1;background:var(--surface);border-radius:12px;padding:10px;text-align:center;border:1px solid var(--border);"><div style="font-family:var(--ff-d);font-size:18px;font-weight:600;color:var(--softpink);">7</div><div style="font-size:8px;color:var(--text-dim);font-weight:600;">scans</div></div>
      <div style="flex:1;background:var(--surface);border-radius:12px;padding:10px;text-align:center;border:1px solid var(--border);"><div style="font-family:var(--ff-d);font-size:18px;font-weight:600;color:var(--good);">+0.8</div><div style="font-size:8px;color:var(--text-dim);font-weight:600;">improve</div></div>
      <div style="flex:1;background:var(--surface);border-radius:12px;padding:10px;text-align:center;border:1px solid var(--border);">${I(ic.fire,'#FB923C',2,18)}<div style="font-size:8px;color:var(--text-dim);font-weight:600;">5 streak</div></div>
    </div>
    <div class="p-card">${I(ic.crown,'#EC4899',2,18)}<div class="p-card-text"><div class="p-card-t">manage subscription</div></div>${I(ic.arrow,'#7B6890',2,14)}</div>
    <div class="p-card">${I(ic.bell,'#A855F7',2,18)}<div class="p-card-text"><div class="p-card-t">notifications</div></div>${I(ic.arrow,'#7B6890',2,14)}</div>
    <div class="p-card">${I(ic.heart,'#F472B6',2,18)}<div class="p-card-text"><div class="p-card-t">rate the app</div></div>${I(ic.arrow,'#7B6890',2,14)}</div>
    ${nav(3)}
  </div></div>`
];

phonesEl.innerHTML = screens.map((s,i) => {
  const labels = ['splash','selfie','scanning','paywall','results','tips','history','profile'];
  return `<div>${s}<div class="phone-label">${labels[i]}</div></div>`;
}).join('');

// Build components
document.getElementById('comps').innerHTML = `
  <div class="comp-card">
    <div class="comp-label">Buttons</div>
    <div class="demo-btn" style="background:var(--grad-btn);color:#fff;box-shadow:0 4px 20px var(--glow);">start scanning</div>
    <div class="demo-btn" style="background:var(--grad);color:#fff;">view results</div>
    <div class="demo-btn" style="background:var(--surface2);color:var(--text);border:1.5px solid var(--border);">view history</div>
    <div class="demo-btn" style="background:transparent;color:var(--hotpink);border:none;">skip for now</div>
    <div class="demo-btn" style="background:rgba(248,113,113,0.1);color:var(--bad);">delete scan</div>
  </div>

  <div class="comp-card">
    <div class="comp-label">Tags & pills</div>
    <div style="display:flex;flex-wrap:wrap;gap:6px;">
      <span class="demo-tag" style="background:rgba(168,85,247,0.12);color:#A855F7;">skin health</span>
      <span class="demo-tag" style="background:rgba(236,72,153,0.12);color:#EC4899;">clarity</span>
      <span class="demo-tag" style="background:rgba(244,114,182,0.12);color:#F472B6;">texture</span>
      <span class="demo-tag" style="background:rgba(74,222,128,0.1);color:var(--good);">improved</span>
      <span class="demo-tag" style="background:rgba(251,146,60,0.1);color:var(--meh);">needs work</span>
      <span class="demo-tag" style="background:rgba(248,113,113,0.1);color:var(--bad);">low score</span>
      <span class="demo-tag" style="background:rgba(103,232,249,0.1);color:var(--info);">new tip</span>
      <span class="demo-tag" style="background:var(--surface2);color:var(--text-muted);">symmetry</span>
    </div>
  </div>

  <div class="comp-card">
    <div class="comp-label">Progress bars</div>
    <div class="demo-bar-row"><span class="demo-bar-label">Skin</span><div class="demo-bar-track"><div class="demo-bar-fill" style="width:82%;background:linear-gradient(90deg,#A855F7,#F472B6);"></div></div><span class="demo-bar-val" style="color:var(--softpink);">8.2</span></div>
    <div class="demo-bar-row"><span class="demo-bar-label">Clarity</span><div class="demo-bar-track"><div class="demo-bar-fill" style="width:75%;background:linear-gradient(90deg,#A855F7,#F472B6);"></div></div><span class="demo-bar-val" style="color:var(--softpink);">7.5</span></div>
    <div class="demo-bar-row"><span class="demo-bar-label">Texture</span><div class="demo-bar-track"><div class="demo-bar-fill" style="width:55%;background:linear-gradient(90deg,#FB923C,#FBBF24);"></div></div><span class="demo-bar-val" style="color:var(--meh);">5.5</span></div>
    <div class="demo-bar-row"><span class="demo-bar-label">Symmetry</span><div class="demo-bar-track"><div class="demo-bar-fill" style="width:92%;background:linear-gradient(90deg,#4ADE80,#86EFAC);"></div></div><span class="demo-bar-val" style="color:var(--good);">9.2</span></div>
  </div>

  <div class="comp-card">
    <div class="comp-label">Toasts</div>
    <div class="demo-toast" style="background:rgba(74,222,128,0.06);border:1px solid rgba(74,222,128,0.12);color:var(--good);">${I(ic.check,'#4ADE80',2.5,16)} scan complete! score went up</div>
    <div class="demo-toast" style="background:rgba(236,72,153,0.06);border:1px solid rgba(236,72,153,0.12);color:var(--hotpink);">${I(ic.glow,'#EC4899',2,16)} new tip: try vitamin c serum</div>
    <div class="demo-toast" style="background:rgba(251,146,60,0.06);border:1px solid rgba(251,146,60,0.12);color:var(--meh);">${I(ic.fire,'#FB923C',2,16)} your texture dipped today</div>
  </div>

  <div class="comp-card">
    <div class="comp-label">Score display</div>
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
      <div style="width:70px;height:70px;border-radius:50%;background:var(--grad);display:flex;align-items:center;justify-content:center;font-family:var(--ff-d);font-size:26px;font-weight:600;color:#fff;box-shadow:0 8px 30px var(--glow);flex-shrink:0;">7.8</div>
      <div><div style="font-family:var(--ff-d);font-size:15px;font-weight:600;margin-bottom:3px;">your glow score</div><div style="font-size:12px;color:var(--text-muted);font-weight:500;">looking good today!</div></div>
    </div>
    <div style="display:flex;align-items:center;gap:16px;">
      <div style="width:50px;height:50px;border-radius:50%;background:rgba(74,222,128,0.1);display:flex;align-items:center;justify-content:center;font-family:var(--ff-d);font-size:16px;font-weight:600;color:var(--good);flex-shrink:0;">+0.4</div>
      <div><div style="font-family:var(--ff-d);font-size:14px;font-weight:600;color:var(--good);margin-bottom:2px;">improvement detected</div><div style="font-size:11px;color:var(--text-muted);font-weight:500;">texture went up from 6.6 to 7.0</div></div>
    </div>
  </div>

  <div class="comp-card">
    <div class="comp-label">Tip cards</div>
    <div style="background:linear-gradient(135deg,rgba(236,72,153,0.1),rgba(168,85,247,0.05));border:1px solid rgba(236,72,153,0.15);border-radius:16px;padding:16px;margin-bottom:10px;">
      <div style="font-family:var(--ff-d);font-size:14px;font-weight:600;color:var(--softpink);margin-bottom:5px;">boost your clarity</div>
      <div style="font-size:12px;color:var(--text-muted);line-height:1.5;">vitamin c serum in the morning helps brighten skin and reduce dark spots.</div>
    </div>
    <div style="background:rgba(74,222,128,0.04);border:1px solid rgba(74,222,128,0.12);border-radius:16px;padding:16px;">
      <div style="font-family:var(--ff-d);font-size:14px;font-weight:600;color:var(--good);margin-bottom:5px;">you're on a streak!</div>
      <div style="font-size:12px;color:var(--text-muted);line-height:1.5;">5 days in a row — keep scanning daily to unlock insights.</div>
    </div>
  </div>
`;
</script>

</body>
</html>
