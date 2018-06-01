import { Button, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { AxiosResponse } from "axios";
import * as React from 'react';
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";

import { getQuestionDetail, IQuestion } from "../api";
import { getTags } from "../api";
import QuillTextArea from '../components/QuillTextArea';
import { default as Tags, ITags } from "../components/Tags";

const FormItem = Form.Item;

/**
 * Type.
 */
interface IQuestionDetailProps extends FormComponentProps, RouteComponentProps<any> {}

interface IQuestionDetailState {
  question: IQuestion;
  tags: ITags;
}

/**
 * QuestionDetail.
 */
class QuestionDetail extends React.Component<IQuestionDetailProps, IQuestionDetailState> {
  public state = {
    question: {
      body: '',
      id: -1,
      title: '',
    },
    tags: {
      code: [],
      intersection: [],
      text: [],
    }
  };

  public getQuestionDetailFromServer() {
    const questionId = this.props.match.params.id;
    getQuestionDetail(questionId).then((res: AxiosResponse) => {
      this.setState({
        question: res.data
      })
    })
  }

  public handleSubmit = () => {
    this.props.form.validateFields((err: boolean, values: any) => {
      if (!err) {
        getTags({
          body: values.body,
          title: this.state.question.title,
        }).then((res: AxiosResponse) => {
          this.setState({
            tags: res.data
          })
        })
      }
    })
  };

  public componentDidMount() {
    this.getQuestionDetailFromServer()
  }

  public render() {
    const { question, tags } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div>
        <h1>{question.title}</h1>
        <div dangerouslySetInnerHTML={{__html: question.body}} className="rdw-editor-main" />

        <h2 style={{marginTop: 24}}>Input your answer</h2>
        <Form layout="vertical">
          <FormItem>
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

export default Form.create()(withRouter(QuestionDetail));
