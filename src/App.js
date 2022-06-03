import './App.css';

import { useEffect, useState } from 'react';

function App() {
  const [isPending, setIsPending] = useState(true);
  const [productsData, setProductsData] = useState(null);
  useEffect(() => {
    async function fetchSeriesData() {
      try {
        const series = await fetch('https://reqres.in/api/products', {
          method: 'GET',
          redirect: 'follow',
        });
        const resJson = await series.json();
        if (series.status === 200) {
          setProductsData(resJson);
          setIsPending(false);
          console.log(resJson);
        } else {
          alert('bu');
        }
      } catch (error) {
        alert('buuuu');
      }
    }
    fetchSeriesData();
  }, []);
  return (
    <div className="App">
      {isPending && <h1>Loading...</h1>}
      {!isPending && (
        <table>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>YEAR</th>
          </tr>
          {productsData &&
            productsData.data.map((index) => (
              <>
                <tr style={{ backgroundColor: index.color }}>
                  <td>{index.id}</td>
                  <td>{index.name}</td>
                  <td>{index.year}</td>
                </tr>
              </>
            ))}
        </table>
      )}
    </div>
  );
}

export default App;
