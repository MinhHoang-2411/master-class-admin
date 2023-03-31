/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../layout/core'

import ReactApexChart from 'react-apexcharts'
import {
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import {styled} from '@mui/material/styles'

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}))

const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const DashboardPage: FC = () => {
  const series: any = [
    {
      name: 'Minh dep chai',
      data: [80, 95, 70, 42, 65, 55, 78],
    },
  ]

  const seriesPie = [80, 95, 70, 42, 65, 55, 78]
  const barChartOptions: any = {
    chart: {
      type: 'bar',
      height: 365,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      // show: false,
    },
    grid: {
      // show: false,
    },
  }

  const pieChartOptions: any = {
    labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  }

  return (
    <Grid container alignItems='center' spacing={2}>
      {/* bar chart  */}
      <Grid item xs={7}>
        <ReactApexChart options={barChartOptions} series={series} type='bar' height={365} />
      </Grid>
      {/* end bar chart  */}

      {/* donut chart  */}
      <Grid item xs={5} justifyContent='center'>
        <ReactApexChart
          options={pieChartOptions}
          series={seriesPie}
          type='donut'
          height={365}
          width={365}
        />
      </Grid>
      {/* end donut chart  */}

      {/* table  */}
      <Grid item xs={12}>
        <TableContainer
          sx={{
            width: '100%',
            overflowX: 'auto',
            position: 'relative',
            display: 'block',
            maxWidth: '100%',
            '& td, & th': {whiteSpace: 'nowrap'},
          }}
          component={Paper}
        >
          <Table aria-labelledby='tableTitle'>
            <TableHead>
              <TableRow>
                <StyledTableCell>User name</StyledTableCell>
                <StyledTableCell>Courses</StyledTableCell>
                <StyledTableCell>Paid</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell align='center'>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell>Minh kaka</StyledTableCell>
                <StyledTableCell>Anually</StyledTableCell>
                <StyledTableCell>$99</StyledTableCell>
                <StyledTableCell>Active</StyledTableCell>
                <StyledTableCell>
                  <Stack direction='row' justifyContent='center' alignItems='center'>
                    <IconButton>
                      <HighlightOffOutlinedIcon />
                    </IconButton>
                    <IconButton>
                      <InfoOutlinedIcon />
                    </IconButton>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {/* end table  */}
    </Grid>
  )
}

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
