import { useCallback, useEffect, useReducer, useState } from 'react';
import charactersReducer from './utils/charactersReducer';
import characterActions from './utils/charactersActions';
import CharactersList from './components/CharactersList';
import SearchForm from './components/SearchForm';
import CharacterDialog from './components/CharacterDialog';
import { LinearProgress } from '@mui/material';
import getCurrentPage from './utils/getCurrentPage';
import buildUrlParams from './utils/buildUrlParams';

const API_URL = 'https://rickandmortyapi.com/api/character/';

const initialFilters = {
  name: '',
  species: '',
  status: '',
  gender: '',
};

const App = () => {
  const [characters, dispatchCharacters] = useReducer(charactersReducer, {
    data: [],
    pagination: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    isLoading: false,
    isError: false,
  });

  const [filters, setFilters] = useState(initialFilters);

  const [url, setUrl] = useState(`${API_URL}`);

  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleFetchCharacters = useCallback(async () => {
    setSelectedCharacter(null);
    dispatchCharacters({ type: characterActions.FETCH_INIT });

    try {
      const response = await fetch(url);

      if (response.status === 404) {
        dispatchCharacters({
          type: characterActions.FETCH_SUCCESS,
          payload: {
            results: [],
            info: { count: 0, pages: 0, next: null, prev: null },
          },
        });
        return;
      }

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      dispatchCharacters({
        type: characterActions.FETCH_SUCCESS,
        payload: { results: data.results ?? [], info: data.info },
      });
    } catch (error) {
      console.error('Error al cargar personajes desde:', url, error);
      dispatchCharacters({
        type: characterActions.FETCH_FAILURE,
        payload:
          'No se pudieron cargar los personajes. Revisá tu conexión e intenta de nuevo.',
      });
    }
  }, [url]);

  useEffect(() => {
    handleFetchCharacters();
  }, [handleFetchCharacters]);

  const handleFiltersChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setUrl(API_URL);
  };

  const handleSelectCharacter = (id) => {
    const selected = characters.data.find((character) => character.id === id);
    setSelectedCharacter(selected);
  };

  const searchAction = (e) => {
    e.preventDefault();

    const params = buildUrlParams(filters);
    setUrl(`${API_URL}?${params.toString()}`);
  };

  const renderResultSection = () => {
    if (characters.isLoading) {
      return (
        <div
          className="mx-auto mt-12 w-full max-w-2xl rounded-3xl border border-teal-300/15 bg-slate-900/70 p-6 text-center shadow-2xl shadow-teal-950/25 backdrop-blur"
          role="status"
        >
          <LinearProgress
            aria-label="Loading..."
            color="success"
            className="mb-4! rounded-full!"
          />
          <p className="text-sm font-medium tracking-wide text-teal-100">
            Abriendo un portal a nuevos personajes...
          </p>
        </div>
      );
    }

    if (characters.isError) {
      return (
        <div
          role="alert"
          className="mx-auto mt-12 flex max-w-xl flex-col items-center gap-4 rounded-3xl border border-rose-400/30 bg-rose-950/30 p-8 text-center shadow-xl shadow-rose-950/20"
        >
          <p className="text-rose-100">
            {characters.errorMessage || 'Ocurrió un error al cargar los datos.'}
          </p>
          <button
            type="button"
            onClick={handleFetchCharacters}
            className="rounded-full bg-rose-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-rose-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-200"
          >
            Reintentar
          </button>
        </div>
      );
    }

    if (characters.data.length === 0) {
      return (
        <div className="mx-auto mt-12 flex max-w-xl flex-col items-center gap-4 rounded-3xl border border-lime-300/20 bg-slate-900/70 p-8 text-center shadow-2xl shadow-lime-950/15 backdrop-blur">
          <span
            className="grid size-14 place-items-center rounded-2xl bg-lime-300/10 text-3xl"
            aria-hidden="true"
          >
            🛸
          </span>
          <p className="max-w-sm text-slate-300">
            No se encontraron personajes que coincidan con los filtros
            aplicados.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="rounded-full border border-lime-300/50 px-5 py-2.5 text-sm font-bold text-lime-200 transition hover:bg-lime-300 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200"
          >
            Limpiar filtros
          </button>
        </div>
      );
    }

    return (
      <>
        <CharactersList
          characters={characters.data}
          onSelect={handleSelectCharacter}
        />
        <div className="mb-6 flex items-center justify-center gap-3 sm:justify-end">
          <button
            type="button"
            disabled={!characters.pagination.prev}
            onClick={() => setUrl(characters.pagination.prev)}
            className="rounded-full border border-teal-300/25 bg-slate-900/75 px-4 py-2 text-sm font-bold text-teal-100 transition hover:border-teal-200/70 hover:bg-teal-300 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-35"
          >
            ← Anterior
          </button>
          <span className="min-w-24 text-center text-sm font-semibold tabular-nums text-slate-300">
            {getCurrentPage(url)} / {characters.pagination.pages}
          </span>
          <button
            type="button"
            disabled={!characters.pagination.next}
            onClick={() => setUrl(characters.pagination.next)}
            className="rounded-full border border-teal-300/25 bg-slate-900/75 px-4 py-2 text-sm font-bold text-teal-100 transition hover:border-teal-200/70 hover:bg-teal-300 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-35"
          >
            Siguiente →
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-8 sm:py-10 lg:px-12">
      <header className="relative overflow-hidden rounded-3xl border border-teal-300/15 bg-slate-900/70 px-6 py-8 shadow-2xl shadow-teal-950/30 backdrop-blur sm:px-10 sm:py-10">
        <div
          className="absolute -right-16 -top-16 size-48 rounded-full border-18 border-lime-300/10"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 left-1/3 size-44 rounded-full border-14 border-teal-300/10"
          aria-hidden="true"
        />
        <div className="relative">
          <p className="mb-10 text-xs font-bold uppercase tracking-[0.28em] text-lime-300 sm:text-sm">
            Rick and Morty database
          </p>
          <h1 className="relative inline-block font-title text-4xl leading-none sm:text-6xl lg:text-7xl">
            <span
              aria-hidden="true"
              className="absolute inset-0 text-black [-webkit-text-stroke:10px_#000000] [paint-order:stroke_fill] select-none"
            >
              Multiverse Explorer
            </span>
            <span className="relative text-teal-400 [-webkit-text-stroke:2px_#F0FF1F] [paint-order:stroke_fill]">
              Multiverse Explorer
            </span>
          </h1>
        </div>
      </header>

      <section className="rounded-3xl border border-teal-300/15 bg-slate-900/70 p-5 shadow-xl shadow-teal-950/20 backdrop-blur sm:p-7">
        <SearchForm
          onChange={handleFiltersChange}
          onReset={handleResetFilters}
          searchAction={searchAction}
          filters={filters}
        ></SearchForm>
      </section>

      <main className="pb-8">
        {renderResultSection()}

        {selectedCharacter && (
          <CharacterDialog
            character={selectedCharacter}
            onClose={() => setSelectedCharacter(null)}
          ></CharacterDialog>
        )}
      </main>
    </div>
  );
};
export default App;
