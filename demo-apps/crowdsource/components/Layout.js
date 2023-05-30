import { Fragment } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Header from "./Header";
import { Box, Divider } from '@mui/material';

const Layout = (props) => {
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        {props.children}
      </Container>
    </Fragment>
  )
}

export default Layout;