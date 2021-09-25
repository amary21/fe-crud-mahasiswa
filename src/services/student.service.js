const apiUrl = process.env.REACT_APP_API_BASEURL;

class StudentService {
    async getAll() {
        try {
            const response = await fetch(apiUrl + "/")
            const responseJson = await response.json();
            if (responseJson.status === 200 && responseJson.data) {
                return responseJson.data;
            }
        } catch (error) {
            return { error }
        }
    }

    async getDetail({ id }) {
        try {
            const response = await fetch(apiUrl + "/?id=" + id)
            const responseJson = await response.json();
            if (responseJson.status === 200 && responseJson.data) {
                return responseJson.data;
            }
        } catch (error) {
            return { error }
        }
    }

    async insert({ nim, fullname, address, prodi, fakultas, no_hp, email }) {
        try {
            const response = await fetch(apiUrl + "/add", {
                method: "POST",
                body: new URLSearchParams({
                    nim,
                    fullname,
                    address,
                    prodi,
                    fakultas,
                    no_hp,
                    email
                })
            })
            const responseJson = await response.json();
            if (responseJson.status === 200) {
                return responseJson.message;
            }
        } catch (error) {
            return { error }
        }
    }

    async update({ nim, fullname, address, prodi, fakultas, no_hp, email, id }) {
        try {
            const response = await fetch(apiUrl + "/update", {
                method: "POST",
                body: new URLSearchParams({
                    nim,
                    fullname,
                    address,
                    prodi,
                    fakultas,
                    no_hp,
                    email, 
                    id
                })
            })
            const responseJson = await response.json();
            if (responseJson.status === 200) {
                return responseJson.message;
            }
        } catch (error) {
            return { error }
        }
    }

    async delete({ id }) {
        try {
            const response = await fetch(apiUrl + "/delete", {
                method: "DELETE",
                body: new URLSearchParams({
                    id
                })
            })
            const responseJson = await response.json();
            if (responseJson.status === 200) {
                return responseJson.message;
            }
        } catch (error) {
            return { error }
        }
    }
}

export default new StudentService();