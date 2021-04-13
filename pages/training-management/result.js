import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select
} from '@material-ui/core';
import { useCallback, useMemo, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import DataGrid, {
  SelectColumn,
  TextEditor,
  SelectCellFormatter
} from 'react-data-grid';
import GridCellExpand from '../../components/GridCellExpand';
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

const columns = [
  {
    key: 'id',
    name: 'ID',
    summaryFormatter() {
      return <strong>Total</strong>;
    },
    formatter(props) {
      return (
        <GridCellExpand
          value={props.row.id?.toString() || ''}
          maxWidth={'10vw'}
        />
      );
    }
  },
  {
    key: 'name',
    name: 'Name',

    summaryFormatter({ row }) {
      return <>{row.totalCount} records</>;
    },
    formatter(props) {
      console.log(this);
      return (
        <GridCellExpand
          value={props.row.name?.toString() || ''}
          maxWidth={'10vw'}
        />
      );
    }
  },
  {
    key: 'manual',
    name: 'Manual',
    // editor: TextEditor,
    editor: (p) => {
      return (
        <TextEditor
          style={{ color: 'red' }}
          column={p.column}
          row={p.row}
          onRowChange={(value) => {
            p.onRowChange({ ...p.row, manual: value.manual }, false);
          }}
          onClose={(value) => {
            p.onRowChange({ ...p.row }, value);
          }}
        />
      );
    }
  },
  { key: 'selenium', name: 'Selenium', editor: TextEditor },
  { key: 'ta', name: 'TA', editor: TextEditor },
  { key: 'ojt', name: 'OJT', editor: TextEditor },
  { key: 'final', name: 'Final Point' },
  { key: 'rating', name: 'Rating' },
  {
    key: 'remarks',
    name: 'Remarks',
    editor: TextEditor,
    formatter(props) {
      return (
        <GridCellExpand
          value={props.row.manual ? props.row.remarks.toString() : ''}
          maxWidth={'50vw'}
        />
      );
    }
  }
];

function rowKeyGetter(row) {
  return row.id;
}

function renderCellExpand(params) {
  return (
    <GridCellExpand
      value={params.value ? params.value.toString() : ''}
      width={params.colDef.width}
    />
  );
}

export default function TrainingResult() {
  const classes = useStyles();
  const [[sortColumn, sortDirection], setSort] = useState(['id', 'NONE']);
  const [course, setCourse] = useState();
  const [rows, setRows] = useState(course?.trainees);

  const summaryRows = useMemo(() => {
    const summaryRow = {
      id: 'total_0',
      totalCount: rows?.length || 0,
      yesCount: rows?.filter((r) => r.available).length || 0
    };
    return [summaryRow];
  }, [rows]);

  const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    const tmp = rows.slice();
    for (let i = fromRow; i <= toRow; i++) {
      tmp[i] = { ...tmp[i], ...updated };
    }
    setRows(tmp);
  };

  const handleCourseChange = (event) => {
    let a = courses.find((i) => i.id === event.target.value);
    setCourse(a);
    setRows(a.trainees);
  };

  const sortedRows = useMemo(() => {
    if (sortDirection === 'NONE') return rows;

    let sortedRows = [...rows];
    switch (sortColumn) {
      case 'title':
        sortedRows = sortedRows.sort((a, b) =>
          a[sortColumn].localeCompare(b[sortColumn])
        );
        break;
      case 'id':
      case 'complete':
        sortedRows = sortedRows.sort((a, b) => a[sortColumn] - b[sortColumn]);
        console.log(sortedRows);
        break;
      default:
    }

    return sortDirection === 'DESC' ? sortedRows.reverse() : sortedRows;
  }, [rows, sortDirection, sortColumn]);

  const handleSort = useCallback((columnKey, direction) => {
    setSort([columnKey, direction]);
  }, []);
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
              value={course?.id || ''}
              onChange={handleCourseChange}
              autoWidth
            >
              {courses.map((i, index) => (
                <MenuItem key={index} value={i.id}>
                  {i.id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item container component="main" xs={12} sm={8} md={8}>
          <Grid item xs={12} sm={5} md={5} className={classes.content}>
            {course?.from}&nbsp;~&nbsp;{course?.to}
          </Grid>
          <Grid item xs={12} sm={7} md={7} className={classes.content}>
            Total:{' '}
            {course?.total[0].count * 1 + course?.total[1].count * 1 || ''}
            {course?.total.map((i, index) => (
              <span key={index}>
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
        <span style={{ margin: '0.5rem' }} xs={12} sm={12} md={12}>
          Trainers: {course?.trainers.map((i) => i.name + ', ') || ''}
        </span>
      </Grid>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12} sm={12} md={12}>
          <DataGrid
            rowKeyGetter={rowKeyGetter}
            columns={columns}
            rows={sortedRows || []}
            defaultColumnOptions={{
              sortable: true,
              resizable: true
            }}
            onRowsChange={setRows}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSort}
            summaryRows={summaryRows}
            className="fill-grid"
            // onRowsChange={console.log}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
}
