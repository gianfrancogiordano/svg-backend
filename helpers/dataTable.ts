
export const dataTablePaginado = (data: any, conteo: number, pagina: number, porPagina: number) => {

  let dataPaginada = { conteo: 0, data: [], pagActual: 0, ultimaPag: 0, pagSiguiente: 0, pagAnterior: 0, pagTotal: 0, paginas: [] };

  let pag = pagina;
  let total_paginas = Math.ceil(conteo / porPagina);
  if (pag > total_paginas) { pag = total_paginas; }
  
  pag = pag - 1;

  let pag_siguiente;
  let pag_anterior;

  pag_siguiente = (pag >= total_paginas - 1) ? pag_siguiente = 1 : pag_siguiente = pag + 2;
  pag_anterior = (pag < 1) ? total_paginas : pag;

  let arrayPag: any = [];
  for (let i = 1; i <= total_paginas; i++) {
    arrayPag.push(i);
  }

  // TODO: Mejorar paginación
  if (total_paginas > 4 && pagina >= 3) {
    arrayPag = arrayPag.slice((pagina - 3), (pagina + 2));
  } else if (total_paginas > 4 && pagina == 2) {
    arrayPag = arrayPag.slice((pagina - 2), (pagina + 3));
  } else if (total_paginas > 4 && pagina == 1) {
    arrayPag = arrayPag.slice((pagina - 1), (pagina + 4));
  }

  dataPaginada = {
    ...dataPaginada,
    conteo: conteo,
    data: data,
    pagSiguiente: pag_siguiente,
    pagAnterior: pag_anterior,
    pagTotal: total_paginas,
    pagActual: (pag + 1),
    ultimaPag: total_paginas,
    paginas: arrayPag
  }

  return dataPaginada;

}
