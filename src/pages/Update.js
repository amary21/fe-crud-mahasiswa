import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { makeStyles } from '@mui/styles';
import { useFormik } from "formik";
import StudentService from '../services/student.service'
import * as Yup from "yup";

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
        paddingBottom: "10px"
    },
    table: {
        marginTop: "10px"
    },
    textField: {
        padding: "200px"
    }
});

function Update(props) {
    const classes = useStyles();
    const [errorMsg, setErrorMsg] = useState("Loading...");
    const [id, setId] = useState(0);

    const fetchData = async (id) => {
        const result = await StudentService.getDetail({ id })
        if (Boolean(result)) {
            formik.setValues({
                nim: result.nim,
                fullname: result.fullname,
                address: result.address,
                prodi: result.prodi,
                fakultas: result.fakultas,
                no_hp: result.no_hp,
                email: result.email,
                id: result.id_mahasiswa,
            });
            setErrorMsg("")
        } else {
            setErrorMsg("Server Not Found")
        }
    }

    useEffect(() => {
        if (props.location.search) {
            const query = new URLSearchParams(props.location.search);
            setId(query.get('id'))
            setErrorMsg("")
        } else {
            setErrorMsg("Server Not Found")
        }
    }, [props.location.search])

    useEffect(() => {
        fetchData(id);
    }, [id])

    const validationSchema = Yup.object().shape({
        nim: Yup.string().required("Masukkan nim!"),
        fullname: Yup.string().required("Masukkan nama lengkap!"),
        address: Yup.string().required("Masukkan alamat!"),
        prodi: Yup.string().required("Masukkan prodi!"),
        fakultas: Yup.string().required("Masukkan fakultas!"),
        no_hp: Yup.string().required("Masukkan nomor handphone!"),
        email: Yup.string().required("Masukkan email!"),
    });

    const formik = useFormik({
        initialValues: {
            nim: "",
            fullname: "",
            address: "",
            prodi: "",
            fakultas: "",
            no_hp: "",
            email: "",
        },
        validationSchema: validationSchema,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async ({ nim, fullname, address, prodi, fakultas, no_hp, email }) => {
            const result = await StudentService.update({ nim, fullname, address, prodi, fakultas, no_hp, email, id })
            console.log(result)
            if (!Boolean(result.error)) {
                props.history.push("/", { success: true, message: "Data mahasiswa telah diupdate" });
            }
        }
    });
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
                    <Typography variant="h4">Update Mahasiswa</Typography>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField className={classes.textField}
                                id="nim"
                                type="text"
                                name="nim"
                                label="NIM"
                                variant="outlined"
                                value={formik.values.nim}
                                onChange={formik.handleChange}
                                fullWidth
                                disabled={formik.isSubmitting}
                                error={
                                    Boolean(formik.errors.nim) && formik.touched.nim
                                }
                                helperText={formik.errors.nim} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={classes.textField}
                                id="fullname"
                                type="text"
                                name="fullname"
                                label="Nama Lengkap"
                                variant="outlined"
                                value={formik.values.fullname}
                                onChange={formik.handleChange}
                                fullWidth
                                disabled={formik.isSubmitting}
                                error={
                                    Boolean(formik.errors.fullname) && formik.touched.fullname
                                }
                                helperText={formik.errors.fullname} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={classes.textField}
                                id="address"
                                type="text"
                                name="address"
                                label="Alamat"
                                variant="outlined"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                fullWidth
                                disabled={formik.isSubmitting}
                                error={
                                    Boolean(formik.errors.address) && formik.touched.address
                                }
                                helperText={formik.errors.address} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={classes.textField}
                                id="prodi"
                                type="text"
                                name="prodi"
                                label="Program Studi"
                                variant="outlined"
                                value={formik.values.prodi}
                                onChange={formik.handleChange}
                                fullWidth
                                disabled={formik.isSubmitting}
                                error={
                                    Boolean(formik.errors.prodi) && formik.touched.prodi
                                }
                                helperText={formik.errors.prodi} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={classes.textField}
                                id="fakultas"
                                type="text"
                                name="fakultas"
                                label="Fakultas"
                                variant="outlined"
                                value={formik.values.fakultas}
                                onChange={formik.handleChange}
                                fullWidth
                                disabled={formik.isSubmitting}
                                error={
                                    Boolean(formik.errors.fakultas) && formik.touched.fakultas
                                }
                                helperText={formik.errors.fakultas} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={classes.textField}
                                id="no_hp"
                                type="number"
                                name="no_hp"
                                label="No. Handphone"
                                variant="outlined"
                                value={formik.values.no_hp}
                                onChange={formik.handleChange}
                                fullWidth
                                disabled={formik.isSubmitting}
                                error={
                                    Boolean(formik.errors.no_hp) && formik.touched.no_hp
                                }
                                helperText={formik.errors.no_hp} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={classes.textField}
                                id="email"
                                type="text"
                                name="email"
                                label="Email"
                                variant="outlined"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                fullWidth
                                disabled={formik.isSubmitting}
                                error={
                                    Boolean(formik.errors.email) && formik.touched.email
                                }
                                helperText={formik.errors.email} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.BtnSave}
                                endIcon={<SaveRoundedIcon />}
                                type="submit"
                            >
                                {formik.isSubmitting ? "Menyimpan..." : "Simpan"}
                            </Button>
                        </Grid>


                    </Grid>
                </form>
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
    );
}

export default Update;
