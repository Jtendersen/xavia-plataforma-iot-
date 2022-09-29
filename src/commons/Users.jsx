import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Stack } from "@mui/material";
import { getAllUsers } from "../store/reducers/usersAll.reducer.js";
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
import useMatches from "../hooks/useMatches.js";

// opciones de filtro en la vista Desktop
function CustomToolbar() {
    return (
        <GridToolbarContainer sx={{ justifyContent: "space-between" }}>
            <Stack direction="row">
                <GridToolbarColumnsButton
                    sx={{
                        display: { xs: "none", sm: "flex" },
                        color: "#3300B8",
                    }}
                />
                <GridToolbarFilterButton
                    sx={{
                        display: { xs: "none", sm: "flex" },
                        color: "#3300B8",
                    }}
                />
                <GridToolbarExport
                    sx={{
                        display: { xs: "none", sm: "flex" },
                        color: "#3300B8",
                    }}
                />
            </Stack>
            <GridToolbarQuickFilter />
        </GridToolbarContainer>
    );
}

const Users = () => {
    // hooks redux
    const { hide, tableSize, marginHeader } = useSelector((state) => state.hide);
    const users = useSelector((state) => state.users);
    const views = useSelector((state) => state.views);
    const dispatch = useDispatch();
    const match = useMatches();

    // hooks state
    const [deleteAction, setDeleteAction] = useState(true);
    const [size, setSize] = useState(4);
    const [tableHeight, setTableHeight] = useState({ xs: "30vh", sm: "70vh" });


    // setea el comportamiento responsive de la tabla
    useEffect(() => {
        function handleWindowResize() {
            if (match) {
                dispatch(
                    setHide({
                        hide: false,
                        tableSize: 9,
                        marginHeader: { marginTop: "" },
                    })
                );
            } else {
                if (views === "usuariosFinales") setSize(9);
                if (views === "profile") setSize(4);
                dispatch(
                    setHide({
                        hide: true,
                        tableSize: size,
                        marginHeader: { marginTop: "0!important" },
                    })
                );
            }
        }
        handleWindowResize();

    }, [dispatch, views, size, match]);

    // actualiza la lista de usuarios
    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch, deleteAction]);

    // cambia el tamaño de la tabla dependiendo de la vista
    useEffect(() => {
        if (views === "profile") {
            setTableHeight({ xs: "30vh", sm: "70vh" });
        } else {
            setTableHeight({ xs: "90vh", sm: "80vh" });
        }
    }, [views]);

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
            },
            {
                field: "empresa",
                headerName: "Usuario final",
                minWidth: 100,
                flex: 0.2,
            },
            {
                field: "createdAt",
                headerName: "Fecha de alta",
                renderCell: (params) => moment(params.row.createdAt).format("DD-MM-YYYY"),
                minWidth: 100,
                flex: 0.1,
                hide,
            },
            {
                field: "fullname",
                headerName: "Responsable",
                minWidth: 150,
                flex: 0.15,
                hide,
            },
            {
                field: "email",
                headerName: "Correo electrónico",
                minWidth: 150,
                flex: 0.2,
                hide,
            },
            {
                field: "_id",
                headerName: "Acciones",
                type: "actions",
                flex: 0.2,
                renderCell: (params) => <UserActions {...{ params, deleteAction, setDeleteAction }} />,
            },
        ],
        [hide, deleteAction]
    );

    // retorna DataGrid. La tabla se llena con el estado redux de users
    return (
        <Box
            sx={{
                minHeight: 350,
                width: "100%",
            }}
            height={{ xs: tableHeight.xs, sm: tableHeight.sm }}
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
                sx={{
                    border: "none",
                    "& .MuiDataGrid-columnHeaders": {
                        display: { xs: "none", sm: "flex" },
                    },
                    "& .MuiDataGrid-virtualScroller": marginHeader,
                }}
            />
        </Box>
    );
};

export default Users;
