import { $getRoot, $insertNodes } from 'lexical';
import { $generateNodesFromDOM } from '@lexical/html';
import { $createBlocksmithNode } from '@tmz-apps/cms-js/blocksmith/nodes/BlocksmithNode.js';
import { BLOCKSMITH_HYDRATION } from '@tmz-apps/cms-js/blocksmith/plugins/BlocksmithPlugin.js';

export default (blocks, editor) => {
  editor.update(() => {
    const parser = new DOMParser();
    const $nodes = [];

    for (const block of blocks) {
      const curie = block.schema().getCurie();
      if (curie.getMessage() === 'text-block') {
        if (block.has('text')) {
          const dom = parser.parseFromString(block.get('text'), 'text/html');
          $nodes.push(...$generateNodesFromDOM(editor, dom));
        }
      } else {
        $nodes.push($createBlocksmithNode(curie.toString(), block.toObject()));
      }
    }

    $getRoot().clear();
    $insertNodes($nodes);
  }, { discrete: true, tag: BLOCKSMITH_HYDRATION });
};
