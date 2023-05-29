import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { Typography, Button, Card, CardContent, Grid } from '@mui/material';


export function Tests() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    api.get('/api/jobs/available-jobs')
      .then((response) => {
        console.log('.then ~ response:', response);
        setTests(response.data)
      })
      .catch((error) => console.log(error));
  }, []);


  return (
    <>
      <Typography variant="h4" component="h4">Testes disponíveis</Typography>
      <Grid container spacing={2} my={2}>
        {tests.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h5" gutterBottom>{item.name}</Typography>

                <Button
                  variant="contained"
                  // onClick={() => { }}
                  sx={{ my: 1 }}
                >
                  Responder quiz
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid >
    </>
  );
}
