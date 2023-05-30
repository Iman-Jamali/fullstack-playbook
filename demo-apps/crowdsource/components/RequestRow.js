import { TableRow, TableCell, Button } from "@mui/material";
import web3 from "@/ethereum/web3";

const RequestRow = (props) => {
  const { id, request, approversCount, address, onApprove, onFinalize } = props;
  const { description, value, recipient, approvalCount, complete } = request;
  const readyToFinalize = approvalCount > approversCount / 2;

  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>{web3.utils.fromWei(value)}</TableCell>
      <TableCell>{recipient}</TableCell>
      <TableCell>
        {approvalCount}/{approversCount}
      </TableCell>
      <TableCell>
        <Button disabled={complete} variant="outlined" color="success" onClick={() => onApprove(id)}>
          Approve
        </Button>
      </TableCell>
      <TableCell>
        <Button disabled={complete} variant="outlined" onClick={() => onFinalize(id)}>
          Finalize
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default RequestRow;