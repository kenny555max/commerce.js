import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    logo: {
        display: "flex !important",
        color: "black",
        flexDirection: "row !important",
        alignItems: "center !important",
        textDecoration: "none !important"
    },
    AppBar: {
        backgroundColor: "white !important",
    },
    Toolbar: {
        width: "100% !Important",
        display: "flex !important",
        color: "black",
        backgroundColor: "white !important",
        flexDirection: "row !important",
        alignItems: "center !important",
        justifyContent: "space-between"
    },
    userdetails: {
        display: "flex"
    }
}));