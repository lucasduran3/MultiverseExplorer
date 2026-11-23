import Selector from './Selector';

const SearchForm = ({ filters, onChange, onReset, searchAction }) => (
  <form
    onSubmit={searchAction}
    className="grid gap-5 lg:grid-cols-[minmax(12rem,1.3fr)_repeat(3,minmax(9rem,1fr))_auto] lg:items-end"
  >
    <label
      htmlFor="searchName"
      className="flex flex-col gap-2 text-sm font-semibold text-teal-50"
    >
      <span>Nombre</span>

      <input
        name="name"
        type="text"
        id="searchName"
        onChange={onChange}
        value={filters.name}
        placeholder="Ej. Rick Sanchez"
        className="w-full rounded-xl border border-teal-300/20 bg-slate-950/60 px-3.5 py-2.5 text-slate-100 outline-none placeholder:text-slate-500 transition focus:border-teal-300 focus:ring-4 focus:ring-teal-300/10"
      ></input>
    </label>

    <Selector
      id={'status'}
      label={'Estado'}
      options={['Alive', 'Dead', 'Unknow']}
      currentOption={filters.status}
      onChange={onChange}
    ></Selector>

    <Selector
      id={'species'}
      label={'Especie'}
      options={['Human', 'Alien']}
      currentOption={filters.species}
      onChange={onChange}
    ></Selector>

    <Selector
      id={'gender'}
      label={'Género'}
      options={['Male', 'Female', 'Genderless', 'Unknow']}
      currentOption={filters.gender}
      onChange={onChange}
    ></Selector>
    <div className="flex gap-3 lg:col-span-1 lg:flex-col">
      <button
        type="submit"
        className="flex-1 rounded-xl bg-lime-300 px-4 py-2.5 text-sm font-extrabold text-slate-950 transition hover:-translate-y-0.5 hover:bg-lime-200 hover:shadow-lg hover:shadow-lime-300/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200"
      >
        Explorar
      </button>
      <button
        type="button"
        onClick={onReset}
        className="flex-1 rounded-xl border border-slate-600 px-4 py-2.5 text-sm font-bold text-slate-300 transition hover:border-teal-300/50 hover:bg-teal-300/10 hover:text-teal-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-200"
      >
        Limpiar
      </button>
    </div>
  </form>
);

export default SearchForm;
