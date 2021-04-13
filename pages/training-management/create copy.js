import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import GridCellExpand from '../../components/GridCellExpand';
import NavBar from '../../components/navbar';
import DrawerBarContextProvider from '../../context/DrawerBarContext';
import ReactDataGrid from 'react-data-grid';
import courses from '../../utils/data';
const useStyles = makeStyles((theme) => ({
  root: {
    // height: '100vh',
    backgroundColor: theme.palette.background.paper,
    padding: '0.5rem'
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
  content: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    padding: '8px',
    fontSize: '1em'
  }
}));

const columns1 = [
  { id: 'id', label: 'ID', minWidth: 80 },
  { id: 'name', label: 'Name', minWidth: 170 },
  {
    id: 'manual',
    label: 'Manual',
    minWidth: 80,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'selenium',
    label: 'Selenium',
    minWidth: 80,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'ta',
    label: 'TA',
    minWidth: 80,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'ojt',
    label: 'OJT',
    minWidth: 80,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'final',
    label: 'Final\u00a0Point',
    minWidth: 80,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'rating',
    label: 'Rating',
    minWidth: 80,
    align: 'center',
    format: (value) => value.toFixed(1)
  },
  { id: 'remarks', label: 'Remarks', minWidth: 100 }
];
const columns = [
  { field: 'id', headerName: 'ID', flex: 1, renderCell: renderCellExpand },
  { field: 'name', headerName: 'Name', flex: 1, renderCell: renderCellExpand },
  {
    field: 'manual',
    headerName: 'Manual',
    type: 'number'
  },
  {
    field: 'selenium',
    headerName: 'Selenium',
    type: 'number'
  },
  {
    field: 'ta',
    headerName: 'TA',
    type: 'number'
  },
  {
    field: 'ojt',
    headerName: 'OJT',
    type: 'number'
  },
  {
    field: 'final',
    headerName: 'Final Point',
    type: 'number'
  },
  {
    field: 'rating',
    headerName: 'Rating',
    type: 'number'
  },
  {
    field: 'remarks',
    headerName: 'Remarks',
    flex: 1,
    renderCell: renderCellExpand
  }
];

const columns2 = [
  { key: 'id', name: 'ID', editable: true },
  { key: 'name', name: 'Name', editable: true },
  { key: 'manual', name: 'Manual', editable: true },
  { key: 'selenium', name: 'Selenium', editable: true },
  { key: 'ta', name: 'TA', editable: true },
  { key: 'ojt', name: 'OJT', editable: true },
  { key: 'final', name: 'Final Point', editable: true },
  { key: 'rating', name: 'Rating', editable: true },
  { key: 'remarks', name: 'Remarks', editable: true }
];

function renderCellExpand(params) {
  return (
    <GridCellExpand
      value={params.value ? params.value.toString() : ''}
      width={params.colDef.width}
    />
  );
}
// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

const rows = [
  // createData('India', 'IN', 1324171354, 3287263),
  {
    id: 'SATT21.01.01',
    name: 'Ly Nhac Hoa',
    manual: 30,
    selenium: 30,
    ta: 30,
    ojt: 30,
    final: 120,
    rating: 3.5,
    remarks: 'just join to know'
  }
];

export default function CreateCourse() {
  const classes = useStyles();
  const [course, setCourse] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCourseChange = (event) => {
    let a = courses.find((i) => i.id === event.target.value);
    console.log(a);
    setCourse(a);
  };

  const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState((state) => {
      const rows = course.trainees.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };
  return (
    <AdminLayout>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12} sm={8} md={3}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Course
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={course?.id}
              onChange={handleCourseChange}
              autoWidth
            >
              {courses.map((i) => (
                <MenuItem value={i.id}>{i.id}</MenuItem>
              ))}
              {/* <MenuItem value={1}>SATT21.01</MenuItem>
              <MenuItem value={2}>SATT21.02</MenuItem>
              <MenuItem value={3}>SATT21.03</MenuItem> */}
            </Select>
          </FormControl>
        </Grid>
        <Grid container component="main" xs={12} sm={8} md={8}>
          <Grid container xs={12} sm={5} md={5} className={classes.content}>
            {course?.from}&nbsp;~&nbsp;{course?.to}
            {/* <Grid item xs={12} sm={6} md={6}>
              {course?.from}
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              {course?.to}
            </Grid> */}
          </Grid>
          <Grid container xs={12} sm={7} md={7} className={classes.content}>
            Total: {course?.total[0].count * 1 + course?.total[1].count * 1}
            {course?.total.map((i) => (
              <span>
                &nbsp;{i.title}: {i.count}
              </span>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8} md={1} className={classes.content}>
          <Button variant="contained" color="primary">
            Details
          </Button>
        </Grid>
      </Grid>
      <Grid container component="main" className={classes.root}>
        <span style={{ margin: '0.5rem' }}>
          Trainers: {course?.trainers.map((i) => i.name + ', ')}
        </span>
      </Grid>
      {/* <Grid container component="main" className={classes.root}>
        <ReactDataGrid
          columns={columns2}
          rowGetter={(i) => course.trainees[i]}
          rowsCount={3}
          // onGridRowsUpdated={onGridRowsUpdated}
          enableCellSelect={true}
        />
      </Grid> */}
      <Grid container component="main" className={classes.root}>
        <div style={{ height: 300, width: '100%' }}>
          <DataGrid
            rows={course ? course.trainees : []}
            columns={course ? columns : []}
          />
        </div>
        {/* Tables */}
        {/* <Paper style={{ width: '100%' }}>
          <TableContainer
            // className={classes.container}
            style={{ maxHeight: 440 }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {course?.trainees
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper> */}
      </Grid>
    </AdminLayout>
  );
}
