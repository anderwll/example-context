import {
  Button,
  Divider,
  Grid,
  Popover,
  TextField,
  Typography,
} from "@mui/material";

const mock = [
  {
    startDate: "2022-10-10",
    endDate: "2022-10-20",
  },
  {
    startDate: "2022-10-25",
    endDate: "2022-10-30",
  },
  {
    startDate: "2022-10-25",
    endDate: "2022-10-30",
  },
  {
    startDate: "2022-10-25",
    endDate: "2022-10-30",
  },
];

interface CustomPopoverProps {
  open: boolean;
  anchorEl: Element | null;
  handleClose: () => void;
}

export default function CustomPopover({
  open,
  anchorEl,
  handleClose,
}: CustomPopoverProps) {
  return (
    <Popover
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Grid container spacing={2} sx={{ p: 2 }} width={900}>
        <Grid item xs={4}>
          <TextField type="date" fullWidth label="Entrada" />
        </Grid>
        <Grid item xs={4}>
          <TextField type="date" fullWidth label="Saida" />
        </Grid>
        <Grid item xs={4}>
          <Button
            sx={{ minHeight: 55 }}
            variant="contained"
            size="large"
            fullWidth
          >
            Adicionar
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Datas</Typography>
        </Grid>

        {mock.map((item, index) => (
          <Grid item xs={12} key={index} container spacing={2}>
            <Grid item xs={4}>
              <TextField
                type="date"
                fullWidth
                label="Entrada"
                value={item.startDate}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="date"
                fullWidth
                label="Saida"
                value={item.endDate}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                sx={{ minHeight: 55 }}
                variant="contained"
                size="large"
                color="error"
              >
                ➖
              </Button>
            </Grid>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12} display="flex" justifyContent="end">
          <Button sx={{ minHeight: 55 }} variant="contained" size="large">
            Concluído
          </Button>
        </Grid>
      </Grid>
    </Popover>
  );
}
