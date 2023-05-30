import { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  TextField,
  Button,
  Alert,
  InputAdornment,
  Typography,
  Paper,
} from "@mui/material";
import web3 from "@/ethereum/web3";
import Campaign from "@/ethereum/campaign";
import Spinner from "@/components/Spinner";

const NewRequestPage = (props) => {
  const [value , setValue] = useState(0);
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { address } = props;
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const campaign = Campaign(address);

    setLoading(true);
    setError("");
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: accounts[0],
        });
      router.push(`/campaigns/${address}/requests`);
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
      <Button
        onClick={() => router.push(`/campaigns/${address}/requests`)}
        style={{ width: "210px" }}
      >
        {"Back to Requests Page"}
      </Button>
      <Typography variant="h4" style={{ marginTop: "1rem" }}>
        Create Request
      </Typography>
      <TextField
        label="Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginTop: "2rem" }}
      />
      <TextField
        id="outlined-basic"
        label="Value in Ether"
        variant="outlined"
        type="number"
        style={{ marginTop: "1rem" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">ether</InputAdornment>
          ),
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <TextField
        label="Recipient"
        variant="outlined"
        style={{ marginTop: "1rem" }}
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={onSubmit}
        style={{ marginTop: "2rem", width: "200px" }}
      >
        Create Request
      </Button>
    </Box>
  );
};

export const getServerSideProps = async (context) => {
  const campaignId = context.params.campaignId;
  return {
    props: {
      address: campaignId,
    },
  };
};

export default NewRequestPage;
