import {
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DialogItem } from "./components/DialogItem";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { GroupForm, groupSchema } from "./validators/group";

function App() {
  const [open, setOpen] = useState(false);

  const [group, setGroup] = useState("");
  const [indexSelected, setIndexSelected] = useState<number>(0);

  const formProps = useForm({
    mode: "onChange",
    resolver: yupResolver<GroupForm>(groupSchema),
  });

  const { control, watch } = formProps;

  const { append: appendGroups, fields: fieldsGroups } = useFieldArray({
    control,
    name: "listGroups",
  });

  function handleAddGroup() {
    appendGroups({ group, items: [] });
    setGroup("");
  }

  useEffect(() => {
    console.log(watch("listGroups"));
  }, [watch("listGroups")]);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Seleção de Grupos</Typography>
          </Grid>

          <Grid item xs={12} container spacing={2} mt={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                color="primary"
                label="Grupo"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ minHeight: 55 }}
                onClick={handleAddGroup}
                disabled={group.length < 3}
              >
                Adicionar
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Grupos</Typography>
          </Grid>

          {fieldsGroups.map((group, index) => (
            <Grid
              item
              xs={12}
              gap={2}
              key={index}
              display="flex"
              alignItems="center"
            >
              <Typography variant="h6">{group.group}</Typography>
              <Button
                variant="text"
                color="primary"
                size="small"
                onClick={() => {
                  setIndexSelected(index);
                  setOpen(true);
                }}
              >
                Adicionar Item
              </Button>
            </Grid>
          ))}

          <FormProvider {...formProps}>
            <DialogItem
              open={open}
              handleClose={() => setOpen(false)}
              indexSlected={indexSelected}
            />
          </FormProvider>
        </Grid>
      </form>
    </Container>
  );
}

export default App;
