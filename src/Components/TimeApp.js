import { withoutAuthAxios } from '@/config/config';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const TimeApp = () => {

    const [file, setFile] = useState(null);
    const [uploadedData, setUploadedData] = useState(null);
    const [serchData, setsearchData] = useState("");

    const [data, setdata] = useState('')

    const handleFileChange = async(event) => {
        const selectedFile = event.target.files[0]
      
        
        const formData = new FormData();
        formData.append('csvFile', selectedFile)
        await withoutAuthAxios()
        .post("/data/checkFile",formData)
        .then((response)=>{
          console.log(response)
          if(response.data.exists==true){
            toast.success(response.data.message)
          }else{
          //  const formData = new FormData();
          //  formData.append('csvFile', selectedFile)
             withoutAuthAxios()
            .post("/data/upload",formData)
            .then((response)=>{
                     
                toast.success(response.data.message)
            }).catch((error)=>{
                console.log(error)
                toast.error(error.message)
            })
          }
        }).catch((error)=>{
            console.log(error)
            toast.error(error.message)
        })
        
 
         /*
        const formData = new FormData();
        formData.append('csvFile', selectedFile)
        await withoutAuthAxios()
        .post("/data/upload",formData)
        .then((response)=>{
             
            console.log(response)
            
            toast.success(response.data.message)
        }).catch((error)=>{
            console.log(error)
            toast.error(error.message)
        })
        */

      };



  return (
     
    <Container  style={{maxWidth:"1800px"  }} fixed> 
    <br/>
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={4}>
      <Grid xs={6}>
      <>  <select className='selectuser'    >


        <option value="">Select User</option>

        <option value="">Select User</option>
            
         
        </select>  </>
     </Grid>
  
  
  <Grid xs={2}>
  <> <button className='lowhours' >Low Hours</button>  </>
  </Grid>
  
  
  <Grid xs={2}>
  <> <button className='puncherror'  >Punch  Error</button>  </>
  </Grid>


  <Grid xs={2}>
  <><input className='chooseFile'  type='file' accept=".csv"  onChange={handleFileChange}  /></>
  </Grid>

      </Grid>
  </Box>

    <br/>
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1400 }} aria-label="customized table">
        <TableHead >
          <TableRow>
          <StyledTableCell align="left"><th>Date</th></StyledTableCell>
            <StyledTableCell align="left"><th>Status</th> </StyledTableCell>
            <StyledTableCell align="left"><th>TotalTime</th></StyledTableCell>
            <StyledTableCell align="left"><th>FloorTime</th></StyledTableCell>
            <StyledTableCell align="left"><th>View</th></StyledTableCell>

            
            <StyledTableCell align="left"><th className='iclass' >FI</th></StyledTableCell>
            
            <StyledTableCell align="left"><th className='oclass' >FO</th></StyledTableCell>
            <StyledTableCell align="left"><th>Reason</th></StyledTableCell>
            <StyledTableCell align="left"><th className='iclass'>CI</th></StyledTableCell>
           

            <StyledTableCell align="left"><th className='oclass'>CO</th></StyledTableCell>
            <StyledTableCell align="left"><th>CabienTime</th></StyledTableCell>
            <StyledTableCell align="left"><th className='iclass'> MI</th></StyledTableCell>
           

           <StyledTableCell align="left"><th className='oclass'>MO</th></StyledTableCell>
           <StyledTableCell align="left"><th>MainGatetime</th></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              
              
              <StyledTableCell align="right"><td>{row.protein}</td></StyledTableCell>
              <StyledTableCell align="right"><td>{row.protein}</td></StyledTableCell>
              <StyledTableCell align="right"><td>{row.protein}</td></StyledTableCell>
              <StyledTableCell align="right"><td>{row.protein}</td></StyledTableCell>
              <StyledTableCell align="right"><td>{row.protein}</td></StyledTableCell>
              <StyledTableCell align="right"><td>{row.protein}</td></StyledTableCell>
              <StyledTableCell align="right"><td>{row.protein}</td></StyledTableCell>
              <StyledTableCell align="right"><td>{row.protein}</td></StyledTableCell>
              <StyledTableCell align="right"><td>{row.protein}</td></StyledTableCell>
              <StyledTableCell align="right"><td>{row.protein}</td></StyledTableCell>
              <StyledTableCell align="right"><td>{row.protein}</td></StyledTableCell>
              <StyledTableCell align="right"><td>{row.protein}</td></StyledTableCell>
              <StyledTableCell align="right"><td>{row.protein}</td></StyledTableCell>
            </StyledTableRow>
            
          ))}
        
        </TableBody>
      </Table>
    </TableContainer>

  </Container> 
    
  )
}

export default TimeApp