import React, { useRef, useState } from 'react';
import { Badge, Card, CardHeader } from 'reactstrap';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import BlocksmithPlugin from '@tmz-apps/cms-js/blocksmith/plugins/BlocksmithPlugin.js';
import AppPlugins from '@tmz-apps/cms-js/blocksmith/plugins/AppPlugins.js';
import DraggableBlockPlugin from '@tmz-apps/cms-js/blocksmith/plugins/DraggableBlockPlugin.js';
import FloatingTextFormatToolbarPlugin from '@tmz-apps/cms-js/blocksmith/plugins/FloatingTextFormatToolbarPlugin.js';
import InsertBlockPlugin from '@tmz-apps/cms-js/blocksmith/plugins/InsertBlockPlugin.js';
import BottomInsertBlockPlugin from '@tmz-apps/cms-js/blocksmith/plugins/BottomInsertBlockPlugin.js';
import ToolbarPlugin from '@tmz-apps/cms-js/blocksmith/plugins/ToolbarPlugin.js';
import WordCountPlugin from '@tmz-apps/cms-js/blocksmith/plugins/WordCountPlugin.js';
import HoverInsertButtons from '@tmz-apps/cms-js/blocksmith/components/hover-insert-buttons/index.js';
import { useFormContext } from '@tmz-apps/cms-js/components/index.js';
import config from '@tmz-apps/cms-js/blocksmith/config.js';

export default function Blocksmith(props) {
  const { editMode, pbj } = useFormContext();
  const editorRef = useRef(null);
  const [liveWordCount, setLiveWordCount] = useState(pbj.get('word_count'));
  const [isDragging, setIsDragging] = useState(false);
  config.editable = editMode;

  const handleWordCountChanged = wordCount => {
    setLiveWordCount(wordCount);
  }

  const handleDragStart = () => {
    setIsDragging(true);
  }

  const handleDragEnd = () => {
    setIsDragging(false);
  }

  return (
    <LexicalComposer initialConfig={config}>
      <Card className="blocksmith">
        <CardHeader>
          Content
          {pbj.get('word_count') > 0 && (
            <span className="text-light fs-6 fw-semibold">
              Word Count: <Badge color="dark" className="fs-6">{editMode ? liveWordCount : pbj.get('word_count')}</Badge>
            </span>
          )}
        </CardHeader>
        <BlocksmithPlugin {...props} />
        <LinkPlugin />
        <ListPlugin />
        <AppPlugins {...props} />
        {editMode && (
          <>
            {editorRef.current && <DraggableBlockPlugin anchorElem={editorRef.current} onDragStart={handleDragStart} onDragEnd={handleDragEnd} />}
            {editorRef.current && <FloatingTextFormatToolbarPlugin anchorElem={editorRef.current} />}
            <WordCountPlugin
              onWordCountChanged={handleWordCountChanged}
              title={pbj.get('title', '')}
            />
            <InsertBlockPlugin />
            <HistoryPlugin />
            <ToolbarPlugin />
          </>
        )}
        <div className="position-relative">
          {editMode && <HoverInsertButtons isDragging={isDragging} />}
          <RichTextPlugin
            contentEditable={
              <div className="blocksmith-editor" ref={editorRef}>
                <ContentEditable className="blocksmith-input" />
              </div>
            }
            placeholder={
              <div className="blocksmith-placeholder">
                <em>{editMode ? 'Start writing here...' : 'Nothing to see yet.'}</em>
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        {editMode && <BottomInsertBlockPlugin />}
      </Card>
    </LexicalComposer>
  );
}
