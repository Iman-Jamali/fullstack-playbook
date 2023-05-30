import { useState } from "react";
import { useRouter } from 'next/router';
import { Box, Paper, Button, TextField, InputAdornment, Alert, CircularProgress, Typography } from "@mui/material";
import Spinner from "@/components/Spinner";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

const NewCampaignPage = () => {
  const [minimumContribution, setMinimumContribution] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minimumContribution).send({
        from: accounts[0],
      });
      router.push("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <Box display="flex" flexDirection="column" component={Paper} style={{padding: '2rem'}}>
      <Spinner loading={loading}>
          <Typography style={{ marginBottom: "1rem" }}>Transaction is been processed</Typography>
      </Spinner>
      {error && (
        <Alert style={{ marginBottom: "1rem" }} severity="error">
          {error}
        </Alert>
      )}
      <Typography variant="h5" style={{ marginBottom: "3rem" }}>Create a New Campaign</Typography>
      <TextField
        id="outlined-basic"
        label="Minimum Contribution"
        variant="outlined"
        type="number"
        style={{width: "300px"}}
        InputProps={{
          startAdornment: <InputAdornment position="start">wei</InputAdornment>,
        }}
        value={minimumContribution}
        onChange={(e) => setMinimumContribution(e.target.value)}
      />
      <Button variant="contained" sx={{ mt: 2 }} onClick={onSubmit} style={{width: "200px"}}>
        Create Campaign
      </Button>
    </Box>
  );
};

export default NewCampaignPage;