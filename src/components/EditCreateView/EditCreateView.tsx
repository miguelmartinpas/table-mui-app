import React, { useEffect, useState } from 'react'
import { Button, FormHelperText, Input, InputLabel, Snackbar } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useNavigate, useLocation } from 'react-router-dom';
import { defaultProduct } from '../../services/product.mock';
import { getProduct, updateProduct, createProduct } from '../../services/products';
import { Product } from '../../services/products.interface';

interface Field {
  key: string;
  type: 'string' | 'number';
}

interface ProductObjectKeys extends Product {
  [key: string]: string | string[] | number | undefined;
}

const EditCreateView = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [, , id] = pathname.split('/');
  const isEdit = Number.isInteger(Number.parseInt(id));
  const [product, setProduct] = useState<ProductObjectKeys | undefined>();

  useEffect(() => {
    if (isEdit && !product) {
      getProduct(id).then(response => {
        setProduct(response as ProductObjectKeys)
      });
    }
  }, [])

  const handleOnsubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isEdit) {
      const { id: currentId, ...productToUpdate } = product as Product;
      try {
        const response = await updateProduct(id, productToUpdate);
        if (response.id) {
          enqueueSnackbar(`"${productToUpdate.title}" has been update with success.`, { onClose: () => navigate('/view') });
        }
      } catch (error: any) {
        enqueueSnackbar(`Something was bad when try to update "${productToUpdate.title}": ${error.message}.`, { onClose: () => navigate('/view') });
      } 
    } else {
      const productToSave = { ...defaultProduct(), ...product } as Product;
      try {
        const response = await createProduct(productToSave);
        if (response.id) {
          enqueueSnackbar(`"${productToSave.title}" has been save with success.`, { onClose: () => navigate('/view') });
        }
      } catch (error: any) {
        enqueueSnackbar(`Something was bad when try to create "${productToSave.title}": ${error.message}.`, { onClose: () => navigate('/view') });
      } 
    }
  }

  const fields: Field[] = [
    { key: 'title', type: 'string'}, 
    { key: 'description', type: 'string'}, 
    { key: 'price', type: 'number'},
    { key: 'discountPercentage', type: 'number'},
    { key: 'rating', type: 'number'},
    { key: 'stock', type: 'number'},
    { key: 'brand', type: 'string'},
    { key: 'category', type: 'string'}
  ];

  const renderField = ({ key, type }: Field): React.ReactElement => {
    const value = product && product[key] || '';
    return (
      <React.Fragment key={key}>
        <InputLabel htmlFor={`field-${key}`}>{key}</InputLabel>
        <Input 
          type={type} 
          id={`${key}Id`} 
          name={key} 
          value={value}
          aria-describedby={`field-helper-${key}`} 
          onChange={(props: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => { 
            const currentData = {} as ProductObjectKeys;
            currentData[key] = type === 'number' ? Number.parseInt(props.target.value) : props.target.value;
            setProduct({...product, ...currentData});
          }}
        />
        <FormHelperText id={`field-helper-${key}`}>Help for {key}.</FormHelperText>
      </React.Fragment>
    )
  }

  return (
    <div className="App">
      <h1>{isEdit ? "Edit page" : "Create page"}</h1>
      {
      !isEdit || (isEdit && product) 
      ? (
        <form onSubmit={handleOnsubmit}>
          {fields.map((field: Field) => renderField(field))}
          <Button variant="text" onClick={() => navigate('/view')}>Cancel</Button>
          <Button type="submit" variant="contained" >Submit</Button>
        </form>
      )
      : (
        <>Loading...</>
      )
      }
    </div>
  );

}

export default EditCreateView;
