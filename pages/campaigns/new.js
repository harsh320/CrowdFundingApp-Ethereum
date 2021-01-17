import React,{Component} from 'react'
import Layout from '../../components/Layout'
import { Button, Checkbox, Form, Message  } from 'semantic-ui-react'
import instance from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes.js'

class NewCampaign extends Component{
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();
    this.setState({
      loading:true,
      errorMessage:''
    });

    try{
      const accounts = await web3.eth.getAccounts();
      await instance.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        });
        Router.pushRoute('/');
    }catch(err){
      this.setState({
        errorMessage: err.message
      });

    }

      this.setState({ loading: false });

  }
  render(){
    return (
      <Layout>
       <h3>Create a Campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
         <Form.Field>
           <label>Minimum Contribution</label>
           <input
              label = "wei"
              labelPositiom = "right"
              value = {this.state.minimumContribution}
              onChange = {event => {this.setState({minimumContribution: event.target.value})}}
            />
         </Form.Field>
         <Message error header="Oops!" content={this.state.errorMessage} />
         <Button loading={this.state.loading} type='submit'>Submit</Button>
        </Form>
      </Layout>
    );
  }
}

export default NewCampaign;
