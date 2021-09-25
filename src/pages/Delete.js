import React, {useEffect, useState} from 'react'
import StudentService from '../services/student.service'

function Delete(props) {
    const [id, setId] = useState(0);
    const fetchData = async (id) => {
        const result = await StudentService.delete({ id })
        if (Boolean(result)) {
            props.history.push("/", { success: true, message: "Data mahasiswa telah dihapus" });
        }
    }

    useEffect(() => {
        if (props.location.search) {
            const query = new URLSearchParams(props.location.search);
            setId(query.get('id'))
        }
    }, [props.location.search])

    useEffect(() => {
        fetchData(id);
    }, [id])


    return (
        <></>
    )
}

export default Delete
