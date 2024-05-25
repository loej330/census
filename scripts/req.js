const url = 'http://localhost:3000'
const cli_method = {
  p: "POST", g: "GET", d: "DELETE"
}

async function request(query="/", method="g", content="") {
  const req = {
    method: cli_method[method],
    headers: { 'Content-Type': 'application/json' },
  }
  if (method != 'g') {
    req.body = content;
  }

  const res = await fetch(`${url}${query}`, req);
  if (!res.ok) { return(`Error ${res.status}: ${res.statusText}`); }

  // return await res.json() ;
  return (res.headers.get('Content-type').includes('application/json') &&
    await res.json() || await res.text()
  ) ;
}

let args = process.argv.slice(2);

console.log( await request(...args) ); 
