import * as React from "react";
import {
  DataGrid,
  DataGridProps,
  GridCallbackDetails,
  GridColumnHeaders,
  GridColumnVisibilityModel,
  GridRow,
  GridRowIdGetter,
  GridRowParams,
  GridRowSelectionModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridValidRowModel,
  GridRowClassNameParams,
} from "@mui/x-data-grid";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { ptBR } from "@mui/x-date-pickers/locales";

const MemoizedRow = React.memo(GridRow);
const MemoizedColumnHeaders = React.memo(GridColumnHeaders);
type RowData = {
  id: number | string;
};

interface DataGridCustomProps<T extends GridValidRowModel>
  extends Omit<DataGridProps, "getRowId"> {
  getRowId?: GridRowIdGetter<T>;
  getRowClassName?: (params: GridRowClassNameParams) => string;
  rows: T[];
  columns: any[];
  columnVisibilityModel?: GridColumnVisibilityModel;
  onColumnVisibilityModelChange?: (
    model: GridColumnVisibilityModel,
    details: GridCallbackDetails
  ) => void;
  customButton?: any;
  checkboxSelection?: boolean;
  isRowSelectable?: (params: GridRowParams) => boolean;
  onRowSelectionModelChange?: (
    newRowSelectionModel: GridRowSelectionModel
  ) => void;
  rowSelectionModel?: GridRowSelectionModel;
  loading?: boolean;
  pageSize?: 1 | 3 | 5 | 10 | 15 | 20 | 25 | 50 | 100;
  headerHeight?: number;
  isReversal?: boolean;
}
const DataGridCustom = <T extends RowData>({
  rows,
  columns,
  columnVisibilityModel,
  onColumnVisibilityModelChange,
  customButton,
  getRowId,
  checkboxSelection,
  isRowSelectable,
  onRowSelectionModelChange,
  rowSelectionModel,
  loading,
  pageSize,
  getRowClassName,
  headerHeight = 56,
  isReversal = false
  
}: DataGridCustomProps<T>) => {
  const theme = useTheme();
  const isVisibled = useMediaQuery(theme.breakpoints.up("sm"));
  const fieldsToExport = localStorage.getItem('selectedFields')
  const storedFieldsArray = fieldsToExport ? fieldsToExport.split(',') : [];
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        {customButton}
        {isVisibled && <GridToolbarColumnsButton />}
        {isVisibled && <GridToolbarFilterButton />}
        {isVisibled && <GridToolbarDensitySelector />}
        {isReversal && storedFieldsArray.length > 0 ?     
        <GridToolbarExport
          csvOptions={{
            delimiter: ";",
            utf8WithBom: true,
            fields: storedFieldsArray
          }}
          
          printOptions={{
            disableToolbarButton: true,
          }}
        /> :     
        <GridToolbarExport
        csvOptions={{
          delimiter: ";",
          utf8WithBom: true,
          allColumns: true,
        }}
        
        printOptions={{
          disableToolbarButton: true,
        }}
      />}
    
      </GridToolbarContainer>
    );
  };
  return (
    <Box
      sx={{
        [theme.breakpoints.down("lg")]: {
          width: `calc(100vw - ${theme.spacing(4)})`,
        },
      }}
    >
      <DataGrid
        getRowHeight={() => "auto"}        
        rows={rows}
        columns={columns}
        getRowClassName={(params: GridRowClassNameParams) => {
          const customClassName = getRowClassName?.(params);
          const moduleClassName = customClassName
            ? ` ${[customClassName]}`
            : "";
          return `MuiDataGrid-row${moduleClassName}`;
        }}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={onColumnVisibilityModelChange}
        getRowId={getRowId ?? ((row: T) => row.id)}
        slots={{
          toolbar: CustomToolbar,
          row: MemoizedRow,
          columnHeaders: MemoizedColumnHeaders,
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pageSize ?? 10,
            },
          },
        }}
        pageSizeOptions={[1, 3, 5, 10, 15, 20, 25, 50, 100]}
        disableRowSelectionOnClick
        checkboxSelection={checkboxSelection}
        isRowSelectable={isRowSelectable}
        columnHeaderHeight={headerHeight}
        onRowSelectionModelChange={onRowSelectionModelChange}
        rowSelectionModel={rowSelectionModel}
        sx={{
          "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
            outline: "none !important",
          },
          "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus":
            {
              outline: "none !important",
            },
            "&  .MuiDataGrid-columnHeaderTitle": {      
              overflow: "hidden",      lineHeight: "20px",      whiteSpace: "normal", height: 'auto',textOverflow: "ellipsis"  },"& .MuiDataGrid-cell": {
                overflowWrap: "break-word", // Quebra palavras longas
                whiteSpace: "normal", // Permite quebra de linhas
                textOverflow: "ellipsis", // Adiciona reticências "..."
              },
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgb(37, 37, 38)"
              : "rgb(255, 255, 255)",

          padding: theme.spacing(2),
        }}
        loading={loading}
      />
    </Box>
  );
};
export default DataGridCustom;
