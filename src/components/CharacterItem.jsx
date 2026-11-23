const CharacterItem = ({
  image,
  name,
  status,
  species,
  gender,
  origin,
  onSelect,
}) => (
  <li>
    <button type="button" onClick={onSelect} className="group h-full w-full overflow-hidden rounded-3xl border border-teal-300/15 bg-slate-900/70 text-left shadow-xl shadow-slate-950/20 transition duration-300 hover:-translate-y-1 hover:border-teal-300/50 hover:shadow-2xl hover:shadow-teal-950/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-200">
      <div className="flex h-full flex-col sm:flex-row xl:flex-col">
        <div className="relative shrink-0 overflow-hidden sm:w-40 xl:w-full">
          <img src={image} alt={`Retrato de ${name}`} className="aspect-square h-full w-full object-cover transition duration-500 group-hover:scale-105 sm:aspect-auto xl:aspect-square" />
          <span className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-extrabold shadow-lg ${status === 'Alive' ? 'bg-lime-300 text-slate-950' : status === 'Dead' ? 'bg-rose-400 text-slate-950' : 'bg-slate-200 text-slate-800'}`}>
            <span className="size-1.5 rounded-full bg-current" />{status}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h2 className="line-clamp-1 text-xl font-extrabold tracking-tight text-white transition group-hover:text-lime-200">{name}</h2>
          <p className="mt-1 text-sm font-medium text-teal-200">{species} · {gender}</p>
          <div className="mt-5 border-t border-slate-700/80 pt-3">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-slate-500">Origen</p>
            <p className="mt-1 line-clamp-1 text-sm text-slate-300">{origin.name}</p>
          </div>
          <span className="mt-4 text-sm font-bold text-teal-300 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">Ver expediente →</span>
        </div>
      </div>
    </button>
  </li>
);

export default CharacterItem;
