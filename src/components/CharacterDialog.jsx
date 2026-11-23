import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Slide,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { forwardRef } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props}></Slide>;
});

const CharacterDialog = ({ character, onClose }) => {
  return (
    <Dialog
      open={true}
      slots={{ transition: Transition }}
      keepMounted
      onClose={onClose}
      role="alertdialog"
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          className:
            '!m-4 !overflow-hidden !rounded-3xl !border !border-teal-300/25 !bg-slate-900 !text-slate-100 !shadow-2xl !shadow-teal-950/70',
        },
        backdrop: { className: '!bg-slate-950/80 !backdrop-blur-sm' },
      }}
    >
      <DialogTitle className="!relative !flex !items-center !gap-4 !bg-[radial-gradient(circle_at_top_right,_rgba(45,212,191,0.22),_transparent_55%)] !px-6 !py-6 sm:!px-8">
        <img src={character.image} alt={`Retrato de ${character.name}`} className="size-20 rounded-2xl border-2 border-lime-300/70 object-cover shadow-lg shadow-lime-950/30" />
        <div className="min-w-0 pr-8">
          <h2 className="truncate text-2xl font-extrabold tracking-tight text-white">{character.name}</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className={`rounded-full px-2.5 py-1 text-xs font-extrabold ${character.status === 'Alive' ? 'bg-lime-300 text-slate-950' : character.status === 'Dead' ? 'bg-rose-400 text-slate-950' : 'bg-slate-200 text-slate-800'}`}>{character.status}</span>
            <span className="rounded-full border border-teal-300/25 bg-teal-300/10 px-2.5 py-1 text-xs font-bold text-teal-100">
              {character.gender} · {character.species}
            </span>
          </div>
        </div>
      </DialogTitle>
      <IconButton aria-label="Cerrar detalle" onClick={onClose} className="!absolute !right-4 !top-4 !text-slate-300 hover:!bg-white/10 hover:!text-white">
        <CloseIcon />
      </IconButton>
      <DialogContent className="!px-6 !pb-7 !pt-3 sm:!px-8">
        <DialogContentText className="!mb-4 !text-sm !font-bold !uppercase !tracking-[0.18em] !text-lime-300">Expediente interdimensional</DialogContentText>
        <TableContainer component={Paper} className="!overflow-hidden !rounded-2xl !border !border-slate-700 !bg-slate-950/55 !shadow-none">
          <Table size="small" aria-label="Información del personaje">
            <TableHead className="bg-teal-300/10">
              <TableRow>
                <TableCell className="!border-slate-700 !font-extrabold !text-teal-100">Propiedad</TableCell>
                <TableCell align="right" className="!border-slate-700 !font-extrabold !text-teal-100">Valor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={'origin'}>
                <TableCell component={'th'} scope="row" className="!border-slate-800 !font-bold !text-slate-400">
                  Origen
                </TableCell>
                <TableCell align="right" className="!border-slate-800 !text-slate-100">{character.origin.name}</TableCell>
              </TableRow>
              <TableRow key={'location'}>
                <TableCell component={'th'} scope="row" className="!border-slate-800 !font-bold !text-slate-400">
                  Ubicación
                </TableCell>
                <TableCell align="right" className="!border-slate-800 !text-slate-100">{character.location.name}</TableCell>
              </TableRow>
              <TableRow key={'species'}>
                <TableCell component={'th'} scope="row" className="!border-slate-800 !font-bold !text-slate-400">
                  Especie
                </TableCell>
                <TableCell align="right" className="!border-slate-800 !text-slate-100">{character.species}</TableCell>
              </TableRow>
              <TableRow key={'episodes'}>
                <TableCell component={'th'} scope="row" className="!border-0 !font-bold !text-slate-400">
                  Episodios
                </TableCell>
                <TableCell align="right" className="!border-0 !text-slate-100">{character.episode.length}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

export default CharacterDialog;
