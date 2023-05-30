import web3 from "@/ethereum/web3";
import Campaign from "../../ethereum/campaign";
import { Box, Card, CardContent, CardHeader, Typography, Button, Paper } from '@mui/material';
import ContributeForm from "@/components/ContributeForm";
import { useRouter } from 'next/router';

const CampaignDetailPage = (props) => {
  const {
    balance,
    manager,
    minimumContribution,
    requestsCount,
    approversCount,
    address,
    campaignAddress
  } = props;

  const router = useRouter();
  
  return (
    <Box display="flex" flexDirection="column" style={{ padding: "2rem" }}
    component={Paper}>
      <Typography variant="h4" style={{ marginBottom: "2rem" }}>Campaign</Typography>
      <Typography variant="caption text" style={{ marginBottom: "2rem" }}>Address: {campaignAddress}</Typography>
      <Box
        display="flex"
        flexDirection="row"
      >
        <Box display="flex" flexDirection="column">
          <Card style={{ marginTop: "1rem" }}>
            <CardHeader title={web3.utils.fromWei(balance, "ether") + " ether"} />
            <CardContent>
              <Typography variant="body1">Campaign Balance</Typography>
              <Typography variant="body2">
                The balance is how much money this campaign has left to spend
              </Typography>
            </CardContent>
          </Card>
          <Card style={{ marginTop: "1rem" }}>
            <CardHeader title={manager} />
            <CardContent>
              <Typography variant="body1">Address of Manager</Typography>
              <Typography variant="body2">
                The manager created this campaign and can create requests to
                withdraw money
              </Typography>
            </CardContent>
          </Card>
          <Card style={{ marginTop: "1rem" }}>
            <CardHeader title={minimumContribution + " wei"} />
            <CardContent>
              <Typography variant="body1">Minimum Contribution (wei)</Typography>
              <Typography variant="body2">
                You must contribute at least this much wei to become an approver
              </Typography>
            </CardContent>
          </Card>
          <Card style={{ marginTop: "1rem" }}>
            <CardHeader title={requestsCount} />
            <CardContent>
              <Typography variant="body1">Number of Requests</Typography>
              <Typography variant="body2">
                A request tries to withdraw money from the contact. Requests
                must be approved by approvers.
              </Typography>
            </CardContent>
          </Card>
          <Card style={{ marginTop: "1rem" }}>
            <CardHeader title={approversCount} />
            <CardContent>
              <Typography variant="body1">Number of Approvers</Typography>
              <Typography variant="body2">
                Number of people who have already donated to this campaign
              </Typography>
            </CardContent>
          </Card>
          <Button
            variant="outlined"
            style={{ width: "200px", marginTop: "2rem" }}
            onClick={() => router.push(`/campaigns/${address}/requests`)}
          >
            View Requests
          </Button>
        </Box>
        <Box style={{margin: "1rem"}}>
          <ContributeForm address={address} />
        </Box>
      </Box>
    </Box>
  );
};

export const getServerSideProps = async (context) => {
  const campaignAddress = context.params.campaignId;
  const campaign = Campaign(campaignAddress);
  const summary = await campaign.methods.getSummary().call();
  return {
    props: {
      address: campaignAddress,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      campaignAddress
    },
  };
};

export default CampaignDetailPage;