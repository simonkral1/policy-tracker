// Refine digest markdown for editorial rendering:
//  - Strip `🆕 NEW` markers entirely (every item is new; the badge just adds noise).
//  - Strip decorative emojis from headings and inline copy.
//  - Tag section headings (ACT NOW / ON THE RADAR / PIPELINE WATCH / …) with
//    a stable class so CSS can draw a subtle coloured square cue — a refined
//    version of the emoji traffic-light, without the emojis.
import { visit } from "unist-util-visit";

// Section-emoji → class marker. The emoji is stripped; the class is added
// to the heading's hProperties so it survives remark→rehype.
const SECTION_CLASS = {
  "🔴": "section--act-now",
  "🟡": "section--radar",
  "🟢": "section--pipeline",
  "📅": "section--events",
  "💡": "section--editorial",
  "📚": "section--papers",
  "📖": "section--deep-dives",
  "🔗": "section--themes",
  "🔇": "section--quiet",
};

// Decorative emojis we strip from text content (including inside headings,
// after the class tagging has already happened).
const DECORATIVE = [
  "🔴", "🟡", "🟢", "📅", "💡", "📚", "📖", "🔗", "🔇", "🆕",
  "⚠️", "✅", "❌", "🗒️", "🔧", "📋", "🗣️", "🔄", "📃",
];

// Regex that strips the `🆕 NEW` pair (including surrounding whitespace), and
// then a second pass strips any lingering decorative emoji.
const NEW_MARKER_RE = /\s*🆕\s*NEW\b\s*/gu;
const sorted = [...DECORATIVE].sort((a, b) => b.length - a.length);
const DECOR_RE = new RegExp(
  `(${sorted.map((e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\s*`,
  "gu",
);

function cleanText(value) {
  if (!value) return value;
  return value
    .replace(NEW_MARKER_RE, " ")
    .replace(DECOR_RE, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function ensureHProperties(node) {
  if (!node.data) node.data = {};
  if (!node.data.hProperties) node.data.hProperties = {};
  return node.data.hProperties;
}

export default function remarkRefine() {
  return (tree) => {
    visit(tree, "heading", (node) => {
      if (!node.children || node.children.length === 0) return;
      const first = node.children[0];
      if (first.type !== "text" || !first.value) return;
      const leading = first.value.trimStart();
      for (const [emoji, cls] of Object.entries(SECTION_CLASS)) {
        if (leading.startsWith(emoji)) {
          const props = ensureHProperties(node);
          const existing = props.class ? `${props.class} ` : "";
          props.class = `${existing}section ${cls}`;
          break;
        }
      }
    });

    visit(tree, "text", (node) => {
      if (!node.value) return;
      const hasNew = /🆕/.test(node.value);
      const hasDecor = DECORATIVE.some((e) => node.value.includes(e));
      if (!hasNew && !hasDecor) return;
      node.value = cleanText(node.value);
    });
  };
}
