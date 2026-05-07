const INDEX_URL = './content/md/index.json';

export async function fetchDocsIndex() {
  const response = await fetch(INDEX_URL);
  if (!response.ok) throw new Error('No se pudo cargar index.json');
  const data = await response.json();
  return data.items || [];
}

export async function fetchDoc(docId) {
  const items = await fetchDocsIndex();
  const item = items.find((doc) => doc.id === docId);
  if (!item) return null;

  const response = await fetch(`./${item.path}`);
  if (!response.ok) throw new Error(`No se pudo leer ${item.path}`);
  const markdown = await response.text();
  return { item, markdown };
}
