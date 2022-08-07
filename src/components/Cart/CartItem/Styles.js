import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    productdetails: {
        display: "flex",
        justifyContent: "space-between"
    },
    CardMedia: {
        height: "300px !important",
        width: "100%",
    },
    CardActions: {
        display: "flex !important",
        justifyContent: "space-between"
    },
    button: {
        backgroundColor: "red !important",
        color: "floralwhite !important"
    },
    change: {
        display: "flex !important",
        alignItems: "center"
    }
}))