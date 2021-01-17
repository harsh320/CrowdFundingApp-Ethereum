import React , {Component} from 'react'
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout'
import instance from '../ethereum/factory'
import {Link} from '../routes.js'

class CampaignIndex extends Component{

  static async getInitialProps(){
    const campaigns = await instance.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  renderCampaign(){
    const items = this.props.campaigns.map(address =>{
      return{
        header: address,
        description: <Link route={`/campaigns/${address}`}><a>click</a></Link>,
        fluid: true
      }
    });

    return <Card.Group items={items} />;
  }


  render(){
    return(
      <Layout>
        <h3>Open Campaigns</h3>
        <div>
          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
              />
            </a>
          </Link>
          {this.renderCampaign()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
