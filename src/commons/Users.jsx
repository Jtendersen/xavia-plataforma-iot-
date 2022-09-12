import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box } from "@mui/material";
import {getAllUsers} from "../store/reducers/usersAll.reducer.js";
import { setHide } from "../store/reducers/hide.reducer.js";
import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton,
    GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import UserActions from "./UserActions.jsx";
import moment from "moment";

// opciones de filtro en la vista Desktop
function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton
                sx={{ display: { xs: "none", sm: "flex" }, color: "#3300B8" }}
            />
            <GridToolbarFilterButton
                sx={{ display: { xs: "none", sm: "flex" }, color: "#3300B8" }}
            />
            <GridToolbarExport
                sx={{ display: { xs: "none", sm: "flex" }, color: "#3300B8" }}
            />
            <GridToolbarQuickFilter />
        </GridToolbarContainer>
    );
}

const Users= () => {
    // hooks redux
    const {hide, tableSize} = useSelector((state) => state.hide);
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();

    // hooks state
    const [deleteAction, setDeleteAction] = useState(true);

    // función para obtener ancho de pantalla
    function getWindowSize() {
        const { innerWidth } = window;
        return innerWidth;
    }

    // setea el comportamiento responsive de la tabla
    useEffect(() => {
        function handleWindowResize() {
            if (getWindowSize() < 600) {
                dispatch(setHide({hide: true, tableSize: 4}));
            } else {
                dispatch(setHide({hide: false, tableSize:10}));
            }
        }
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, [dispatch]);

    // actualiza la lista de usuarios
    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch, deleteAction]);

    // hook useMemo para creación y seguimiento de las columnas de datos
    const columns = useMemo(
        () => [
            {
                field: "imgUrl",
                headerName: "Avatar",
                renderCell: (params) => <Avatar src={params.row.imgUrl} />,
                sortable: false,
                filterable: false,
                flex: 0.03,
                minWidth: 60,
                hide
            },
            {
                field: "empresa",
                headerName: "Usuario final",
                minWidth: 200,
                flex: 0.2,
            },
            {
                field: "createdAt",
                headerName: "Fecha de alta",
                renderCell: (params) =>
                    moment(params.row.createdAt).format("DD-MM-YYYY"),
                minWidth: 100,
                flex: 0.1,
                hide
            },
            {
                field: "fullname",
                headerName: "Responsable",
                minWidth: 150,
                flex: 0.15,
                hide
            },
            {
                field: "email",
                headerName: "Correo electrónico",
                minWidth: 150,
                flex: 0.2,
                hide
            },
            {
                field: "_id",
                headerName: 'Acciones',
                type:"actions",
                flex:0.2,
                renderCell:(params) => <UserActions {...{params, deleteAction, setDeleteAction}} />
            }
        ],
        [hide, deleteAction]
    );

    // retorna DataGrid. La tabla se llena con el estado redux de users
    return (
        <Box
            sx={{
                minHeight: 400,
                width: "100%",
            }}
            height={{ xs: "40vh", sm: "80vh" }}
        >
            <DataGrid
                columns={columns}
                rows={users}
                getRowId={(row) => row._id}
                components={{ Toolbar: CustomToolbar }}
                density="standard"
                disableSelectionOnClick={true}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    },
                }}
                pageSize={tableSize}
                rowsPerPageOptions={[tableSize]}
                sx={{ border: "none" }}
            />
        </Box>
    );
};

export default Users;
