import{_ as e,c as s,o as a,V as t}from"./chunks/framework.sH_TUDjc.js";const m=JSON.parse('{"title":"Kubernetes Deployment","description":"","frontmatter":{"title":"Kubernetes Deployment"},"headers":[],"relativePath":"docs/deploy/k8s.md","filePath":"docs/deploy/k8s.md"}'),i={name:"docs/deploy/k8s.md"},n=t(`<h1 id="kubernetes-deployment" tabindex="-1">Kubernetes Deployment <a class="header-anchor" href="#kubernetes-deployment" aria-label="Permalink to &quot;Kubernetes Deployment&quot;">​</a></h1><p>Before run the deployment, ensure your <code>SERVER_HOST</code> on <a href="/docs/config">configs/app.yaml</a> is <code>0.0.0.0</code>.</p><p>To install Raiden on Kubernetes, you can use the <a href="https://helm.sh/" target="_blank" rel="noreferrer">Helm</a>.</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">helm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> repo add raiden https://raiden.sev-2.com/charts</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">helm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> repo update</span></span></code></pre></div><p>To customize the default helm values.</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">helm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get values raiden</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> values.yaml</span></span></code></pre></div><p>To install with custom values.</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">helm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> upgrade --install raiden -f values.yaml</span></span></code></pre></div>`,8),l=[n];function p(h,o,d,r,c,k){return a(),s("div",null,l)}const g=e(i,[["render",p]]);export{m as __pageData,g as default};
