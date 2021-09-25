import React, { useEffect, useState } from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

import { Link } from "react-router-dom";
import StudentService from '../services/student.service'

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        minHeight: "100vh",
        backgroundColor: "#F0F2F5",
    },
    container: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: '60px'
    },
    button: {
        padding: "10px"
    },
    table: {
        marginTop: "10px"
    }
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function Read(props) {
    const classes = useStyles();
    const [students, setStudents] = useState([]);
    const [errorMsg, setErrorMsg] = useState("Loading...");
    const [flashMessage, setFlashMessage] = useState({ success: false, message: '' });
    const fetchData = async () => {
        const result = await StudentService.getAll()
        if (Boolean(result)) {
            setStudents(result)
            setErrorMsg("")
        } else {
            setStudents([])
            setErrorMsg("Server Not Found")
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (props.location.state) {
            setFlashMessage(props.location.state)
        }
    }, [props.location.state])

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Container fixed className={classes.container}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        paddingBottom: "2em",
                    }}
                >
                    <Typography variant="h4">Daftar Nama Mahasiswa</Typography>
                </div>
                <Link to="/add" className={classes.button}>
                    <Button variant="contained" color="primary" startIcon={<AddIcon />}>
                        Tambah Mahasiswa
                        </Button>
                </Link>
                <Collapse in={flashMessage.success}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setFlashMessage({ success: false, message: '' });
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2, mt: 2 }}
                    >
                        {flashMessage.message}
                    </Alert>
                </Collapse>
                <TableContainer component={Paper} className={classes.table}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No</StyledTableCell>
                                <StyledTableCell>NIM</StyledTableCell>
                                <StyledTableCell>Nama</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((row, index) => (
                                <StyledTableRow key={row.nim}>
                                    <StyledTableCell>{index + 1}</StyledTableCell>
                                    <StyledTableCell>{row.nim}</StyledTableCell>
                                    <StyledTableCell>{row.fullname}</StyledTableCell>

                                    <StyledTableCell>
                                        <Link to={{ pathname: '/update', search: '?id=' + row.id_mahasiswa,}} className={classes.button}>
                                            <Button variant="contained" color="info" startIcon={<EditIcon />}>
                                                Update
                                            </Button>
                                        </Link>
                                        <Link to={{ pathname: '/delete', search: '?id=' + row.id_mahasiswa,}} className={classes.button}>
                                            <Button variant="contained" color="secondary" startIcon={<DeleteIcon />}>
                                                Delete
                                            </Button>
                                        </Link>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        paddingBottom: "2em",
                    }}
                >
                    <Typography variant="h4">{errorMsg}</Typography>
                </div>
            </Container>
        </div>
    )
}

export default Read
