import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { getProducts } from '../../services/products';
import { Product } from '../../services/products.interface';
import { useNavigate } from 'react-router-dom';
import { getColumns } from './services/ColumnsDefinition';
import { useSnackbar } from 'notistack';

const ListView = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState<Product[] | undefined>();

  useEffect(() => {
    if (!rows) {
      getProducts().then(response => setRows(response));
    }
  }, [])
 
  return (
    <div className="App">
      <div style={{ height: '800px', width: '100%' }}>
        {rows 
          ? <DataGrid 
            checkboxSelection
            rows={rows} 
            columns={getColumns({navigate, enqueueSnackbar})}  
            autoPageSize
            // paginationMode='server'
            // pageSize={15}
            // rowsPerPageOptions={[15, 30, 50]}
            /> 
          : <div>Loading...</div>
          }
      </div>
    </div>
  );

}

export default ListView;
