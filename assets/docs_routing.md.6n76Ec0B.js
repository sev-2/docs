import{_ as s,c as i,o as a,V as t}from"./chunks/framework.DvHbsNxb.js";const u=JSON.parse('{"title":"Routing","description":"","frontmatter":{"title":"Routing"},"headers":[],"relativePath":"docs/routing.md","filePath":"docs/routing.md"}'),e={name:"docs/routing.md"},n=t(`<h1 id="routing" tabindex="-1">Routing <a class="header-anchor" href="#routing" aria-label="Permalink to &quot;Routing&quot;">​</a></h1><p>All routings are automatically generated by controllers. You can define a routing on a controller. Here is the example of hello controller.</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-0TKwY" id="tab-fDXNvJh" checked="checked"><label for="tab-fDXNvJh">internals/controllers/hello.go</label></div><div class="blocks"><div class="language-go vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark has-highlighted vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">github.com/sev-2/raiden</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">package</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> controllers</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> HelloWorldController</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> struct</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    raiden</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ControllerBase</span></span>
<span class="line highlighted"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Http    </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">string</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \`path:&quot;/hello/{name}&quot; type:&quot;custom&quot;\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Payload </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">HelloWorldRequest</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Result  </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">HelloWorldResponse</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div></div></div><p>As you can see, the routing are defined on <code>path:&quot;/hello/{name}&quot;</code>. By runing <code>raiden generate</code>, that route will auto-generate to <code>router</code> directory.</p>`,4),l=[n];function o(h,p,r,d,k,c){return a(),i("div",null,l)}const y=s(e,[["render",o]]);export{u as __pageData,y as default};
