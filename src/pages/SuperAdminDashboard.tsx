import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material"; 
import {
  DataGrid,
  type GridColDef,
  GridActionsCellItem,
  GridToolbar,
} from "@mui/x-data-grid";
import { 
  getAllUsers,
  updateUserById,
  deleteUserById,
} from "../services/superAdminService";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
}

const Role = {
  User: "user",
  Manager: "manager",
  Admin: "admin",
  SuperAdmin: "superadmin",
} as const;

type Role = typeof Role[keyof typeof Role];

export default function SuperAdminDashboard() {
  const [rows, setRows] = useState<User[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editRow, setEditRow] = useState<User | null>(null);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setRows(data);
    } catch {
      setToast({ open: true, message: "Failed to load users.", type: "error" });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id: string, newRole: Role) => {
    try {
      await updateUserById(id, { role: newRole });
      setToast({ open: true, message: "Role updated.", type: "success" });
      fetchUsers();
    } catch {
      setToast({ open: true, message: "Failed to update role.", type: "error" });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteUserById(deleteId);
      setRows((prev) => prev.filter((row) => row.id !== deleteId));
      setToast({ open: true, message: "User deleted.", type: "success" });
    } catch {
      setToast({ open: true, message: "Failed to delete user.", type: "error" });
    } finally {
      setDeleteId(null);
    }
  };

  const handleSaveEdit = async () => {
    if (!editRow) return;
    try {
      const { id, name, phone } = editRow;
      await updateUserById(id, { name, phone });
      setToast({ open: true, message: "User updated successfully.", type: "success" });
      setEditRow(null);
      fetchUsers();
    } catch {
      setToast({ open: true, message: "Failed to update user.", type: "error" });
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: (params) => (
        <Select
          value={params.row.role}
          onChange={(e) =>
            handleRoleChange(params.row.id, e.target.value as Role)
          }
          size="small"
          fullWidth
        >
          {Object.values(Role).map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      getActions: (params) => [
        <GridActionsCellItem
          label="Edit"
          showInMenu
          onClick={() => setEditRow(params.row)}
        />,
        <GridActionsCellItem
          label="Delete"
          showInMenu
          onClick={() => setDeleteId(params.row.id)}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Super Admin Dashboard
      </Typography>

      <Box sx={{ height: "auto", minHeight: 400 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}
          autoHeight
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
        />
      </Box>

      {/* Edit Dialog */}
      <Dialog open={!!editRow} onClose={() => setEditRow(null)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            value={editRow?.name || ""}
            onChange={(e) =>
              setEditRow((prev) =>
                prev ? { ...prev, name: e.target.value } : null
              )
            }
          />
          <TextField
            fullWidth
            margin="dense"
            label="Phone"
            value={editRow?.phone || ""}
            onChange={(e) =>
              setEditRow((prev) =>
                prev ? { ...prev, phone: e.target.value } : null
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditRow(null)}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user? This action is irreversible.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          severity={toast.type}
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
