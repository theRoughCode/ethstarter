import C3Chart from 'react-c3js';
import 'c3/c3.css';

const data = {
  columns: [
    ['data1', 30, 200, 100, 400, 150, 250],
    ['data2', 50, 20, 10, 40, 15, 25]
  ]
};

const mountNode = document.getElementById('react-c3js');

ReactDOM.render(<C3Chart data={data} />, mountNode);