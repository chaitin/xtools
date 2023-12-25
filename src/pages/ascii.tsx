import MenuView from '@/components/MainContent';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import React from 'react';

const Hash: React.FC = () => {
  const createData = (dec: number, hex: string, char: string) => {
    char =
      {
        '0x00': '{NUL}',
        '0x01': '{SOH}',
        '0x02': '{STX}',
        '0x03': '{ETX}',
        '0x04': '{EOT}',
        '0x05': '{ENQ}',
        '0x06': '{ACK}',
        '0x07': '{BEL}',
        '0x08': '{BS}',
        '0x09': '{HT}',
        '0x0a': '{NL}',
        '0x0b': '{VT}',
        '0x0c': '{NP}',
        '0x0d': '{CR}',
        '0x0e': '{SO}',
        '0x0f': '{SI}',
        '0x10': '{DLE}',
        '0x11': '{DC1}',
        '0x12': '{DC2}',
        '0x13': '{DC3}',
        '0x14': '{DC4}',
        '0x15': '{NAK}',
        '0x16': '{SYN}',
        '0x17': '{ETB}',
        '0x18': '{CAN}',
        '0x19': '{EM}',
        '0x1a': '{SUB}',
        '0x1b': '{ESC}',
        '0x1c': '{FS}',
        '0x1d': '{GS}',
        '0x1e': '{RS}',
        '0x1f': '{US}',
        '0x20': '{SP}',
        '0x7f': '{DEL}',
      }[hex] || char;
    return { hex, dec, char };
  };

  const rows = Array(128)
    .fill(0)
    .map((_, x) => {
      return createData(
        x,
        '0x' + x.toString(16).padStart(2, '0'),
        String.fromCharCode(x)
      );
    });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  }));

  const tables = Array(4)
    .fill(0)
    .map((_, x) => {
      return (
        <Grid key={x} item xs={3}>
          <TableContainer component={Paper}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <StyledTableCell>DEC</StyledTableCell>
                  <StyledTableCell>HEX</StyledTableCell>
                  <StyledTableCell>CHAR</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(x * 0x20, x * 0x20 + 0x20).map((row) => (
                  <TableRow key={row.dec} sx={{ fontFamily: 'Mono' }}>
                    <TableCell sx={{ fontFamily: 'Mono' }}>{row.dec}</TableCell>
                    <TableCell sx={{ fontFamily: 'Mono' }}>{row.hex}</TableCell>
                    <TableCell sx={{ fontFamily: 'Mono', fontWeight: 900 }}>
                      {row.char}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      );
    });

  return (
    <MenuView>
      <>
        <Grid container spacing={1}>
          {tables}
        </Grid>
      </>
    </MenuView>
  );
};

export default Hash;
