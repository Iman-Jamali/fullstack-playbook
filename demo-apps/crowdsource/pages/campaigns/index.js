import { useRouter } from 'next/router';
import { CardContent, Typography, Box, Button, Card, Paper } from '@mui/material';
import factory from '@/ethereum/factory';

const CampaignPage = (props) => {
  const campaigns = props.campaigns;
  const router = useRouter();

  return (
    <Box display="flex" flexDirection="column" component={Paper} style={{padding: "2rem"}}>
      <Typography variant="h5" style={{ marginBottom: "1rem" }}>Open Campaigns</Typography>
      {campaigns.map((campaign) => {
        return (
          <Card key={campaign} style={{ width: "600px", marginBottom: "2rem", padding: "1rem" }}>
            <CardContent>
              <Typography variant="body1">Campaign Address: {campaign}</Typography>
              <div style={{ marginTop: "1rem" }}>
                <Button variant='text' onClick={() => router.push(`/campaigns/${campaign}`)}>View Campaign</Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
      <Button
        variant="contained"
        style={{ width: "300px", marginTop: "1rem" }}
        onClick={() => router.push("/campaigns/new")}
      >
        Create a New Campaign
      </Button>
    </Box>
  );
}

export const getServerSideProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return {
    props: {
      campaigns,
    },
  };
};

export default CampaignPage;