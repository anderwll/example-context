/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  TextField,
  Divider,
  Autocomplete,
  Typography,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  useFieldArray,
  Controller,
  useForm,
  useFormContext,
} from "react-hook-form";
import { SchemaForm, schema } from "../validators/schema";
import { v4 as createUid } from "uuid";
import { yupResolver } from "@hookform/resolvers/yup";
import { GroupForm } from "../validators/group";

import CustomPopover from "./CustomPopover";

const mockItems = [
  {
    id: createUid(),
    name: "Item 1",
    description: "Descrição do item 1",
    category: "Categoria do item 1",
    value: 100,
    selected: false,
  },
  {
    id: createUid(),
    name: "Item 2",
    description: "Descrição do item 2",
    category: "Categoria do item 2",
    value: 200,
    selected: false,
  },
  {
    id: createUid(),
    name: "Item 3",
    description: "Descrição do item 3",
    category: "Categoria do item 3",
    value: 300,
    selected: false,
  },
  {
    id: createUid(),
    name: "Item 4",
    description: "Descrição do item 4",
    category: "Categoria do item 4",
    value: 400,
    selected: false,
  },
];

const mockProducts = [
  {
    id: new Date().getTime().toString(),
    name: "Caixa de Som",
    subItems: mockItems,
  },
  {
    id: new Date().getTime().toString(),
    name: "Intrumentos musicais",
    subItems: mockItems,
  },
];

interface DialogItemProps {
  open: boolean;
  handleClose: () => void;
  indexSlected: number;
}

export function DialogItem({
  open,
  handleClose,
  indexSlected,
}: DialogItemProps) {
  const { control: controlGroup } = useFormContext<GroupForm>();

  const [item, setItem] = useState<any>({});
  const [options, setOptions] = useState([]);
  const [optionsSubItem, setOptionsSubItem] = useState<any[]>([]);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const { control, getValues } = useForm({
    mode: "onChange",
    resolver: yupResolver<SchemaForm>(schema),
  });

  const {
    append: appendSubItems,
    remove: removeSubItems,
    fields: fieldsSubItems,
  } = useFieldArray({
    control,
    name: "subItems",
    keyName: "idFieldSubItem",
  });

  const { append: appendGroup } = useFieldArray({
    control: controlGroup,
    name: `listGroups.${indexSlected}.items`,
    keyName: "idFieldGroup",
  });

  function handleAddSubItem(item: { id: string; value: number }) {
    setOptionsSubItem((prev) =>
      prev.map((option: any) => {
        if (option.id === item.id) {
          return { ...option, selected: true };
        }
        return option;
      })
    );
    appendSubItems(item);
  }

  function handleRemoveSubItem(index: number, id: string) {
    setOptionsSubItem((prev) =>
      prev.map((option: any) => {
        if (option.id === id) {
          return { ...option, selected: false };
        }
        return { ...option };
      })
    );

    removeSubItems(index);
  }

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openDate = Boolean(anchorEl);

  useEffect(() => {
    if (item.id) {
      setOptions(item.subItems);
    }
    console.log(item);
  }, [item]);

  useEffect(() => {
    console.log(fieldsSubItems);
  }, [fieldsSubItems]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Adicionar itens</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    fullWidth
                    sx={{ mt: 2 }}
                    options={mockProducts}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    onChange={(_, value) => {
                      if (value) {
                        setItem(value);
                        field.onChange(value.name);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Produto"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid
              item
              xs={6}
              display="flex"
              alignItems="center"
              justifyItems="center"
            >
              <Button
                size="large"
                variant="contained"
                color="primary"
                sx={{ minHeight: 50, mt: 2 }}
                onClick={() => setOptionsSubItem(options)}
              >
                Adicionar
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12} minHeight={300} minWidth={400}>
              {optionsSubItem.map((option: any, index) => (
                <Grid item xs={12} key={index}>
                  <Box
                    sx={{
                      my: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      gap: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ borderRight: 1, px: 2 }}>
                      {option.name}
                    </Typography>
                    <Typography variant="h6" sx={{ borderRight: 1, px: 2 }}>
                      {option.description}
                    </Typography>

                    <Button onClick={handleOpenPopover}>Datas</Button>

                    <CustomPopover
                      open={openDate}
                      handleClose={handleClosePopover}
                      anchorEl={anchorEl}
                    />

                    {option.selected ? (
                      <Button
                        type="button"
                        variant="text"
                        color="primary"
                        size="small"
                        onClick={() => handleRemoveSubItem(index, option.id)}
                      >
                        ➖
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="text"
                        color="primary"
                        size="small"
                        onClick={() =>
                          handleAddSubItem({
                            id: option.id,
                            value: option.value,
                          })
                        }
                      >
                        ➕
                      </Button>
                    )}

                    <Divider />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" size="large" onClick={handleClose}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            appendGroup({
              id: getValues().id,
              name: getValues().name,
              total: fieldsSubItems
                .map((field) => field.value)
                .reduce((acc, value) => acc + value, 0),
              subItems: fieldsSubItems.map((field) => ({
                id: field.id,
                value: field.value,
              })),
            });
            handleClose();
          }}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
