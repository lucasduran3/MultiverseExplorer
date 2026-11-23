const buildUrlParams = (filters) => {
  const params = new URLSearchParams();
  if (filters.name) params.append('name', filters.name);
  if (filters.status) params.append('status', filters.status);
  if (filters.species) params.append('species', filters.species);
  if (filters.gender) params.append('gender', filters.gender);

  return params;
};

export default buildUrlParams;
