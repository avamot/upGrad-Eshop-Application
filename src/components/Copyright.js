import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from '@mui/material/Box';


export default function Copyright() {
    return (
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            my:1
          }}
        >
        <Typography
            variant="body2"
            color="textSecondary"
            align="center"
        >
            {"Copyright © "}
            <Link href="https://www.upgrad.com/" underline="always" color="initial">
                upgrad
            </Link>{" "}
            {2021}
            {"."}
        </Typography>
        </Box>
    );
}