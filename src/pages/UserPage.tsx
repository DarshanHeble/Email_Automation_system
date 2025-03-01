import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import { User } from "../Types/types";

function UserTable() {
  const userColumns = useMemo<MRT_ColumnDef<User>[]>(() => [], []);
  const userTable = useMaterialReactTable({
    columns: userColumns,
  });

  return <MaterialReactTable table={userTable} />;
}

const UserPage = () => {
  return (
    <div>
      <UserTable />
    </div>
  );
};

export default UserPage;
