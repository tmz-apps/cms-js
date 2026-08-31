import { $getRoot } from 'lexical';
import { $isBlocksmithNode } from '@tmz-apps/cms-js/blocksmith/nodes/BlocksmithNode.js';
import nodeToHtml from '@tmz-apps/cms-js/blocksmith/utils/nodeToHtml.js';
import { BLOCKSMITH_SANITIZE } from '@tmz-apps/cms-js/blocksmith/plugins/BlocksmithPlugin.js';

const EMPTY_HTML = ['<p><br></p>', '<p>&nbsp;</p>', '<p></p>'];
const isEmptyHtml = (html) => {
  if (!html) {
    return true;
  }

  for (let i = 0; i < EMPTY_HTML.length; i++) {
    if (html === EMPTY_HTML[i]) {
      return true;
    }
  }

  return false;
};

/**
 * Why does this exist? Because when copying from MS Office products
 * or other rich text editors you get an unholy amount of mutant html.
 * Now lexical does an amazing job of converting most of it but sometimes
 * it adds extra stuff, like empty paragraphs. For now we're just running
 * this sanitize process after a paste occurs but it might have further
 * use cases.
 *
 * @param editor
 */
export default (editor) => {
  editor.update(() => {
    const $nodes = $getRoot().getChildren();
    for (let i = 0; i < $nodes.length; i++) {
      const $node = $nodes[i];
      if ($isBlocksmithNode($node)) {
        continue;
      }

      const html = nodeToHtml(editor, $node).trim();
      if (isEmptyHtml(html)) {
        $node.remove();
      }
    }
  }, { discrete: true, tag: BLOCKSMITH_SANITIZE });
};
