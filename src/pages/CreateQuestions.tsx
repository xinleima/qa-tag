import { Button, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { AxiosResponse } from "axios";
import * as React from 'react';

import { getTags } from "../api";
import QuillTextArea from '../components/QuillTextArea';
import { default as Tags, ITags } from "../components/Tags";

const FormItem = Form.Item;

/**
 * type.
 */
interface ICreateQuestionsState {
  tags: ITags;
}

/**
 * CreateQuestions.
 */
class CreateQuestions extends React.Component<FormComponentProps, ICreateQuestionsState> {
  public state = {
    tags: {
      code: [],
      intersection: [],
      text: [],
    }
  };

  public handleSubmit = () => {
    this.props.form.validateFields((err: boolean, values: any) => {
      if (!err) {
        getTags(values).then((res: AxiosResponse) => {
          this.setState({
            tags: res.data
          })
        })
      }
    })
  };

  public render() {
    const { form } = this.props;
    const { tags } = this.state;
    const { getFieldDecorator } = form;

    return (
      <div>
        <Form layout="vertical">
          <FormItem label="Question Title">
            {getFieldDecorator('title', {
              rules: [{
                message: 'Required!', required: true
              }],
            })(
              <Input style={{width: '60%'}} />
            )}
          </FormItem>
          <FormItem label="Question Body" required={true}>
            {getFieldDecorator('body', {
              initialValue: '',
              rules: [{
                message: 'Required!', required: true
              }]
            })(
              <QuillTextArea/>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={this.handleSubmit}>Create Tag</Button>
          </FormItem>
        </Form>

        <Tags tags={tags} />
      </div>
    )
  }
}

export default Form.create()(CreateQuestions)
