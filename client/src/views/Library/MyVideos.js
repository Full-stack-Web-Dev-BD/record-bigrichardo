import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
    {date:'02-01-2020',img:'/images/vidThumb.png',title:'This is title  ',price:99,view:2011},
    {date:'02-01-2020',img:'/images/vidThumb.png',title:'This is title  ',price:99,view:2011},
    {date:'02-01-2020',img:'/images/vidThumb.png',title:'This is title  ',price:99,view:2011},
    {date:'02-01-2020',img:'/images/vidThumb.png',title:'This is title  ',price:99,view:2011},
    {date:'02-01-2020',img:'/images/vidThumb.png',title:'This is title  ',price:99,view:2011},
];

export default function MyVideos() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>SL.</TableCell>
            <TableCell align="left">Video</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">View</TableCell>
            <TableCell align="left">View</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,i) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row"> {i+1}. </TableCell>
              <TableCell align="left"><img style={{width:'100px',border:'1px solid gray',borderRadius:'5px',padding:'8px'}} src={row.img} /></TableCell>
              <TableCell align="left">{row.date}</TableCell>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="left">${row.price}</TableCell>
              <TableCell align="left">{row.view}</TableCell>
              <TableCell align="left">{row.view}</TableCell>
              <TableCell align="left">  <EditIcon style={{color:'#3f51b5',fontSize:'35px',border:'1px solid  #3f51b5',cursor:"pointer",padding:'3px',borderRadius:'3px'}} /> <DeleteOutlineIcon style={{color:'red', fontSize:'35px',border:'1px solid  red',cursor:"pointer",padding:'3px',borderRadius:'3px'}}/> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
