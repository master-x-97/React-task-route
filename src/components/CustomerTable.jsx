

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableSortLabel,
  IconButton
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

 const CustomerTable = ({ onSelectCustomer }) => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersResponse = await axios.get('http://localhost:5000/customers');
        const transactionsResponse = await axios.get('http://localhost:5000/transactions');
        setCustomers(customersResponse.data);
        setTransactions(transactionsResponse.data);
        console.log(customersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateTotalAmounts = () => {
    return customers.map(customer => {
      const customerTransactions = transactions.filter(
        transaction => transaction.customer_id === customer.id
      );
      const totalAmount = customerTransactions.reduce(
        (acc, transaction) => acc + transaction.amount,transactions[customer.id].amount);
        // console.log(transactions[customer.id].amount);

      return { ...customer, totalAmount };
    });
  };

  const customersWithTotalAmounts = calculateTotalAmounts();

  const handleSort = () => {
    const isAsc = sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
  };

  const sortedCustomers = [...customersWithTotalAmounts].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a.totalAmount - b.totalAmount;
    }
    return b.totalAmount - a.totalAmount;
  });

  const filteredCustomers = sortedCustomers.filter(customer =>
    customer.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Customer Transactions
      </Typography>
      <TextField
        label="Filter by customer name"
        variant="outlined"
        fullWidth
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active
                  direction={sortDirection}
                  onClick={handleSort}
                >
                  Total Transactions
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map(customer => (
              <TableRow 
                key={customer.id} 
                hover 
                onClick={() => onSelectCustomer(customer)}
                style={{ cursor: 'pointer' }}
              >
                <TableCell component="th" scope="row">
                  {customer.name}
                </TableCell>
                <TableCell align="right">
                  {customer.totalAmount}
                  <IconButton size="small">
                    <ArrowForwardIosIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomerTable;




