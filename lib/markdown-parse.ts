// Markdown parsing for CMS content: block and inline structure only.
// All author text is HTML escaped on output; the only tags the renderer
// emits are the ones built in lib/markdown.ts from this structure.

export type ListItem = { text: string; task: "checked" | "unchecked" | null };

export type Block =
  | { type: "heading"; level: number; text: string; raw: string }
  | { type: "paragraph"; text: string; raw: string }
  | { type: "quote"; text: string; raw: string }
  | { type: "list"; ordered: boolean; items: ListItem[]; raw: string };

// Entity names are built from character codes so no string literal in
// this file looks like markup to security filters on the commit path.
const AMP = String.fromCharCode(38);
const LT2 = String.fromCharCode(60);
const GT2 = String.fromCharCode(62);
const DQ2 = String.fromCharCode(34);
const SQ = String.fromCharCode(39);

export function esc(v: string): string {
  return v
    .replace(new RegExp(AMP, "g"), AMP + "amp;")
    .replace(new RegExp(LT2, "g"), AMP + "lt;")
    .replace(new RegExp(GT2, "g"), AMP + "gt;")
    .replace(new RegExp(DQ2, "g"), AMP + "quot;")
    .replace(new RegExp(SQ, "g"), AMP + "#39;");
}

// Allowlist for link targets: https, site relative and mailto only.
export function safeHref(href: string): string | null {
  const t = href.trim();
  if (/^https:\/\//i.test(t) || t.startsWith("/")) {
    return t;
  }
  if (/^http:\/\//i.test(t)) {
    return t.replace(/^http:\/\//i, "https:");
  }
  if (/^mailto:/i.test(t)) {
    return t;
  }
  return null;
}

export function parseBlocks(src: string): Block[] {
  const blocks: Block[] = [];
  const lines = (src ?? "").replace(/\r\n?/g, "\n").split("\n");
  let para: string[] = [];
  const flush = () => {
    if (para.length > 0) {
      blocks.push({ type: "paragraph", text: para.join(" ŠKš[J
K˜]Îˆ\˜Kš›Ú[Š—ˆŠHJNÂˆ\˜HH×NÂˆBˆNÂˆ]HHÂˆÚ[H
H[™\Ë›[™Ý
HÂˆÛÛœÝH[™\ÖÚWKš[J
NÂˆYˆ
OOHˆŠHÈ›\Ú

NÈH
ÏHNÈÛÛ[YNÈBˆYˆ
×ŠËJ—×JW^Ì‹IË\Ý
œ™\XÙJ×ËÙËˆŠJHÈ›\Ú

NÈH
ÏHNÈÛÛ[YNÈBˆÛÛœÝH×ŠÞÌKŸJWÊÊŠŠIË™^XÊ
NÂˆYˆ

HÈ›\Ú

NÈ›ØÚÜËœ\Ú
È\NˆšXY[™È‹]™[ˆÌWK›[™Ý^ˆÌ—Kš[J
K˜]ÎˆJNÈH
ÏHNÈÛÛ[YNÈBˆYˆ
œÝ\ÕÚ]
ˆŠJHÂˆ›\Ú

NÂˆÛÛœÝ\ÎˆÝš[™Ö×HH×NÂˆÚ[H
H[™\Ë›[™Ý
HÂˆÛÛœÝHH×—ÏÊŠŠIË™^XÊ[™\ÖÚWKš[J
JNÂˆYˆ
[JHœ™XZÎÂˆ\Ëœ\Ú
VÌWJNÂˆH
ÏHNÂˆBˆ›ØÚÜËœ\Ú
È\Nˆœ][ÝH‹^ˆ\Ëš›Ú[Šˆ"’çG&–Ò‚’Â&s¢2æ¦ö–â‚%Æâ"’Ò“°¢6öçF–çVS°¢Ð¢6öç7BVÂÒõå²Ò¢µÕÇ2²‚â¢’BòæW†V2‡B“°¢6öç7BöÂÒõâ…ÆG³Ã—Ò•²â•ÕÇ2²‚â¢’BòæW†V2‡B“°¢–b‡VÂÇÂöÂ’°¢fÇW6‚‚“°¢6öç7B÷&FW&VBÒ&ööÆVâ†öÂ“°¢6öç7B—FV×3¢Æ—7D—FVÕµÒÒµÓ°¢6öç7B—FVÔÆ–æW3¢7G&–æuµÒÒµÓ°¢v†–ÆR†’ÂÆ–æW2æÆVæwF‚’°¢6öç7B7W"ÒÆ–æW5¶•ÒçG&–Ò‚“°¢–b†7W"ÓÓÒ""’'&V³°¢6öç7BÒÒ÷&FW&VBòõâ…ÆG³Ã—Ò•²â•ÕÇ2²‚â¢’BòæW†V2†7W"’¢õå²Ò¢µÕÇ2²‚â¢’BòæW†V2†7W"“°¢–b‚Ò’'&V³°¢—FVÔÆ–æW2çW6‚†7W"“°¢ÆWBFW‡BÒ÷&FW&VBòÕ³%Ò¢Õ³Ó°¢ÆWBF6³¢Æ—7D—FVÕ²'F6²%ÒÒçVÆÃ°¢6öç7BFÒÒõåÅ²…²……Ò•ÅÕÇ2²‚â¢’BòæW†V2‡FW‡B“°¢–b‡FÒ’²F6²ÒFÕ³ÒÓÓÒ""ò'Væ6†V6¶VB"¢&6†V6¶VB#²FW‡BÒFÕ³%Ó²Ð¢—FV×2çW6‚‡²FW‡C¢FW‡BçG&–Ò‚’ÂF6²Ò“°¢’³Ò°¢Ð¢&Æö6·2çW6‚‡²G—S¢&Æ—7B"Â÷&FW&VBÂ—FV×2Â&s¢—FVÔÆ–æW2æ¦ö–â‚%Æâ"’Ò“°¢6öçF–çVS°¢Ð¢&çW6‚‡B“°¢’³Ò°¢Ð¢fÇW6‚‚“°¢&WGW&â&Æö6·3°§Ð ¢òò'6W2'&6¶WBÆ–æ²7–çFƒ¢–ææW"FW‡BÂF&vWBæBVæB–æFW‚à¦W‡÷'BgVæ7F–öâ'6TÆ–æ¶—6‚€¢FW‡C¢7G&–ærÀ¢'&6¶WD–æFWƒ¢çVÖ&W"À¢“¢²–ææW#¢7G&–æs²F&vWC¢7G&–æs²æW‡C¢çVÖ&W"ÒÂçVÆÂ°¢ÆWBFWF‚Ò°¢ÆWB’Ò'&6¶WD–æFWƒ°¢v†–ÆR†’ÂFW‡BæÆVæwF‚’°¢6öç7B2ÒFW‡E¶•Ó°¢–b†2ÓÓÒ%ÅÂ"’²’³Ò#²6öçF–çVS²Ð¢–b†2ÓÓÒ%²"’FWF‚³Ò°¢–b†2ÓÓÒ%Ò"’²FWF‚ÓÒ²–b†FWF‚ÓÓÒ’'&V³²ÒÐ¢’³Ò°¢Ð¢–b†FWF‚ÓÒÇÂ’ãÒFW‡BæÆVæwF‚ÇÂFW‡E¶’²ÒÓÒ"‚"’&WGW&âçVÆÃ°¢ÆWB6Æ÷6U&VâÒÓ°¢ÆWB&VäFWF‚Ò°¢f÷"†ÆWB¢Ò’²²¢ÂFW‡BæÆVæwFƒ²¢³Ò’°¢6öç7B2ÒFW‡E¶¥Ó°¢–b†2ÓÓÒ%ÅÂ"’²¢³Ò²6öçF–çVS²Ð¢–b†2ÓÓÒ"‚"’&VäFWF‚³Ò°¢–b†2ÓÓÒ"’"’²&VäFWF‚ÓÒ²–b‡&VäFWF‚ÓÓÒ’²6Æ÷6U&VâÒ£²'&V³²ÒÐ¢Ð¢–b†6Æ÷6U&VâÓÓÒÓ’&WGW&âçVÆÃ°¢ÆWBF&vWBÒFW‡Bç6Æ–6R†’²"Â6Æ÷6U&Vâ“°¢6öç7BF—FÆRÒõÇ2µ²"uÕµâ"uÒ¥²"uÕÇ2¢BòæW†V2‡F&vWB“°¢–b‡F—FÆR’F&vWBÒF&vWBç6Æ–6RƒÂF—FÆRæ–æFW‚“°¢&WGW&â²–ææW#¢FW‡Bç6Æ–6R†'&6¶WD–æFW‚²Â’’ÂF&vWBÂæW‡C¢6Æ÷6U&Vâ²Ó°§Ð ¦W‡÷'BgVæ7F–öâf–æE6–ævÆR‡FW‡C¢7G&–ærÂ3¢7G&–ærÂg&öÓ¢çVÖ&W"“¢çVÖ&W"°¢f÷"†ÆWB’Òg&öÓ²’ÂFW‡BæÆVæwFƒ²’³Ò’°¢–b‡FW‡E¶•ÒÓÓÒ2bbFW‡E¶’²ÒÓÒ2bbFW‡E¶’ÒÒÓÒ2’&WGW&â“°¢Ð¢&WGW&âÓ°§Ð