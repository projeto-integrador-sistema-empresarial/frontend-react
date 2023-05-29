import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { formatDate } from '../utils/formatDate';

interface Training {
  _id: string;
  name: string;
  cod: string;
  desc: string;
  workload: string;
  enroll_start: string;
  enroll_end: string;
  min_students: string;
  max_students: string;
  training_start: string;
  training_end: string;
  created_by: string;
  enrolled: boolean;
  all_questions: string[];
}

export function Jobs() {
  const [jobs, setJobs] = useState<Training[]>([]);

  useEffect(() => {
    api.get('/api/jobs/available-jobs')
      .then((response) => {
        console.log('.then ~ response:', response);
        setJobs(response.data)
      })
      .catch((error) => console.log(error));
  }, []);


  return (
    <>
      <Typography variant="h4" component="h4">Vagas Disponíveis</Typography>
      <Grid container spacing={2} my={2}>
        {jobs.map((training) => (
          <Grid item xs={12} sm={6} md={4} key={training._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h5" gutterBottom>{training.name}</Typography>
                <Typography variant="body1" component="p" color="text.secondary" gutterBottom>{training.desc}</Typography>

                <Typography variant="body1" component="p" gutterBottom>Duração: {training.workload} horas</Typography>

                <Typography variant="body1" component="p">Período de inscrições:</Typography>
                <Typography variant="body2" component="p" gutterBottom color="text.secondary">
                  {formatDate(training.enroll_start)} - {formatDate(training.enroll_end)}
                </Typography>

                <Typography variant="body1" component="p">Período de Treinamento:</Typography>
                <Typography variant="body2" component="p" gutterBottom color="text.secondary">
                  {formatDate(training.training_start)} - {formatDate(training.training_end)}
                </Typography>

                <Button
                  variant="contained"
                  // onClick={() => { }}
                  sx={{ my: 1 }}
                >
                  Candidatar-se
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid >
    </>
  );
}
