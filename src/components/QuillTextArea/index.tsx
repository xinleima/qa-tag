import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import * as React from 'react';
import { Editor } from 'react-draft-wysiwyg';

/**
 * type.
 */
interface IQuillTextAreaProps {
  initialValue?: string;
  onChange?: (value: string) => void;
}

interface IQuillTextAreaState {
  editorState: any;
}

/**
 * QuillTextArea.
 */
class QuillTextArea extends React.Component<IQuillTextAreaProps, IQuillTextAreaState> {
  public state = {
    editorState: EditorState.createEmpty()
  };

  public handleChange = (editorState: any) => {
    const newContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const oldContent = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    if (newContent !== oldContent) {
      const { onChange } = this.props;
      if (onChange) {
        const filteredEmptyContent = newContent === '<p></p>' || newContent === '<p></p>\n' ? '' : newContent;
        onChange(filteredEmptyContent);
      }
    }

    this.setState({
      editorState
    })
  };

  public render() {
    const { editorState } = this.state;

    return (
      <div className="qa-quill">
        <Editor
          editorState={editorState}
          onEditorStateChange={this.handleChange}
          wrapperClassName="qa-quill-wrapper"
          editorClassName="qa-quill-editor"
        />
      </div>
    );
  }
}

export default QuillTextArea
