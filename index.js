import{S as b,a as v,i as a}from"./assets/vendor-CsWjCmIl.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();const d=document.querySelector(".gallery"),m=document.querySelector(".loader"),h=document.querySelector(".load-more"),S=new b(".gallery a",{captionsData:"alt",captionDelay:250});function g(r){const e=r.map(({webformatURL:i,largeImageURL:l,tags:t,likes:o,views:s,comments:L,downloads:w})=>`
    <li class="gallery-item">
      <div class="thumb">
        <a href="${l}">
          <img class="gallery-img" alt="${t}" src="${i}" />
        </a>
      </div>
      <ul class="image-stats-list">
        <li class="image-stats-list-item"><h3>Likes</h3><p>${o}</p></li>
        <li class="image-stats-list-item"><h3>Views</h3><p>${s}</p></li>
        <li class="image-stats-list-item"><h3>Comments</h3><p>${L}</p></li>
        <li class="image-stats-list-item"><h3>Downloads</h3><p>${w}</p></li>
      </ul>
    </li>
  `).join("");d.insertAdjacentHTML("beforeend",e),S.refresh()}function q(){d.innerHTML=""}function f(){m.classList.add("is-visible")}function u(){m.classList.remove("is-visible")}function E(){h.classList.add("is-visible")}function M(){h.classList.remove("is-visible")}async function p(r,e=1){try{return(await v.get("https://pixabay.com/api/",{params:{key:"51605494-583685eee7aa4d922c38f5bf9",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:15}})).data}catch{throw new Error("Error fetching images")}}const $=document.querySelector(".form"),B=document.querySelector(".load-more");let c="",n=1,y=0;$.addEventListener("submit",async r=>{if(r.preventDefault(),c=r.target.elements["search-text"].value.trim(),c===""){a.error({title:"Error",message:"You need to write something",position:"topRight"});return}q(),f(),n=1;try{const e=await p(c,n);if(y=e.totalHits,u(),e.hits.length===0){a.info({message:"No results found",position:"topRight"});return}g(e.hits),e.totalHits>15&&E()}catch(e){u(),a.error({title:"Error",message:"Something went wrong",position:"topRight"}),console.error(e)}});B.addEventListener("click",async r=>{n+=1,f();try{const e=await p(c,n);u(),g(e.hits),H();const i=Math.ceil(y/15);n>=i&&(M(),a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{u(),a.error({title:"Error",message:"Something went wrong",position:"topRight"})}});function H(){const{height:r}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
