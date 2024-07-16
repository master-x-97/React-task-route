import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const TransactionGraph = ({ transactions }) => {
  const data = transactions.transactions.map(transaction => ({
    date: transaction.date,
    amount: transaction.amount,
  }));
useEffect(()=>{
  console.log(transactions);
},[])
  return (
    <LineChart
      width={1000}
      height={300}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 10 }} />
    </LineChart>
  );
};

export default TransactionGraph;