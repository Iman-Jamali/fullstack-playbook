import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from "@mui/material/Button";
import { useRouter } from "next/router";


const Header = () => {
  const router = useRouter();

  return (
    <Box paddingBottom={2}>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={() => router.push("/campaigns")} color="inherit">Campaigns</Button>
          <Button onClick={() => router.push("/campaigns/new")} color="inherit">Create Campaign</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


export default Header;