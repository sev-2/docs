import{_ as s,c as a,o as n,V as e}from"./chunks/framework.sH_TUDjc.js";const u=JSON.parse('{"title":"Imports","description":"","frontmatter":{"title":"Imports"},"headers":[],"relativePath":"docs/cli/imports.md","filePath":"docs/cli/imports.md"}'),p={name:"docs/cli/imports.md"},l=e(`<h1 id="imports-command" tabindex="-1">Imports Command <a class="header-anchor" href="#imports-command" aria-label="Permalink to &quot;Imports Command&quot;">​</a></h1><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">raiden</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> imports</span></span></code></pre></div><p>This command will import Supabase resources and generate to files. You can also import specific resource.</p><p>Available flags:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>$ raiden imports --help</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Fetch supabase resource and generate to file</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Usage:</span></span>
<span class="line"><span>  raiden imports [flags]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Flags:</span></span>
<span class="line"><span>      --generate-routes-only   generate register routes file only</span></span>
<span class="line"><span>      --generate-rpc-only      generate register rpc file only</span></span>
<span class="line"><span>  -h, --help                   help for imports</span></span>
<span class="line"><span>  -m, --models-only            import models only</span></span>
<span class="line"><span>  -r, --roles-only             import roles only</span></span>
<span class="line"><span>      --rpc-only               import rpc only</span></span>
<span class="line"><span>  -s, --schema string          set allowed schema to import, use comma separator for multiple schema</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Global Flags:</span></span>
<span class="line"><span>  -v, --verbose   enable verbose output</span></span></code></pre></div>`,5),t=[l];function i(o,r,c,m,d,h){return n(),a("div",null,t)}const _=s(p,[["render",i]]);export{u as __pageData,_ as default};
