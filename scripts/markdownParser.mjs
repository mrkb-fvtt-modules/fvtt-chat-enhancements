function escapeHtml(s) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function wrapBlock(tag, content) {
    return `<${tag}>${content}</${tag}>`;
}

export function parse(markdown = '') {
    if (markdown === null || markdown === undefined) return '';
    let md = String(markdown).replace(/\r\n?/g, '\n');

    // const codeBlocks = [];
    // md = md.replace(/```(\w+)?\n([\s\S]*?)```/g, (m, lang, code) => {
    //   const idx = codeBlocks.length;
    //   codeBlocks.push({ lang: lang || '', code });
    //   return `\n\n{{{CODEBLOCK_${idx}}}}\n\n`;
    // });

    md = md.split('\n').map(line => line).join('\n');
    // md = md.replace(/`([^`]+)`/g, (m, c) => `<code>${escapeHtml(c)}</code>`);

    // Images
    md = md.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (m, alt, url) => {
        return `<img src="${escapeHtml(url)}" alt="${escapeHtml(alt)}">`;
    });

    // Links
    md = md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, text, url) => {
        return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(text)}</a>`;
    });

    // Headings
    md = md.replace(/^######\s+(.*)$/gm, '<h6>$1</h6>');
    md = md.replace(/^#####\s+(.*)$/gm, '<h5>$1</h5>');
    md = md.replace(/^####\s+(.*)$/gm, '<h4>$1</h4>');
    md = md.replace(/^###\s+(.*)$/gm, '<h3>$1</h3>');
    md = md.replace(/^##\s+(.*)$/gm, '<h2>$1</h2>');
    md = md.replace(/^#\s+(.*)$/gm, '<h1>$1</h1>');

    // Horizontal rule
    md = md.replace(/(^|\n)\s*([-*_]){3,}\s*(\n|$)/g, '\n<hr/>\n');

    // Blockquotes
    md = md.replace(/(^|\n)>\s?(.*)/g, (_, nl, content) => `${nl}<blockquote>${content}</blockquote>`);

    // del
    md = md.replace(/~~([\s\S]+?)~~/g, '<del>$1</del>');

    // bold-italic, bold, italic
    md = md.replace(/\*\*\*([\s\S]+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    md = md.replace(/___([\s\S]+?)___/g, '<strong><em>$1</em></strong>');

    md = md.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    md = md.replace(/__([^_]+)__/g, '<strong>$1</strong>');

    md = md.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    md = md.replace(/_([^_]+)_/g, '<em>$1</em>');

    // Unordered list
    md = md.replace(/((?:^|\n)[ \t]*[-+*] .+(?:\n[ \t]*[-+*] .+)*)/gm, (block) => {
        // Trim leading newline if present
        const trimmed = block.replace(/^\n/, '').replace(/\n$/,'');
        const items = trimmed.split(/\n/).map(line => line.replace(/^[ \t]*[-+*] /, '').trim());
        return '\n' + '<ul>' + items.map(i => `\n  <li>${i}</li>`).join('') + '\n</ul>' + '\n';
    });
    // Ordered list
    md = md.replace(/((?:^|\n)[ \t]*\d+\. .+(?:\n[ \t]*\d+\. .+)*)/gm, (block) => {
        const trimmed = block.replace(/^\n/, '').replace(/\n$/,'');
        const items = trimmed.split(/\n/).map(line => line.replace(/^[ \t]*\d+\. /, '').trim());
        return '\n' + '<ol>' + items.map(i => `\n  <li>${i}</li>`).join('') + '\n</ol>' + '\n';
    });

    // Paragraphs
    // const blocks = md.split(/\n{2,}/);
    // const blockLevel = /^(<h[1-6]|<ul|<ol|<pre|<blockquote|<img|<hr|<table)/i;
    // for (let i = 0; i < blocks.length; i++) {
    //   const b = blocks[i].trim();
    //   if (!b) { blocks[i] = ''; continue; }
    //   if (blockLevel.test(b)) { blocks[i] = b; }
    //   else {
    //     // For safety, escape remaining angle brackets in text parts
    //     const content = b.split('\n').map(line => escapeHtml(line)).join('<br/>');
    //     // But we've already applied inline HTML for links/images/code tags; revert common escapes
    //     const restored = content
    //       .replace(/&lt;(code|a|img|strong|em|h[1-6]|ul|ol|li|blockquote|hr)\b/g, '<$1')
    //       .replace(/&lt;\/(code|a|img|strong|em|h[1-6]|ul|ol|li|blockquote|hr)&gt;/g, '</$1>')
    //       .replace(/&gt;/g, '>');
    //     blocks[i] = `<p>${restored}</p>`;
    //   }
    // }
    // md = blocks.filter(Boolean).join('\n\n');

    // Restore code blocks
    // md = md.replace(/\{\{\{CODEBLOCK_(\d+)\}\}\}/g, (_, idx) => {
    //   const cb = codeBlocks[Number(idx)];
    //   if (!cb) return '';
    //   const escaped = escapeHtml(cb.code);
    //   const cls = cb.lang ? ` class="language-${escapeHtml(cb.lang)}"` : '';
    //   return `<pre><code${cls}>${escaped}</code></pre>`;
    // });

    return md.trim();
}

export default { parse };
