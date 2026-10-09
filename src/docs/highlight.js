// Tiny dependency-free highlighter for JS / TS / Svelte snippets.
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// order matters: first match at the current position wins
const RULES = [
  ["com", /\/\*[\s\S]*?\*\/|\/\/[^\n]*|<!--[\s\S]*?-->/y],
  ["str", /"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`/y],
  [
    "blk",
    /\{[#:/@](?:if|each|snippet|await|key|else|render|html|const)\b[^}]*\}/y,
  ],
  ["tag", /<\/?[A-Za-z][\w.-]*/y],
  ["rune", /\$(?:state(?:\.raw)?|derived(?:\.by)?|effect|props|bindable)\b/y],
  [
    "kw",
    /\b(?:import|from|export|const|let|var|function|return|if|else|for|await|async|new|type|of|in|true|false|null|undefined|typeof)\b/y,
  ],
  ["num", /\b\d[\d_]*(?:\.\d+)?\b/y],
  ["fn", /\b[A-Za-z_]\w*(?=\()/y],
];

export function highlight(src) {
  let out = "";
  let plain = "";
  let i = 0;

  const flush = () => {
    out += esc(plain);
    plain = "";
  };

  outer: while (i < src.length) {
    for (const [cls, re] of RULES) {
      re.lastIndex = i;
      const m = re.exec(src);
      if (m && m[0].length) {
        flush();
        out += `<span class="t-${cls}">${esc(m[0])}</span>`;
        i += m[0].length;
        continue outer;
      }
    }
    plain += src[i++];
  }
  flush();
  return out;
}

// show the component without its <style> block
export const stripStyle = (raw) =>
  raw.replace(/\n*<style[\s\S]*?<\/style>\s*$/, "").trim();
