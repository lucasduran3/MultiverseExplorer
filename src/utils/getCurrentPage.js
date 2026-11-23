const getCurrentPage = (url) => {
  try {
    const parsedUrl = new URL(url);
    const pageParam = parsedUrl.searchParams.get('page');
    return pageParam ? Number(pageParam) : 1;
  } catch {
    return 1;
  }
};

export default getCurrentPage;
