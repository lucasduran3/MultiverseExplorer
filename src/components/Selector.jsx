const Selector = ({ onChange, options, currentOption = '', id, label }) => (
  <div className="flex flex-col gap-2 text-sm font-semibold text-teal-50">
    <label htmlFor={id}>{label}</label>
    <select
      id={id}
      name={id}
      onChange={onChange}
      value={currentOption}
      className="w-full appearance-none rounded-xl border border-teal-300/20 bg-slate-950/60 bg-[linear-gradient(45deg,transparent_50%,#5eead4_50%),linear-gradient(135deg,#5eead4_50%,transparent_50%)] bg-[position:calc(100%-18px)_50%,calc(100%-13px)_50%] bg-[size:5px_5px,5px_5px] bg-no-repeat px-3.5 py-2.5 pr-9 text-slate-100 outline-none transition focus:border-teal-300 focus:ring-4 focus:ring-teal-300/10"
    >
      <option value={''} key={crypto.randomUUID()}>
        Todos
      </option>
      {options.map((item) => {
        return (
          <option value={item} key={crypto.randomUUID()}>
            {item}
          </option>
        );
      })}
    </select>
  </div>
);

export default Selector;
