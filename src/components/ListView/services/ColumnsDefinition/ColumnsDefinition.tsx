import { GridColDef, GridRenderCellParams, GridColumnHeaderParams } from '@mui/x-data-grid';
import { Button, Icon, IconButton, Tooltip } from '@mui/material';
import { NavigateFunction } from 'react-router-dom';
import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';
import { deleteProduct } from '../../../../services/products';

interface ColumnsDefinition {
  navigate: NavigateFunction,
  enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey,
}

export const getColumns = ({ navigate, enqueueSnackbar }: ColumnsDefinition): GridColDef[] => [
  { field: 'id', headerName: 'Id', flex: 0.25, align: "right",  disableColumnMenu: true },
  { field: 'title', headerName: 'Title', flex: 1, disableColumnMenu: true },
  { field: 'description', headerName: 'Description', flex: 3, disableColumnMenu: true },
  { field: 'thumbnail', 
    headerName: 'Imagen', 
    flex: 0.5,
    disableColumnMenu: true,
    renderCell: ({ value }: GridRenderCellParams) => {
      return (
        <img
          style={{ height: '80%', imageRendering: 'pixelated' }}
          loading="lazy"
          src={value}
        />
      ); 
    }
  },
  { field: 'options', 
    headerName: '',
    renderHeader(params: GridColumnHeaderParams) {
      return (
        <div className="e-header__options">
          <Tooltip title="Create a new product">
            <Button variant="contained" size="small" color="primary"  onClick={(event) => {
              navigate(`/view/new`);
            }}>
              <Icon fontSize="small">
                edit
              </Icon>
            </Button>
          </Tooltip>
        </div>
      )
    }, 
    sortable: false,
    disableColumnMenu: true, 
    flex: 0.5,
    align: "center",
    renderCell: ({ row: { id, title } }: GridRenderCellParams) => {
      return (
        <>
          <Tooltip title={`Edit "${title}"`}>
            <IconButton size="small" color="primary"  onClick={(event) => {
              navigate(`/view/${id}`);
            }}>
              <Icon fontSize="small">
                edit
              </Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title={`Delete "${title}"`}>
            <IconButton size="small" color="error"  onClick={async (event) => {
              const confirmResponse = confirm(`Are you sure you want permanently remove "${title}"`);
              if (confirmResponse) {
                try {
                  await deleteProduct(id);
                  enqueueSnackbar(`"${title}" has been delete with success.`, { onClose: () => navigate('/') });
                } catch (error: any) {
                  console.log({error})
                  enqueueSnackbar(`Something was bad when try to delete "${title}": ${error.message}.`, { onClose: () => navigate('/view'), autoHideDuration: 1000 });
                } 
              }
            }}>
              <Icon fontSize="small">
                delete
              </Icon>
            </IconButton>
          </Tooltip>
        </>
      );
    } 
  }, 
];
