import{_ as e,c as a,o as s,V as t}from"./chunks/framework.IkzmnC3X.js";const y=JSON.parse('{"title":"Deployment Strategy","description":"","frontmatter":{"title":"Deployment Strategy"},"headers":[],"relativePath":"docs/deployment.md","filePath":"docs/deployment.md"}'),i={name:"docs/deployment.md"},n=t(`<h1 id="deployment-strategy" tabindex="-1">Deployment Strategy <a class="header-anchor" href="#deployment-strategy" aria-label="Permalink to &quot;Deployment Strategy&quot;">​</a></h1><p>Before run the deployment, ensure your <code>SERVER_HOST</code> on <a href="/docs/docs/config">configs/app.yaml</a> is <code>0.0.0.0</code>.</p><h2 id="binary-deployment" tabindex="-1">Binary Deployment <a class="header-anchor" href="#binary-deployment" aria-label="Permalink to &quot;Binary Deployment&quot;">​</a></h2><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">go</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build ./cmd/project-name/project-name.go</span></span></code></pre></div><p>That command will build <code>project-name</code> binary based on your OS and CPU architecture. You can deploy that binary to the server.</p><p>It could be your target deployment OS is different with your development OS. For example, your development machine is MacBook with M1 CPU, and your deployment target is Linux with AMD/Intel CPU. In that case you can add <code>GOOS</code> or <code>GOARCH</code> variable to the build command.</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">GOOS</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">linux GOARCH=amd64 go build ./cmd/project-name/project-name.go</span></span></code></pre></div><h2 id="kubernetes-deployment" tabindex="-1">Kubernetes Deployment <a class="header-anchor" href="#kubernetes-deployment" aria-label="Permalink to &quot;Kubernetes Deployment&quot;">​</a></h2><p>To install Raiden on Kubernetes, you can use the <a href="https://helm.sh/" target="_blank" rel="noreferrer">Helm</a>.</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">helm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> repo add raiden https://raiden.sev-2.com/charts</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">helm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> repo update</span></span></code></pre></div><p>To customize the default helm values.</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">helm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> get values raiden</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> values.yaml</span></span></code></pre></div><p>To install with custom values.</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">helm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> upgrade --install raiden -f values.yaml</span></span></code></pre></div>`,14),l=[n];function o(p,h,d,r,c,m){return s(),a("div",null,l)}const k=e(i,[["render",o]]);export{y as __pageData,k as default};
