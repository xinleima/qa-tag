import { List } from 'antd';
import { AxiosResponse } from "axios";
import * as React from 'react';
import { Link } from 'react-router-dom';

import { getQuestions, IQuestion } from "../api";

const ListItem = List.Item;

/**
 * Type.
 */
interface IQuestionsState {
  questions: IQuestion[];
}

/**
 * Questions.
 */
class Questions extends React.Component<{}, IQuestionsState> {
  public state = {
    questions: []
  };

  public getQuestionsFromServer() {
    getQuestions().then((res: AxiosResponse) => {
      const questions = res.data.questions;
      this.setState({ questions });
    })
  }

  public componentDidMount() {
    this.getQuestionsFromServer();
  }

  public renderListItem = (item: IQuestion) => (
    <ListItem>
      <ListItem.Meta
        description={<div dangerouslySetInnerHTML={{__html: item.body.substr(0, 300)}} className="rdw-editor-main" />}
        title={<Link to={`/question/${item.id}`} style={{fontSize: 22}}>{item.title}</Link>}
      />
    </ListItem>
  );

  public render() {
    const { questions} = this.state;

    return (
      <List
        dataSource={questions}
        itemLayout="horizontal"
        renderItem={this.renderListItem}
        size="large"
      />
    )
  }
}

export default Questions
