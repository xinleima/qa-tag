import { Icon, Tag } from 'antd';
import * as React from 'react';

/**
 * Type.
 */
export interface ITags {
  code: string[];
  text: string[];
  intersection: string[]
}
interface ITagsProps {
  tags: ITags;
}

/**
 * Tags.
 */
class Tags extends React.Component<ITagsProps, {}> {
  public render() {
    const { tags } = this.props;

    if (!tags.code.length && !tags.text.length && !tags.intersection.length) {
      return (
        <div><Icon type="frown-o" />&nbsp;还没有生成tag</div>
      )
    }

    return (
      <div>
        <h3>Code</h3>
        <div>
          {
            tags.code.map((tag: string) => (
              <Tag color="#2db7f5" key={tag}>{tag}</Tag>
            ))
          }
        </div>

        <h3 style={{ marginTop: 18 }}>Text</h3>
        <div>
          {
            tags.text.map((tag: string) => (
              <Tag color="#87d068" key={tag}>{tag}</Tag>
            ))
          }
        </div>

        <h3 style={{ marginTop: 18 }}>Intersection</h3>
        <div>
          {
            tags.intersection.map((tag: string) => (
              <Tag color="#f50" key={tag}>{tag}</Tag>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Tags;
