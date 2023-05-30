import { useState } from "react";
import { useRouter } from "next/router";
import { Box, TextField, Button, InputAdornment, Alert, Typography } from "@mui/material";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import Spinner from "./Spinner";

const ContributeForm = (props) => {
  const { address } = props;
  const router = useRouter();
  const [contributionAmount, setContributionAmount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const campaign = Campaign(address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(contributionAmount, "ether"),
      });
      router.reload();
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <Box display="flex" flexDirection="column">
      <Spinner loading={loading}>
          <Typography style={{ marginBottom: "1rem" }}>Transaction is been processed</Typography>
      </Spinner>
      {error && (
        <Alert style={{ marginBottom: "1rem" }} severity="error">
          {error}
        </Alert>
      )}
      <TextField
        id="outlined-basic"
        label="Amount to Contribute"
        variant="outlined"
        type="number"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">ether</InputAdornment>
          ),
        }}
        value={contributionAmount}
        onChange={(e) => setContributionAmount(e.target.value)}
      />
      <Button variant="contained" style={{marginTop: '1rem'}} onClick={onSubmit}>
        Contribute to Campaign
      </Button>
    </Box>
  );
};

export default ContributeForm;
