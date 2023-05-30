import { useState } from "react";
import {
  Box,
  Button,
  TableContainer,
  Typography,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  Alert,
} from "@mui/material";
import { useRouter } from "next/router";
import Campaign from "@/ethereum/campaign";
import web3 from "@/ethereum/web3";
import Spinner from "@/components/Spinner";
import RequestRow from "@/components/RequestRow";

const RequestsPage = (props) => {
  const { address, requests, requestsCount, approversCount } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onApprove = async (id) => {
    const campaign = Campaign(address);
    setLoading(true);
    setError("");
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(id).send({
        from: accounts[0],
      });
      router.reload();
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
    setLoading(false);
  };
  
  const onFinalize = async (id) => {
    const campaign = Campaign(address);
    setLoading(true);
    setError("");
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.finalizeRequest(id).send({
        from: accounts[0],
      });
      router.reload();
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      component={Paper}
      style={{ padding: "2rem" }}
    >
      <Spinner loading={loading}>
        <Typography style={{ marginBottom: "1rem" }}>
          Transaction is been processed
        </Typography>
      </Spinner>
      {error && (
        <Alert style={{ marginBottom: "1rem" }} severity="error">
          {error}
        </Alert>
      )}
      <Typography variant="h4">Requests</Typography>
      <Button
        variant="contained"
        onClick={() => router.push(`/campaigns/${address}/requests/new`)}
        style={{ marginTop: "2rem", width: "150px" }}
      >
        Add Request
      </Button>
      <TableContainer style={{ marginTop: "3rem" }}>
        <Table component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Recipient</TableCell>
              <TableCell>Approval Count</TableCell>
              <TableCell>Approve</TableCell>
              <TableCell>Finalize</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request, index) => (
              <RequestRow
                key={index}
                id={index}
                request={request}
                address={address}
                approversCount={approversCount}
                onApprove={onApprove}
                onFinalize={onFinalize}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="caption text" style={{ marginTop: "3rem" }}>
        Found {requestsCount} requests
      </Typography>
    </Box>
  );
};

export const getServerSideProps = async (context) => {
  const address = context.params.campaignId;
  const campaign = Campaign(address);
  const requestsCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();
  const requests = await Promise.all(
    Array(parseInt(requestsCount))
      .fill()
      .map((_, index) => {
        return campaign.methods.requests(index).call();
      })
  );
  return {
    props: {
      address,
      requests: JSON.parse(JSON.stringify(requests)),
      requestsCount,
      approversCount,
    },
  };
};

export default RequestsPage;
